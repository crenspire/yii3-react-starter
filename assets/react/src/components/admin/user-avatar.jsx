import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const palette = [
  "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
]

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")
}

/** An initials avatar with a stable color per user. Pass the email as the seed so renaming keeps the color. */
export function UserAvatar({ name, seed = name, className }) {
  const color = palette[[...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length]

  return (
    <Avatar className={cn("size-8 rounded-lg", className)}>
      <AvatarFallback className={cn("rounded-lg text-xs font-medium", color)}>{initials(name)}</AvatarFallback>
    </Avatar>
  )
}
