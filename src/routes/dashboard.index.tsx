import { createFileRoute, redirect } from "@tanstack/react-router"
import { getFirstAgent } from "#/data/agents"

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    throw redirect({
      params: { agentId: getFirstAgent().id },
      to: "/dashboard/agents/$agentId",
    })
  },
})
