import { createFileRoute, redirect } from "@tanstack/react-router"
import { getFirstAgent } from "#/data/agents"

export const Route = createFileRoute("/$workspaceSlug/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      params: {
        agentId: String(getFirstAgent().id),
        workspaceSlug: params.workspaceSlug,
      },
      to: "/$workspaceSlug/agents/$agentId",
    })
  },
})
