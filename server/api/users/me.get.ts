import { getMeHandler } from "~~/server/controllers/user.controller";


export default defineEventHandler(async (event) => {
  const response = getMeHandler(event);
  return response;
});
