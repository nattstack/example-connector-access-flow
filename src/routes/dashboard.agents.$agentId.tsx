import { Column, Row, Spacer } from "@nattstack/ui"
import { createFileRoute, notFound } from "@tanstack/react-router"
import type { JSX } from "react"
import { AgentAvatar } from "#/components/agent-avatar"
import { getAgentById } from "#/data/agents.ts"

export const Route = createFileRoute("/dashboard/agents/$agentId")({
  component: function AgentDetailPage(): JSX.Element {
    const { agent } = Route.useLoaderData()

    return (
      <Column className="mx-auto w-full max-w-768">
        <Spacer height={32} />

        <Row alignItems="center" className="gap-12">
          <AgentAvatar alt={agent.name} src={agent.logo} />
          <h1 className="text-24 font-500 text-text-primary">{agent.name}</h1>
        </Row>

        <Spacer height={8} />

        <p className="text-14 text-text-secondary">Latest chat from this agent.</p>

        <Spacer height={24} />

        <Column className="rounded-12 border border-border bg-bg-primary p-20">
          <p className="text-12 font-500 text-text-secondary">Chat</p>

          <Spacer height={8} />

          <p className="text-16 font-500 text-text-primary">{agent.chat}</p>
        </Column>

        <Spacer height={16} />

        <div
          className="
            grid grid-cols-2 gap-16
            max-1024:grid-cols-1
          "
        >
          <DetailCard label="Created" value={agent.createdAt} />
          <DetailCard label="Updated" value={agent.updatedAt} />
        </div>
      </Column>
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

// oxlint-disable-next-line react/only-export-components
function DetailCard({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <Column className="rounded-12 border border-border bg-bg-primary p-20">
      <p className="text-12 font-500 text-text-secondary">{label}</p>

      <Spacer height={8} />

      <p className="text-16 font-500 text-text-primary">{value}</p>
    </Column>
  )
}
