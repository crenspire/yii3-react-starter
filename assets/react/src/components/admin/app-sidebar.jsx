import { Link, usePage } from "@inertiajs/react"
import { IconInnerShadowTop } from "@tabler/icons-react"

import { NavMain } from "@/components/admin/nav-main"
import { NavSecondary } from "@/components/admin/nav-secondary"
import { NavUser } from "@/components/admin/nav-user"
import { mainNavigation, secondaryNavigation } from "@/components/admin/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar(props) {
  const { auth, repositoryUrl } = usePage().props

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconInnerShadowTop className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Yii3 Admin</span>
                  <span className="truncate text-xs text-muted-foreground">Starter Kit</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavigation} />
        <NavSecondary items={secondaryNavigation(repositoryUrl)} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{auth?.user && <NavUser user={auth.user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
