import { getAgentById } from "#/data/agents"
import { getWorkspaceBySlug } from "#/data/workspaces"

interface RouteAgentHead {
  meta?: { title: string }[]
}

export function RouteAgentHead(context: {
  params: { agentId: string; workspaceSlug: string }
}): RouteAgentHead {
  const workspace = getWorkspaceBySlug(context.params.workspaceSlug)

  if (workspace === undefined) {
    return {}
  }

  const agent = getAgentById(workspace.id, context.params.agentId)

  return {
    meta: [
      {
        title: agent === undefined ? workspace.name : `${agent.name} · ${workspace.name}`,
      },
    ],
  }
}
