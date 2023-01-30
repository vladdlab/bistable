import { getAllUsersHandler } from "~~/server/controllers/user.controller";


export default defineEventHandler(async (event) => {
  const response = getAllUsersHandler(event);
  return response;
});
