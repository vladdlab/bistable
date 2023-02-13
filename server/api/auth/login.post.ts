import { loginHandler } from "~~/server/controllers/auth.controller";
import { loginUserSchema } from "~~/schemas/user.schema"
import { validateBySchema } from "~~/server/utils/validateBySchema"

export default eventHandler(async (event) => {
  await validateBySchema(event, loginUserSchema);
  const response = await loginHandler(event);
  return response;
})
