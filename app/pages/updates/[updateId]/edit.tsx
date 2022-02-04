import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUpdate from "app/updates/queries/getUpdate"
import updateUpdate from "app/updates/mutations/updateUpdate"
import { UpdateForm, FORM_ERROR } from "app/updates/components/UpdateForm"

export const EditUpdate = () => {
  const router = useRouter()
  const updateId = useParam("updateId", "number")
  const [update, { setQueryData }] = useQuery(
    getUpdate,
    { id: updateId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUpdateMutation] = useMutation(updateUpdate)

  return (
    <>
      <Head>
        <title>Edit Update {update.id}</title>
      </Head>

      <div>
        <h1>Edit Update {update.id}</h1>
        <pre>{JSON.stringify(update, null, 2)}</pre>

        <UpdateForm
          submitText="Update Update"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateUpdate}
          initialValues={update}
          onSubmit={async (values) => {
            try {
              const updated = await updateUpdateMutation({
                id: update.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowUpdatePage({ updateId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditUpdatePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUpdate />
      </Suspense>

      <p>
        <Link href={Routes.UpdatesPage()}>
          <a>Updates</a>
        </Link>
      </p>
    </div>
  )
}

EditUpdatePage.authenticate = true
EditUpdatePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUpdatePage
