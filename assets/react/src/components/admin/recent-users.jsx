import { Link } from "@inertiajs/react"
import { IconArrowRight } from "@tabler/icons-react"

import { formatDate, StatusBadge } from "@/components/admin/status-badge"
import { UserAvatar } from "@/components/admin/user-avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function RecentUsers({ users }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Recent sign-ups</CardTitle>
        <CardDescription>The newest accounts in your workspace</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/users">
              View all
              <IconArrowRight />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden @[540px]/card:table-cell">Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden text-right @[400px]/card:table-cell">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} seed={user.email} />
                      <div className="grid leading-tight">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground @[540px]/card:table-cell">{user.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className="hidden text-right text-muted-foreground tabular-nums @[400px]/card:table-cell">
                    {formatDate(user.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
