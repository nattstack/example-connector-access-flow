import { Spacer } from "@nattstack/ui"
import { createFileRoute, useRouteContext } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsConnectorApps } from "#/components/pages/settings/settings-connector-apps"
import { SettingsWorkspaceName } from "#/components/pages/settings/settings-workspace-name"

export const Route = createFileRoute("/$workspaceSlug/settings/workspace")({
  component: function SettingsWorkspacePage(): JSX.Element {
    const { workspace } = useRouteContext({ from: "/$workspaceSlug" })

    return (
      <>
        <h1 className="text-30">Workspace</h1>
        <Spacer height={16} />

        <SettingsWorkspaceName />
        <Spacer height={16} />

        <SettingsConnectorApps workspaceId={workspace.id} />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Workspace · Settings",
      },
    ],
  }),
})
