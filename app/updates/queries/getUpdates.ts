import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetUpdatesInput
  extends Pick<Prisma.UpdateFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUpdatesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: updates,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.update.count({ where }),
      query: (paginateArgs) => db.update.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      updates,
      nextPage,
      hasMore,
      count,
    }
  }
)
