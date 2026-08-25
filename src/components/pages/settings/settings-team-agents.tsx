import { IconChevronRightOutline18 } from "@nattstack/icons"
import { useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import {
  SettingsLinkRow,
  SettingsRow,
  SettingsSection,
} from "#/components/pages/settings/settings-section"
import type { Agent } from "#/data/agents"
import type { Team } from "#/data/teams"

interface SettingsTeamAgentRowProps {
  agent: Agent
}

interface SettingsTeamAgentsProps {
  agents: Agent[]
}

interface SettingsTeamGeneralProps {
  team: Team
}

export function SettingsTeamAgents(props: SettingsTeamAgentsProps): JSX.Element {
  const { agents } = props

  return (
    <SettingsSection title="Agents">
      {agents.length === 0 ? (
        <SettingsRow description="No agents have joined this team yet." label="Agents">
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        agents.map((agent) => <SettingsTeamAgentRow agent={agent} key={agent.id} />)
      )}
    </SettingsSection>
  )
}

export function SettingsTeamGeneral(props: SettingsTeamGeneralProps): JSX.Element {
  const { team } = props

  return (
    <SettingsSection>
      <SettingsRow
        description="Members and agents can join this team. Shown in settings and anywhere this team appears."
        label="Name"
      >
        <span className="text-14 text-text-secondary">{team.name}</span>
      </SettingsRow>
      <SettingsRow description={team.description} label="Description" />
      <SettingsRow description="Used in this team's URL. This cannot be changed." label="URL">
        <span className="text-14 text-text-secondary">/{team.slug}</span>
      </SettingsRow>
    </SettingsSection>
  )
}

function SettingsTeamAgentRow(props: SettingsTeamAgentRowProps): JSX.Element {
  const { agent } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <SettingsLinkRow
      description={agent.chat}
      label={agent.name}
      leading={<AvatarAgent alt={agent.name} src={agent.avatar} />}
      link={{
        params: { agentId: agent.id, workspaceSlug },
        to: "/$workspaceSlug/agents/$agentId",
      }}
    >
      <IconChevronRightOutline18 className="text-gray-9" />
    </SettingsLinkRow>
  )
}
