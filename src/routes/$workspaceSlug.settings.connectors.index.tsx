import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsConnectors } from "#/components/pages/settings/settings-connectors"
import { listConnectorsByWorkspaceId } from "#/data/connectors"
import { listTeamsByWorkspaceId } from "#/data/teams"

export const Route = createFileRoute("/$workspaceSlug/settings/connectors/")({
  component: function SettingsConnectorsPage(): JSX.Element {
    const { connectors, teams, workspaceId } = Route.useLoaderData()

    return (
      <>
        <h1 className="text-30">Connectors</h1>
        <Spacer height={16} />

        <SettingsConnectors connectors={connectors} teams={teams} workspaceId={workspaceId} />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Connectors · Settings",
      },
    ],
  }),
  loader: ({ context }) => ({
    connectors: listConnectorsByWorkspaceId(context.workspace.id),
    teams: listTeamsByWorkspaceId(context.workspace.id),
    workspaceId: context.workspace.id,
  }),
})
