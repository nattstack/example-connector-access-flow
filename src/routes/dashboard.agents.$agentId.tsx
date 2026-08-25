import { Row } from "@nattstack/ui"
import { createFileRoute, notFound } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import { AgentChat } from "#/components/pages/dashboard/agent-chat"
import { getAgentById } from "#/data/agents.ts"

export const Route = createFileRoute("/dashboard/agents/$agentId")({
  component: function AgentDetailPage(): JSX.Element {
    const { agent } = Route.useLoaderData()

    return (
      <>
        {/* Header */}
        <Row
          as="header"
          className="
            sticky top-0 left-0 isolate z-30 h-44 items-center gap-x-8
            bg-bg-shell-outer px-16
            shadow-[inset_0_-1px_0_0_var(--color-border)]
          "
        >
          <AvatarAgent alt={agent.name} size={20} src={agent.logo} />
          <span className="text-14 font-500 text-text-primary">{agent.name}</span>
        </Row>

        {/* Content */}
        <AgentChat />
      </>
    )
  },
  loader: ({ params }) => {
    const agent = getAgentById(params.agentId)

    if (agent === undefined) {
      throw notFound()
    }

    return { agent }
  },
})
