import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsConnectorApps } from "#/components/pages/settings/settings-connector-apps"
import { SettingsWorkspaceName } from "#/components/pages/settings/settings-workspace-name"
import { listBlockedConnectorApps } from "#/data/connectors"

export const Route = createFileRoute("/$workspaceSlug/settings/workspace")({
  component: function SettingsWorkspacePage(): JSX.Element {
    const { blockedApps, workspaceId } = Route.useLoaderData()

    return (
      <>
        <h1 className="text-30">Workspace</h1>
        <Spacer height={16} />

        <SettingsWorkspaceName />
        <Spacer height={16} />

        <SettingsConnectorApps blockedApps={blockedApps} workspaceId={workspaceId} />
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
  loader: ({ context }) => ({
    blockedApps: listBlockedConnectorApps(context.workspace.id),
    workspaceId: context.workspace.id,
  }),
})
