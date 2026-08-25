import { Column, Row, Spacer } from "@nattstack/ui"
import { Link, type LinkComponentProps } from "@tanstack/react-router"
import type { JSX } from "react"
import { LogoLink } from "#/components/logo-link"
import { MOCK_AGENTS, type Agent } from "#/data/agents"

interface LinkAgentProps {
  agent: Agent
}

export function DashboardSidebar(): JSX.Element {
  return (
    <Column
      as="aside"
      className="
        sticky top-0 left-0 isolate z-30 h-dvh w-256 shrink-0
        shadow-[inset_-1px_0_0_0_var(--color-border)]
      "
    >
      {/* Logo */}
      <Row className="mt-8 ml-8">
        <LogoLink />
      </Row>
      <Spacer height={8} />

      {/* Navigation */}
      <Column as="nav" className="gap-y-2 px-8">
        <NavLink activeOptions={{ exact: true }} label="Home" to="/dashboard" />
      </Column>
      <Spacer height={24} />

      <p className="px-12 text-12 uppercase">Agents</p>
      <Spacer className="h-8" />

      <Column as="nav" className="gap-y-2 px-8">
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
        flex h-56 w-full items-center gap-x-8 rounded-8 px-8
        hover:bg-gray-3
      "
      params={{ agentId: agent.id }}
      to="/dashboard/agents/$agentId"
    >
      {/* Avatar */}
      <Row className="aspect-1-1 h-40 rounded-full bg-gray-4" />

      <Column className="w-full min-w-0">
        {/* Name */}
        <span className="text-14 font-500 text-text-primary">{agent.name}</span>

        {/* Chat */}
        <span className="truncate text-14 text-text-secondary">{agent.chat}</span>
      </Column>
    </Link>
  )
}

function NavLink(props: { label: string } & LinkComponentProps): JSX.Element {
  const { label = "", to = "/dashboard", ...rest } = props

  return (
    <Link
      activeProps={{ className: "bg-gray-3 text-text-primary!" }}
      className="
        flex h-36 items-center rounded-8 px-8 text-14 text-text-secondary
        hover:bg-gray-3 hover:text-text-primary
      "
      to={to}
      {...rest}
    >
      {label}
    </Link>
  )
}
