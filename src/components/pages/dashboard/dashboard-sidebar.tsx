import { Column, Row, Spacer } from "@nattstack/ui"
import { Link } from "@tanstack/react-router"
import type { JSX } from "react"
import { AgentAvatar } from "#/components/agent-avatar"
import { LogoLink } from "#/components/logo-link"
import { MOCK_AGENTS, type Agent } from "#/data/agents"
import { formatRelativeTimestamp } from "#/utils/date"

interface LinkAgentProps {
  agent: Agent
}

export function DashboardSidebar(): JSX.Element {
  return (
    <Column
      as="aside"
      className="
        sticky top-0 left-0 isolate z-30 h-dvh w-288 shrink-0
        shadow-[inset_-1px_0_0_0_var(--color-border)]
      "
    >
      {/* Logo */}
      <Row className="mt-8 ml-8">
        <LogoLink />
      </Row>
      <Spacer height={8} />

      {/* Agents */}
      <Column as="nav" className="gap-y-4 overflow-y-auto px-8">
        {MOCK_AGENTS.map((agent) => (
          <LinkAgent agent={agent} key={agent.id} />
        ))}
      </Column>
    </Column>
  )
}

function LinkAgent(props: LinkAgentProps): JSX.Element {
  const { agent } = props

  return (
    <Link
      activeProps={{ className: "bg-gray-3" }}
      className="
        flex h-56 w-full shrink-0 items-center gap-x-8 rounded-8 px-8
        hover:bg-gray-3
      "
      params={{ agentId: agent.id }}
      to="/dashboard/agents/$agentId"
    >
      {/* Avatar */}
      <AgentAvatar alt={agent.name} src={agent.logo} />

      <Column className="w-full min-w-0">
        <Row className="items-baseline justify-between gap-x-8">
          {/* Name */}
          <span className="min-w-0 truncate text-14 font-500 text-text-primary">{agent.name}</span>

          {/* Updated at */}
          <time className="shrink-0 text-12 text-text-secondary" dateTime={agent.updatedAt}>
            {formatRelativeTimestamp(agent.updatedAt)}
          </time>
        </Row>

        {/* Team and chat */}
        <span className="truncate text-13 text-text-secondary">
          {agent.team} · {agent.chat}
        </span>
      </Column>
    </Link>
  )
}
