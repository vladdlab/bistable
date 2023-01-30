import { H3Event, createError } from 'h3'
import { findAllUsers } from '~~/server/services/user.service';


export const getMeHandler = (event: H3Event) => {
  try {
    const user = event.context.user;
    delete user.password;
    return user
  } catch (err: any) {
    throw createError(err)
  }
};

export const getAllUsersHandler = async (event: H3Event) => {
  try {
    const users = await findAllUsers();
    return users
  } catch (err: any) {
    throw createError(err)
  }
};
