import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsTeams } from "#/components/pages/settings/settings-teams"
import { listTeamsWithAgentsByWorkspaceId } from "#/data/teams"

export const Route = createFileRoute("/$workspaceSlug/settings/teams/")({
  component: function SettingsTeamsPage(): JSX.Element {
    const { items } = Route.useLoaderData()

    return <SettingsTeams items={items} />
  },
  head: () => ({
    meta: [
      {
        title: "Teams · Settings",
      },
    ],
  }),
  loader: ({ context }) => ({
    items: listTeamsWithAgentsByWorkspaceId(context.workspace.id),
  }),
})
