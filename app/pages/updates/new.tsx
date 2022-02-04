import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createUpdate from "app/updates/mutations/createUpdate"
import { UpdateForm, FORM_ERROR } from "app/updates/components/UpdateForm"

const NewUpdatePage: BlitzPage = () => {
  const router = useRouter()
  const [createUpdateMutation] = useMutation(createUpdate)

  return (
    <div>
      <h1>Create New Update</h1>

      <UpdateForm
        submitText="Create Update"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateUpdate}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const update = await createUpdateMutation(values)
            router.push(Routes.ShowUpdatePage({ updateId: update.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.UpdatesPage()}>
          <a>Updates</a>
        </Link>
      </p>
    </div>
  )
}

NewUpdatePage.authenticate = true
NewUpdatePage.getLayout = (page) => <Layout title={"Create New Update"}>{page}</Layout>

export default NewUpdatePage
