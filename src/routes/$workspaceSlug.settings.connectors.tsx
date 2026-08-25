import { Outlet, createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"

export const Route = createFileRoute("/$workspaceSlug/settings/connectors")({
  component: function SettingsConnectorsLayout(): JSX.Element {
    return <Outlet />
  },
})
