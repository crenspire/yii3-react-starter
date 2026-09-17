import { Head } from "@inertiajs/react"

import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive"
import { RecentUsers } from "@/components/admin/recent-users"
import { SectionCards } from "@/components/admin/section-cards"
import AdminLayout from "@/layouts/AdminLayout"

export default function Dashboard({ stats, traffic, recentUsers }) {
  return (
    <>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards stats={stats} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive data={traffic} />
        </div>
        <div className="px-4 lg:px-6">
          <RecentUsers users={recentUsers} />
        </div>
      </div>
    </>
  )
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>
