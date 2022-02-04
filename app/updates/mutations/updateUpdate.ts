import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateUpdate = z.object({
  id: z.number(),
  name: z.string(),
  self_evaluation: z.string(),
  rating: z.number(),
  water: z.number(),
  sleep: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateUpdate),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const update = await db.update.update({ where: { id }, data })

    return update
  }
)
