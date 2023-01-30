import { AnyZodObject, ZodError } from 'zod'
import { H3Event, createError, readBody, getQuery, getRouterParams } from 'h3'

export const validateBySchema = async (event: H3Event, schema: AnyZodObject) => {
  try {
    schema.parse({
      params: getRouterParams(event),
      query: getQuery(event),
      body: await readBody(event),
    })
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Validation Error',
        message: JSON.stringify(err),
      })
    }
    throw createError(err)
  }
}
