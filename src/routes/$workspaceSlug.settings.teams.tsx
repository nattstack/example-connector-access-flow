import { Outlet, createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"

export const Route = createFileRoute("/$workspaceSlug/settings/teams")({
  component: function SettingsTeamsLayout(): JSX.Element {
    return <Outlet />
  },
})
