import { Head, usePage } from "@inertiajs/react"

import { UsersTable } from "@/components/admin/users-table"
import AdminLayout from "@/layouts/AdminLayout"

export default function Users({ users, roles, statuses }) {
  const { url } = usePage()
  const startWithCreate = new URLSearchParams(url.split("?")[1] ?? "").has("create")

  return (
    <>
      <Head title="Users" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex flex-col gap-1 px-4 lg:px-6">
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage who can access your workspace. Demo data is stored in your session.
          </p>
        </div>
        <UsersTable key={url} users={users} roles={roles} statuses={statuses} startWithCreate={startWithCreate} />
      </div>
    </>
  )
}

Users.layout = (page) => <AdminLayout>{page}</AdminLayout>
