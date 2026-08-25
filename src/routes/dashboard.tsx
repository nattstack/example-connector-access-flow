import { Row } from "@nattstack/ui"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { DashboardSidebar } from "#/components/dashboard-sidebar.tsx"

export const Route = createFileRoute("/dashboard")({
  component: function DashboardLayout(): JSX.Element {
    return (
      <Row className="min-h-svh bg-bg-shell-outer">
        <DashboardSidebar />
        <main className="min-w-0 flex-1 bg-bg-shell-inner">
          <Outlet />
        </main>
      </Row>
    )
  },
})
