import { Column, Spacer } from "@nattstack/ui"
import { createFileRoute, notFound, useRouteContext } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsBackLink } from "#/components/pages/settings/settings-back-link"
import {
  SettingsTeamAgents,
  SettingsTeamGeneral,
} from "#/components/pages/settings/settings-team-agents"
import { SettingsTeamConnectors } from "#/components/pages/settings/settings-team-connectors"
import { SettingsTeamMembers } from "#/components/pages/settings/settings-team-members"
import { listConnectorsForTeam } from "#/data/connectors"
import { getTeamBySlug, listTeamAgents, listTeamMembers } from "#/data/teams"
import { getWorkspaceBySlug } from "#/data/workspaces"

export const Route = createFileRoute("/$workspaceSlug/settings/teams/$teamSlug")({
  beforeLoad: ({ context, params }) => {
    const team = getTeamBySlug(context.workspace.id, params.teamSlug)

    if (team === undefined) {
      throw notFound()
    }
  },
  component: function SettingsTeamDetailPage(): JSX.Element {
    const { workspace } = useRouteContext({ from: "/$workspaceSlug" })
    const { teamSlug } = Route.useParams()
    const team = getTeamBySlug(workspace.id, teamSlug)

    if (team === undefined) {
      throw notFound()
    }

    return (
      <>
        <SettingsBackLink label="Teams" />
        <Spacer height={8} />

        <h1 className="text-30">{team.name}</h1>
        <Spacer height={24} />

        <Column className="gap-y-32">
          <SettingsTeamGeneral team={team} />
          <SettingsTeamMembers members={listTeamMembers(workspace.id, team.id)} />
          <SettingsTeamAgents agents={listTeamAgents(workspace.id, team.name)} />
          <SettingsTeamConnectors connectors={listConnectorsForTeam(workspace.id, team.id)} />
        </Column>
      </>
    )
  },
  head: ({ params }) => {
    const workspace = getWorkspaceBySlug(params.workspaceSlug)
    const team = workspace === undefined ? undefined : getTeamBySlug(workspace.id, params.teamSlug)

    return {
      meta: [
        {
          title: team === undefined ? "Teams · Settings" : `${team.name} · Teams · Settings`,
        },
      ],
    }
  },
})
