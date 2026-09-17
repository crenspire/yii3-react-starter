import { AppSidebar } from "@/components/admin/app-sidebar"
import { SiteHeader } from "@/components/admin/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

function sidebarOpenFromCookie() {
  return !document.cookie.split("; ").includes("sidebar_state=false")
}

/**
 * The admin shell: collapsible inset sidebar and header. Pages use it as a persistent layout
 * (Page.layout = (page) => <AdminLayout>{page}</AdminLayout>), so the sidebar keeps its state between visits.
 */
export default function AdminLayout({ children }) {
  return (
    <SidebarProvider
      defaultOpen={sidebarOpenFromCookie()}
      style={{
        "--sidebar-width": "calc(var(--spacing) * 64)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
