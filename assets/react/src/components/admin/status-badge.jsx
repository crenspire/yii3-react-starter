import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const dots = {
  Active: "bg-emerald-500",
  Invited: "bg-amber-500",
  Suspended: "bg-rose-500",
}

export function StatusBadge({ status }) {
  return (
    <Badge variant="outline" className="gap-1.5 px-1.5 text-muted-foreground">
      <span className={cn("size-1.5 rounded-full", dots[status] ?? "bg-muted-foreground")} />
      {status}
    </Badge>
  )
}

export function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
