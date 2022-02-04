import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUpdate = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateUpdate), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const update = await db.update.create({ data: input })

  return update
})
