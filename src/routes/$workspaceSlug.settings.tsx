import { Outlet, createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { LayoutMain } from "#/components/pages/dashboard/layout-main"

export const Route = createFileRoute("/$workspaceSlug/settings")({
  component: function SettingsLayout(): JSX.Element {
    return (
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Settings",
      },
    ],
  }),
})
