import { IconChevronRightOutline18 } from "@nattstack/icons"
import { useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import {
  SettingsLinkRow,
  SettingsRow,
  SettingsSection,
} from "#/components/pages/settings/settings-section"
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
    <SettingsSection>
      {items.length === 0 ? (
        <SettingsRow description="No teams in this workspace yet." label="Teams">
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        items.map((item) => <SettingsTeamRow item={item} key={item.team.id} />)
      )}
    </SettingsSection>
  )
}

function formatAgentCountLabel(count: number): string {
  return count === 1 ? "1 agent" : `${count} agents`
}

function SettingsTeamRow(props: SettingsTeamRowProps): JSX.Element {
  const { item } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <SettingsLinkRow
      description={formatAgentCountLabel(item.agents.length)}
      label={item.team.name}
      link={{
        params: { teamSlug: item.team.slug, workspaceSlug },
        to: "/$workspaceSlug/settings/teams/$teamSlug",
      }}
    >
      <IconChevronRightOutline18 className="text-gray-9" />
    </SettingsLinkRow>
  )
}
