import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUpdate from "app/updates/queries/getUpdate"
import deleteUpdate from "app/updates/mutations/deleteUpdate"

export const Update = () => {
  const router = useRouter()
  const updateId = useParam("updateId", "number")
  const [deleteUpdateMutation] = useMutation(deleteUpdate)
  const [update] = useQuery(getUpdate, { id: updateId })

  return (
    <>
      <Head>
        <title>Update {update.id}</title>
      </Head>

      <div>
        <h1>Update {update.id}</h1>
        <pre>{JSON.stringify(update, null, 2)}</pre>

        <Link href={Routes.EditUpdatePage({ updateId: update.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUpdateMutation({ id: update.id })
              router.push(Routes.UpdatesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowUpdatePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.UpdatesPage()}>
          <a>Updates</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Update />
      </Suspense>
    </div>
  )
}

ShowUpdatePage.authenticate = true
ShowUpdatePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUpdatePage
