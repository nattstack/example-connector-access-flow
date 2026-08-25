import { Column, Row } from "@nattstack/ui"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { DashboardSidebar } from "#/components/pages/dashboard/dashboard-sidebar"

export const Route = createFileRoute("/dashboard")({
  component: function DashboardLayout(): JSX.Element {
    return (
      <Row className="min-h-dvh">
        <DashboardSidebar />

        <Column as="main" className="w-full">
          <Outlet />
        </Column>
      </Row>
    )
  },
})
