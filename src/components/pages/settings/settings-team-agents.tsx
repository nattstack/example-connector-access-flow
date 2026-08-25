import { Column, Spacer } from "@nattstack/ui"
import { Link, useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import type { Agent } from "#/data/agents"
import type { Team } from "#/data/teams"

interface SettingsTeamAgentRowProps {
  agent: Agent
}

interface SettingsTeamAgentsProps {
  agents: Agent[]
  team: Team
}

export function SettingsTeamAgents(props: SettingsTeamAgentsProps): JSX.Element {
  const { agents, team } = props

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Agents</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">{team.description}</p>
      <Spacer height={16} />

      {agents.length === 0 ? (
        <p className="text-14 text-text-secondary">No agents are part of this team yet.</p>
      ) : (
        <Column as="ul" className="gap-y-4">
          {agents.map((agent) => (
            <SettingsTeamAgentRow agent={agent} key={agent.id} />
          ))}
        </Column>
      )}
    </Column>
  )
}

function SettingsTeamAgentRow(props: SettingsTeamAgentRowProps): JSX.Element {
  const { agent } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <li>
      <Link
        className="
          flex min-h-56 w-full items-center rounded-12 px-12 select-none
          hover:bg-gray-3
        "
        params={{ agentId: agent.id, workspaceSlug }}
        to="/$workspaceSlug/agents/$agentId"
      >
        <AvatarAgent alt={agent.name} src={agent.avatar} />
        <Spacer width={8} />

        <Column className="min-w-0 flex-1">
          <span className="truncate text-14 font-500 text-text-primary">{agent.name}</span>
          <span className="truncate text-13 text-text-secondary">{agent.chat}</span>
        </Column>
      </Link>
    </li>
  )
}
