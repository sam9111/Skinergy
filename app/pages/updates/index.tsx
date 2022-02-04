import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUpdates from "app/updates/queries/getUpdates"

const ITEMS_PER_PAGE = 100

export const UpdatesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ updates, hasMore }] = usePaginatedQuery(getUpdates, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {updates.map((update) => (
          <li key={update.id}>
            <Link href={Routes.ShowUpdatePage({ updateId: update.id })}>
              <a>{update.id}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const UpdatesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Updates</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewUpdatePage()}>
            <a>Create Update</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <UpdatesList />
        </Suspense>
      </div>
    </>
  )
}

UpdatesPage.authenticate = true
UpdatesPage.getLayout = (page) => <Layout>{page}</Layout>

export default UpdatesPage
