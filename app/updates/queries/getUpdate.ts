import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetUpdate = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUpdate), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const update = await db.update.findFirst({ where: { id } })

  if (!update) throw new NotFoundError()

  return update
})
