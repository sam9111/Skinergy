import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUpdate = z.object({
  self_evaluation: z.string(),
  rating: z.number(),
  water: z.number(),
  sleep: z.number(),
})

export default resolver.pipe(resolver.zod(CreateUpdate), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const update = await db.update.create({ data: input })

  return update
})
