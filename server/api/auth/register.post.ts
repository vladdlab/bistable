import { registerHandler } from "~~/server/controllers/auth.controller";
import { registerUserSchema } from "~~/schemas/user.schema"
import { validateBySchema } from "~~/server/utils/validateBySchema"

export default eventHandler(async (event) => {
  await validateBySchema(event, registerUserSchema);
  const response = await registerHandler(event);
  return response;
})
