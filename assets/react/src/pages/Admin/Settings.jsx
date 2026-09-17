import { Head, useForm, usePage } from "@inertiajs/react"
import { IconCheck, IconDeviceDesktop, IconLoader2, IconMoon, IconSun } from "@tabler/icons-react"

import { UserAvatar } from "@/components/admin/user-avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import AdminLayout from "@/layouts/AdminLayout"

const themes = [
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
  { value: "system", label: "System", icon: IconDeviceDesktop },
]

function ThemePreview({ dark }) {
  return (
    <div className={cn("space-y-2 rounded-md p-2", dark ? "bg-neutral-900" : "bg-neutral-100")}>
      <div className={cn("space-y-1.5 rounded-md p-2 shadow-xs", dark ? "bg-neutral-800" : "bg-white")}>
        <div className={cn("h-1.5 w-2/3 rounded-full", dark ? "bg-neutral-600" : "bg-neutral-200")} />
        <div className={cn("h-1.5 w-full rounded-full", dark ? "bg-neutral-600" : "bg-neutral-200")} />
      </div>
      <div className={cn("flex items-center gap-1.5 rounded-md p-2 shadow-xs", dark ? "bg-neutral-800" : "bg-white")}>
        <div className={cn("size-3 rounded-full", dark ? "bg-neutral-600" : "bg-neutral-200")} />
        <div className={cn("h-1.5 w-full rounded-full", dark ? "bg-neutral-600" : "bg-neutral-200")} />
      </div>
    </div>
  )
}

function ProfileCard() {
  const { auth } = usePage().props
  const form = useForm({ name: auth.user.name, email: auth.user.email })

  const submit = (event) => {
    event.preventDefault()
    form.put("/admin/settings", { preserveScroll: true })
  }

  return (
    <Card>
      <form onSubmit={submit} noValidate>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others see you in the workspace.</CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <FieldGroup>
            <div className="flex items-center gap-4">
              <UserAvatar name={form.data.name || auth.user.name} seed={auth.user.email} className="size-14 text-base" />
              <div className="grid leading-tight">
                <span className="font-medium">{auth.user.name}</span>
                <span className="text-sm text-muted-foreground">{auth.user.email}</span>
              </div>
            </div>
            <Field data-invalid={!!form.errors.name}>
              <FieldLabel htmlFor="settings-name">Name</FieldLabel>
              <Input
                id="settings-name"
                value={form.data.name}
                onChange={(event) => form.setData("name", event.target.value)}
                aria-invalid={!!form.errors.name}
              />
              <FieldError>{form.errors.name}</FieldError>
            </Field>
            <Field data-invalid={!!form.errors.email}>
              <FieldLabel htmlFor="settings-email">Email</FieldLabel>
              <Input
                id="settings-email"
                type="email"
                value={form.data.email}
                onChange={(event) => form.setData("email", event.target.value)}
                aria-invalid={!!form.errors.email}
              />
              <FieldDescription>Used to sign in and for notifications.</FieldDescription>
              <FieldError>{form.errors.email}</FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button type="button" variant="ghost" disabled={!form.isDirty || form.processing} onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={!form.isDirty || form.processing}>
            {form.processing && <IconLoader2 className="animate-spin" />}
            Save changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function AppearanceCard() {
  const { theme, setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Choose how the admin looks on this device.</CardDescription>
      </CardHeader>
      <CardContent>
        <div role="radiogroup" aria-label="Theme" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {themes.map((option) => {
            const selected = theme === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "group relative rounded-lg border-2 p-1 text-left transition-colors outline-none hover:border-muted-foreground/40 focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  selected ? "border-primary" : "border-muted",
                )}
              >
                {option.value === "system" ? (
                  <div className="grid grid-cols-2 overflow-hidden rounded-md">
                    <ThemePreview />
                    <ThemePreview dark />
                  </div>
                ) : (
                  <ThemePreview dark={option.value === "dark"} />
                )}
                <div className="flex items-center gap-2 px-1.5 py-2 text-sm font-medium">
                  <option.icon className="size-4 text-muted-foreground" />
                  {option.label}
                  {selected && <IconCheck className="ml-auto size-4" />}
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Settings() {
  return (
    <>
      <Head title="Settings" />
      <div className="flex flex-col gap-6 px-4 py-4 md:py-6 lg:px-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your profile and how the admin looks.</p>
        </div>
        <div className="grid max-w-4xl gap-6">
          <ProfileCard />
          <AppearanceCard />
        </div>
      </div>
    </>
  )
}

Settings.layout = (page) => <AdminLayout>{page}</AdminLayout>
