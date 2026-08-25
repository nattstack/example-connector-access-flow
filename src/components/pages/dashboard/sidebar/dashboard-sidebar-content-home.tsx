import { Column, Row, Spacer } from "@nattstack/ui"
import { Link, useParams, useRouteContext } from "@tanstack/react-router"
import { motion } from "motion/react"
import type { ComponentProps, JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import { BadgeTeam } from "#/components/badge-team"
import { DashboardWorkspaceCombobox } from "#/components/pages/dashboard/dashboard-workspace-combobox"
import {
  ANIMATION,
  ANIMATION_DIRECTION_BACK,
} from "#/components/pages/dashboard/sidebar/dashboard-sidebar-content-constants"
import { listAgentsByWorkspaceId, type Agent } from "#/data/agents"
import { formatRelativeTimestamp } from "#/utils/date"

interface DashboardSidebarContentHomeProps extends Pick<ComponentProps<"div">, "ref"> {}

interface LinkAgentProps {
  agent: Agent
  disabled?: boolean
}

export function DashboardSidebarContentHome(props: DashboardSidebarContentHomeProps): JSX.Element {
  const { ref } = props
  const { workspace } = useRouteContext({ from: "/$workspaceSlug" })

  const agents = listAgentsByWorkspaceId(workspace.id)

  return (
    <motion.div
      animate="animate"
      className="flex h-full min-h-0 flex-col"
      custom={{ direction: ANIMATION_DIRECTION_BACK }}
      exit="exit"
      initial="initial"
      ref={ref}
      transition={ANIMATION.transition}
      variants={ANIMATION.variants}
    >
      <Column className="px-8">
        <DashboardWorkspaceCombobox />
      </Column>
      <Spacer height={8} />

      <Spacer aria-hidden className="mx-16 border-t border-border" height={8} />

      <Column as="nav" className="min-h-0 flex-1 gap-y-4 overflow-y-auto px-8">
        {agents.map((agent, index) => (
          <LinkAgent agent={agent} disabled={index > 0} key={agent.id} />
        ))}
      </Column>
    </motion.div>
  )
}

function LinkAgent(props: LinkAgentProps): JSX.Element {
  const { agent, disabled = false } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  const content = (
    <>
      <AvatarAgent alt={agent.name} src={agent.avatar} />

      <Column className="w-full min-w-0">
        <Row className="items-baseline justify-between gap-x-8">
          <span className="min-w-0 truncate text-14 font-500 text-text-primary">{agent.name}</span>

          <time className="shrink-0 text-12 text-text-secondary" dateTime={agent.updatedAt}>
            {formatRelativeTimestamp(agent.updatedAt)}
          </time>
        </Row>

        <Row className="min-w-0 items-center">
          {agent.team && (
            <>
              <span className="pointer-events-auto">
                <BadgeTeam team={agent.team} />
              </span>
              <Spacer width={6} />
            </>
          )}

          <span className="truncate text-13 text-text-secondary">{agent.chat}</span>
        </Row>
      </Column>
    </>
  )

  if (disabled) {
    return (
      <div
        aria-disabled
        className="
          pointer-events-none flex h-56 w-full shrink-0 cursor-default
          items-center gap-x-8 rounded-12 px-8 opacity-50 select-none
        "
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className="
        relative flex h-56 w-full shrink-0 items-center gap-x-8 rounded-12 px-8
      "
    >
      <Link
        activeProps={{ className: "bg-gray-3" }}
        aria-label={agent.name}
        className="
          absolute inset-0 rounded-12
          hover:bg-gray-3
        "
        params={{ agentId: agent.id, workspaceSlug }}
        to="/$workspaceSlug/agents/$agentId"
      />
      <div className="
        pointer-events-none relative z-1 flex min-w-0 flex-1 items-center
        gap-x-8
      ">
        {content}
      </div>
    </div>
  )
}
