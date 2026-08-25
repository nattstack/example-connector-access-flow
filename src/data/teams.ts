import { listAgentsByWorkspaceId, type Agent } from "#/data/agents"

export interface Team {
  description: string
  id: string
  name: string
  slug: string
  workspaceId: number
}

export interface TeamWithAgents {
  agents: Agent[]
  team: Team
}

const MOCK_TEAMS: Team[] = [
  {
    description: "Inbox triage, follow-ups, and day-to-day coordination.",
    id: "a3f1c8e2-4b7d-4e91-9c2a-1f6b8d0e3a11",
    name: "Operations",
    slug: "operations",
    workspaceId: 1,
  },
  {
    description: "Code changes, reviews, and repository maintenance.",
    id: "b4e2d9f3-5c8e-4f02-ad3b-2e7c9e1f4b22",
    name: "Engineering",
    slug: "engineering",
    workspaceId: 2,
  },
  {
    description: "Visual work, UI reviews, and design support.",
    id: "c5f3e0a4-6d9f-4013-be4c-3f8d0f2a5c33",
    name: "Design",
    slug: "design",
    workspaceId: 3,
  },
  {
    description: "Research, competitive analysis, and product planning.",
    id: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    name: "Product",
    slug: "product",
    workspaceId: 4,
  },
  {
    description: "Go-to-market planning and campaign support.",
    id: "e7b5a2c6-8f1b-4235-da6e-5b0f2b4c7e55",
    name: "Marketing",
    slug: "marketing",
    workspaceId: 4,
  },
]

export function getTeamBySlug(workspaceId: number, teamSlug: string): Team | undefined {
  return MOCK_TEAMS.find((team) => team.workspaceId === workspaceId && team.slug === teamSlug)
}

export function listTeamAgents(workspaceId: number, teamName: string): Agent[] {
  return listAgentsByWorkspaceId(workspaceId).filter((agent) => agent.team === teamName)
}

export function listTeamsByWorkspaceId(workspaceId: number): Team[] {
  return MOCK_TEAMS.filter((team) => team.workspaceId === workspaceId).toSorted((left, right) =>
    left.name.localeCompare(right.name),
  )
}

export function listTeamsWithAgentsByWorkspaceId(workspaceId: number): TeamWithAgents[] {
  return listTeamsByWorkspaceId(workspaceId).map((team) => ({
    agents: listTeamAgents(workspaceId, team.name),
    team,
  }))
}
