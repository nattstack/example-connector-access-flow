import { Column, Row } from "@nattstack/ui"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import type { JSX } from "react"
import { DashboardSidebar } from "#/components/pages/dashboard/dashboard-sidebar"
import { getWorkspaceBySlug } from "#/data/workspaces"

export const Route = createFileRoute("/$workspaceSlug")({
  beforeLoad: ({ params }) => {
    const workspace = getWorkspaceBySlug(params.workspaceSlug)

    if (workspace === undefined) {
      throw redirect({ to: "/" })
    }

    return { workspace }
  },
  component: function WorkspaceLayout(): JSX.Element {
    return (
      <Row className="min-h-dvh">
        <DashboardSidebar />

        <Column as="main" className="h-dvh min-h-0 w-full overflow-hidden">
          <Outlet />
        </Column>
      </Row>
    )
  },
  head: ({ params }) => {
    const workspace = getWorkspaceBySlug(params.workspaceSlug)

    return {
      meta: [
        {
          title: workspace?.name ?? "Dashboard",
        },
      ],
    }
  },
})
