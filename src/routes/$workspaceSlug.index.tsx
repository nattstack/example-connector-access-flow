import { Column } from "@nattstack/ui"
import { createFileRoute, redirect } from "@tanstack/react-router"
import type { JSX } from "react"
import { getFirstAgent } from "#/data/agents"

export const Route = createFileRoute("/$workspaceSlug/")({
  beforeLoad: ({ context, params }) => {
    const agent = getFirstAgent(context.workspace.id)

    if (agent === undefined) {
      return
    }

    throw redirect({
      params: {
        agentId: String(agent.id),
        workspaceSlug: params.workspaceSlug,
      },
      to: "/$workspaceSlug/agents/$agentId",
    })
  },
  component: function WorkspaceEmptyPage(): JSX.Element {
    return (
      <Column className="flex-1 items-center justify-center px-24">
        <p className="text-14 text-text-secondary">No agents in this workspace yet.</p>
      </Column>
    )
  },
})
