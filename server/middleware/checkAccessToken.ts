import { H3Event, getHeader, getCookie, createError } from 'h3'
import { findUserById } from '../services/user.service';
import { verifyJwt } from '../utils/jwt';

export default defineEventHandler(async (event: H3Event) => {
  try {
    if (event.path?.startsWith('/api') && !event.path?.startsWith('/api/auth/login') && !event.path?.startsWith('/api/auth/register')) {

      // Get the token
      let access_token;
      let authorizationHeader = getHeader(event, 'authorization');
      let accessTokenCookie = getCookie(event, 'accessToken');
      if (
        authorizationHeader &&
        authorizationHeader.startsWith('Bearer')
      ) {
        access_token = authorizationHeader.split(' ')[1];
      } else if (accessTokenCookie) {
        access_token = accessTokenCookie;
      }

      if (!access_token) {
        throw createError({ status: 401, message: 'You are not logged in' })
      }

      // Validate Access Token
      const decoded = await verifyJwt<{ sub: string }>(access_token);

      if (!decoded) {
        throw createError({ status: 401, message: `Invalid token or user doesn't exist` })
      }

      // Check if user has a valid session
      const session = await useStorage().getItem(decoded.sub);

      if (!session) {
        throw createError({ status: 401, message: `User session has expired` })
      }

      // Check if user still exist
      const user = await findUserById(session._id);

      if (!user) {
        throw createError({ status: 401, message: `User with that token no longer exist` })
      }

      event.context.user = user;
    }
  } catch (err: any) {
    throw createError(err)
  }
});
