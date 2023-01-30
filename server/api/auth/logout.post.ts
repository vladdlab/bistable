import { logoutHandler } from "~~/server/controllers/auth.controller";

export default eventHandler(async (event) => {
  const response = logoutHandler(event);
  return response;
})
