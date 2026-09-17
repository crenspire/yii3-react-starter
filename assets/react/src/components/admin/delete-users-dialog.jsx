import { router } from "@inertiajs/react"
import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

/** Confirms and deletes the given users. */
export function DeleteUsersDialog({ users, onOpenChange, onDeleted }) {
  const [processing, setProcessing] = React.useState(false)
  const open = users.length > 0
  const single = users.length === 1

  const confirm = (event) => {
    event.preventDefault()
    router.delete("/admin/users", {
      data: { ids: users.map((user) => user.id) },
      preserveScroll: true,
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => {
        onOpenChange(false)
        onDeleted?.()
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {single ? `Delete ${users[0].name}?` : `Delete ${users.length} users?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {single
              ? "This removes the user and their access. You can't undo this."
              : "This removes the selected users and their access. You can't undo this."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirm}
            disabled={processing}
            className="bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive/60"
          >
            {single ? "Delete user" : "Delete users"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
