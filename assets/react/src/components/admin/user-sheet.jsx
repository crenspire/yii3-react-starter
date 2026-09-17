import * as React from "react"
import { useForm } from "@inertiajs/react"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const emptyUser = { name: "", email: "", role: "Viewer", status: "Invited" }

/**
 * Side sheet with the add/edit user form. Pass a user to edit it, or null to add one.
 */
export function UserSheet({ open, onOpenChange, user, roles, statuses }) {
  const form = useForm(emptyUser)

  React.useEffect(() => {
    if (open) {
      const values = user ? { name: user.name, email: user.email, role: user.role, status: user.status } : emptyUser
      form.setDefaults(values)
      form.setData(values)
      form.clearErrors()
    }
    // Only reset the form when the sheet opens for a different user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user?.id])

  const submit = (event) => {
    event.preventDefault()
    const options = { preserveScroll: true, onSuccess: () => onOpenChange(false) }
    if (user) {
      form.put(`/admin/users/${user.id}`, options)
    } else {
      form.post("/admin/users", options)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <form onSubmit={submit} noValidate className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>{user ? "Edit user" : "Add user"}</SheetTitle>
            <SheetDescription>
              {user ? `Update ${user.name}'s details and access.` : "Invite someone to your workspace."}
            </SheetDescription>
          </SheetHeader>
          <FieldGroup className="flex-1 overflow-y-auto px-4">
            <Field data-invalid={!!form.errors.name}>
              <FieldLabel htmlFor="user-name">Name</FieldLabel>
              <Input
                id="user-name"
                value={form.data.name}
                onChange={(event) => form.setData("name", event.target.value)}
                aria-invalid={!!form.errors.name}
                placeholder="Jane Cooper"
                autoFocus
              />
              <FieldError>{form.errors.name}</FieldError>
            </Field>
            <Field data-invalid={!!form.errors.email}>
              <FieldLabel htmlFor="user-email">Email</FieldLabel>
              <Input
                id="user-email"
                type="email"
                value={form.data.email}
                onChange={(event) => form.setData("email", event.target.value)}
                aria-invalid={!!form.errors.email}
                placeholder="jane@example.com"
              />
              <FieldError>{form.errors.email}</FieldError>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!form.errors.role}>
                <FieldLabel htmlFor="user-role">Role</FieldLabel>
                <Select value={form.data.role} onValueChange={(value) => form.setData("role", value)}>
                  <SelectTrigger id="user-role" className="w-full" aria-invalid={!!form.errors.role}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{form.errors.role}</FieldError>
              </Field>
              <Field data-invalid={!!form.errors.status}>
                <FieldLabel htmlFor="user-status">Status</FieldLabel>
                <Select value={form.data.status} onValueChange={(value) => form.setData("status", value)}>
                  <SelectTrigger id="user-status" className="w-full" aria-invalid={!!form.errors.status}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{form.errors.status}</FieldError>
              </Field>
            </div>
          </FieldGroup>
          <SheetFooter>
            <Button type="submit" disabled={form.processing}>
              {form.processing && <IconLoader2 className="animate-spin" />}
              {user ? "Save changes" : "Add user"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
