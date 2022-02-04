import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteUpdate = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteUpdate), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const update = await db.update.deleteMany({ where: { id } })

  return update
})
