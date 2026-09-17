import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const number = new Intl.NumberFormat("en-US")

function Trend({ value, suffix = "%" }) {
  const up = value >= 0
  const Icon = up ? IconTrendingUp : IconTrendingDown

  return (
    <Badge variant="outline">
      <Icon />
      {up ? "+" : ""}
      {value}
      {suffix}
    </Badge>
  )
}

function StatCard({ label, value, badge, headline, headlineUp = true, detail }) {
  const Icon = headlineUp ? IconTrendingUp : IconTrendingDown

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardTitle>
        {badge && <CardAction>{badge}</CardAction>}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {headline} <Icon className="size-4" />
        </div>
        <div className="text-muted-foreground">{detail}</div>
      </CardFooter>
    </Card>
  )
}

export function SectionCards({ stats }) {
  const growth =
    stats.newLastMonth === 0
      ? stats.newThisMonth * 100
      : Math.round(((stats.newThisMonth - stats.newLastMonth) / stats.newLastMonth) * 1000) / 10

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <StatCard
        label="Total users"
        value={number.format(stats.totalUsers)}
        badge={<Trend value={stats.newThisMonth} suffix=" new" />}
        headline={`${stats.newThisMonth} joined in the last 30 days`}
        detail="All registered accounts"
      />
      <StatCard
        label="New users"
        value={number.format(stats.newThisMonth)}
        badge={<Trend value={growth} />}
        headline={growth >= 0 ? "Up from the previous 30 days" : "Down from the previous 30 days"}
        headlineUp={growth >= 0}
        detail={`${stats.newLastMonth} in the 30 days before`}
      />
      <StatCard
        label="Active users"
        value={number.format(stats.activeUsers)}
        badge={<Badge variant="outline">{stats.activeRate}%</Badge>}
        headline="Share of accounts in use"
        detail="Excludes invited and suspended users"
      />
      <StatCard
        label="Pending invites"
        value={number.format(stats.pendingInvites)}
        headline={stats.pendingInvites > 0 ? "Waiting for sign-up" : "No open invites"}
        headlineUp={stats.pendingInvites === 0}
        detail="Invited users who have not joined yet"
      />
    </div>
  )
}
