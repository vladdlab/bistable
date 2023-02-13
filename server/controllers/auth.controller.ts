import { H3Event, createError, readBody, setCookie } from 'h3'
import { createUser, findUser, signToken } from '~~/server/services/user.service';
import { LoginUserInput, RegisterUserInput } from '~~/schemas/user.schema';
const config = useRuntimeConfig();

export const registerHandler = async (event: H3Event) => {
  try {
    const body: RegisterUserInput = await readBody(event);
    const user = await createUser(body);

    // Create an Access Token
    const accessToken = await signToken(user);

    // Send Access Token in Cookie
    const accessTokenCookieOptions = {
      expires: new Date(
        Date.now() + +config.accessTokenExpiresIn * 60 * 1000
      ),
      maxAge: +config.accessTokenExpiresIn * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax" as "lax",
    };
    setCookie(event, 'accessToken', accessToken, accessTokenCookieOptions)
    setCookie(event, 'logged_in', 'true', {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    return { user, accessToken }
  } catch (error: any) {

    if (error.code === 11000) {
      throw createError({
        status: 409,
        message: 'Email already exist'
      })
    }
    throw createError(error)
  }
};

export const loginHandler = async (event: H3Event) => {
  try {
    const body: LoginUserInput = await readBody(event);

    const user = await findUser({ email: body.email });

    // Check if user exist and password is correct
    if (!user || user.password !== body.password) {
      throw createError({ status: 401, statusText: 'Invalid email or password' });
    }

    // Create an Access Token
    const accessToken = await signToken(user);

    // Send Access Token in Cookie
    const accessTokenCookieOptions = {
      expires: new Date(
        Date.now() + +config.accessTokenExpiresIn * 60 * 1000
      ),
      maxAge: +config.accessTokenExpiresIn * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax" as "lax",
    };
    setCookie(event, 'accessToken', accessToken, accessTokenCookieOptions)
    setCookie(event, 'logged_in', 'true', {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    return { accessToken }
  } catch (error: any) {
    throw createError(error)
  }
};

export const logoutHandler = async (event: H3Event) => {
  try {
    deleteCookie(event, 'accessToken')
    deleteCookie(event, 'logged_in')
    await useStorage().removeItem(event.context.user._id.toString())
    return { message: 'logged out' }
  } catch (error: any) {
    throw createError(error)
  }
};
