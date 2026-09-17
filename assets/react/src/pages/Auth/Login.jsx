import { Head, Link, useForm } from "@inertiajs/react"
import { IconInnerShadowTop, IconInfoCircle, IconLoader2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginForm() {
  const form = useForm({ email: "", password: "", remember: false })

  const submit = (event) => {
    event.preventDefault()
    form.post("/login", { onFinish: () => form.reset("password") })
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field data-invalid={!!form.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="m@example.com"
            value={form.data.email}
            onChange={(event) => form.setData("email", event.target.value)}
            aria-invalid={!!form.errors.email}
            autoFocus
          />
          <FieldError>{form.errors.email}</FieldError>
        </Field>
        <Field data-invalid={!!form.errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={form.data.password}
            onChange={(event) => form.setData("password", event.target.value)}
            aria-invalid={!!form.errors.password}
          />
          <FieldError>{form.errors.password}</FieldError>
        </Field>
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={form.data.remember}
            onCheckedChange={(checked) => form.setData("remember", checked === true)}
          />
          <Label htmlFor="remember" className="font-normal">
            Keep me signed in
          </Label>
        </div>
        <Field>
          <Button type="submit" disabled={form.processing}>
            {form.processing && <IconLoader2 className="animate-spin" />}
            Login
          </Button>
        </Field>
        <div className="flex gap-2 rounded-lg border border-dashed bg-muted/40 p-3 text-xs text-muted-foreground">
          <IconInfoCircle className="mt-px size-4 shrink-0" />
          <p>
            Demo sign-in: use any email and a password of at least 8 characters. Real authentication is on the
            roadmap.
          </p>
        </div>
      </FieldGroup>
    </form>
  )
}

function Showcase() {
  const bars = [38, 52, 44, 68, 57, 76, 64, 88, 72, 94, 81, 100]

  return (
    <div className="relative hidden overflow-hidden bg-neutral-950 text-white lg:flex lg:flex-col">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-size-[36px_36px]"
      />
      <div aria-hidden className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-indigo-500/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/60">Total users</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums">12,480</p>
              </div>
              <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                +18.2%
              </span>
            </div>
            <div className="mt-6 flex h-24 items-end gap-1.5">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm bg-linear-to-t from-indigo-500/40 to-indigo-300"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="ml-10 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md">
            <div className="flex -space-x-2">
              {["OM", "JL", "IN"].map((initials, index) => (
                <span
                  key={initials}
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-neutral-900 text-[10px] font-semibold ${["bg-rose-400/90", "bg-amber-400/90", "bg-sky-400/90"][index]}`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight">
              <p className="font-medium">3 new team members</p>
              <p className="text-white/60">joined your workspace today</p>
            </div>
          </div>
        </div>
      </div>

      <blockquote className="relative space-y-2 p-10">
        <p className="text-lg leading-relaxed text-white/90">
          &ldquo;Routing, validation and security stay in Yii3. The UI feels like a modern SPA. Best of both
          worlds.&rdquo;
        </p>
        <footer className="text-sm text-white/60">Yii3 React Starter Kit</footer>
      </blockquote>
    </div>
  )
}

export default function Login() {
  return (
    <>
      <Head title="Login" />
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <IconInnerShadowTop className="size-4" />
              </div>
              Yii3 Starter Kit
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <Showcase />
      </div>
    </>
  )
}
