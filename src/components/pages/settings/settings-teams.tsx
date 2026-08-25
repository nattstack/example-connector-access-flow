import { IconChevronRightOutline18 } from "@nattstack/icons"
import { Column, Spacer } from "@nattstack/ui"
import { Link, useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import type { TeamWithAgents } from "#/data/teams"

interface SettingsTeamRowProps {
  item: TeamWithAgents
}

interface SettingsTeamsProps {
  items: TeamWithAgents[]
}

export function SettingsTeams(props: SettingsTeamsProps): JSX.Element {
  const { items } = props

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Your teams</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        These are the teams agents in this workspace are part of.
      </p>
      <Spacer height={16} />

      {items.length === 0 ? (
        <p className="text-14 text-text-secondary">No teams in this workspace yet.</p>
      ) : (
        <Column as="ul" className="gap-y-4">
          {items.map((item) => (
            <SettingsTeamRow item={item} key={item.team.id} />
          ))}
        </Column>
      )}
    </Column>
  )
}

function formatAgentCountLabel(count: number): string {
  return count === 1 ? "1 agent" : `${count} agents`
}

function SettingsTeamRow(props: SettingsTeamRowProps): JSX.Element {
  const { item } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <li>
      <Link
        className="
          flex min-h-56 w-full items-center rounded-12 px-12 select-none
          hover:bg-gray-3
        "
        params={{ teamSlug: item.team.slug, workspaceSlug }}
        to="/$workspaceSlug/settings/teams/$teamSlug"
      >
        <Column className="min-w-0 flex-1">
          <span className="truncate text-14 font-500 text-text-primary">{item.team.name}</span>

          <span className="truncate text-13 text-text-secondary">
            {formatAgentCountLabel(item.agents.length)}
          </span>
        </Column>
        <Spacer width={8} />

        <IconChevronRightOutline18 className="shrink-0 text-gray-9" />
      </Link>
    </li>
  )
}
