import { listAgentsByWorkspaceId, setAgentTeam, type Agent } from "#/data/agents"
import {
  isCurrentUserWorkspaceAdmin,
  listMembersByWorkspaceId,
  setMemberTeam,
  type Member,
} from "#/data/members"

export interface Team {
  description: string
  id: string
  name: string
  slug: string
  workspaceId: number
}

export interface TeamWithAgents {
  agents: Agent[]
  members: Member[]
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
    description: "File reviews, component audits, and design-system support.",
    id: "7955dd9a-c8f4-4faf-9103-a054ed33789e",
    name: "Design",
    slug: "design",
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
    description: "Specs, cycles, and roadmap planning.",
    id: "a9361bc3-4c13-4ad2-a242-c861b085560d",
    name: "Product",
    slug: "product",
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
    description: "Wiki upkeep, recaps, and day-to-day coordination.",
    id: "cac5d6b9-444d-4f69-973a-04a0fd2781df",
    name: "Operations",
    slug: "operations",
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

export function deleteTeam(input: { teamId: string; workspaceId: number }): void {
  requireWorkspaceAdmin(input.workspaceId)

  const team = requireTeam(input.workspaceId, input.teamId)

  for (const member of listTeamMembers(input.workspaceId, team.id)) {
    setMemberTeam({
      memberId: member.id,
      teamId: undefined,
      workspaceId: input.workspaceId,
    })
  }

  for (const agent of listTeamAgents(input.workspaceId, team.name)) {
    setAgentTeam({
      agentId: agent.id,
      teamName: undefined,
      workspaceId: input.workspaceId,
    })
  }

  const index = MOCK_TEAMS.findIndex((item) => item.id === team.id)

  if (index === -1) {
    throw new Error("Expected a team in this workspace")
  }

  MOCK_TEAMS.splice(index, 1)
}

export function getTeamById(workspaceId: number, teamId: string): Team | undefined {
  return MOCK_TEAMS.find((team) => team.workspaceId === workspaceId && team.id === teamId)
}

export function getTeamBySlug(workspaceId: number, teamSlug: string): Team | undefined {
  return MOCK_TEAMS.find((team) => team.workspaceId === workspaceId && team.slug === teamSlug)
}

export function listAgentsAvailableForTeam(workspaceId: number, teamName: string): Agent[] {
  return listAgentsByWorkspaceId(workspaceId)
    .filter((agent) => agent.team !== teamName)
    .toSorted((left, right) => left.name.localeCompare(right.name))
}

export function listMembersAvailableForTeam(workspaceId: number, teamId: string): Member[] {
  return listMembersByWorkspaceId(workspaceId)
    .filter((member) => member.teamId !== teamId)
    .toSorted((left, right) => left.name.localeCompare(right.name))
}

export function listTeamAgents(workspaceId: number, teamName: string): Agent[] {
  return listAgentsByWorkspaceId(workspaceId).filter((agent) => agent.team === teamName)
}

export function listTeamMembers(workspaceId: number, teamId: string): Member[] {
  return listMembersByWorkspaceId(workspaceId)
    .filter((member) => member.teamId === teamId)
    .toSorted((left, right) => left.name.localeCompare(right.name))
}

export function listTeamsByWorkspaceId(workspaceId: number): Team[] {
  return MOCK_TEAMS.filter((team) => team.workspaceId === workspaceId).toSorted((left, right) =>
    left.name.localeCompare(right.name),
  )
}

export function listTeamsWithAgentsByWorkspaceId(workspaceId: number): TeamWithAgents[] {
  return listTeamsByWorkspaceId(workspaceId).map((team) => ({
    agents: listTeamAgents(workspaceId, team.name),
    members: listTeamMembers(workspaceId, team.id),
    team,
  }))
}

export function updateTeam(input: {
  description?: string
  name?: string
  teamId: string
  workspaceId: number
}): Team {
  requireWorkspaceAdmin(input.workspaceId)

  const team = requireTeam(input.workspaceId, input.teamId)
  const nextDescription =
    input.description === undefined ? team.description : input.description.trim()
  const nextName = input.name === undefined ? team.name : input.name.trim()

  if (nextName.length === 0) {
    throw new Error("Expected a team name")
  }

  const nameTaken = listTeamsByWorkspaceId(input.workspaceId).some(
    (item) => item.id !== team.id && item.name.toLowerCase() === nextName.toLowerCase(),
  )

  if (nameTaken) {
    throw new Error("A team with this name already exists")
  }

  if (nextName !== team.name) {
    for (const agent of listTeamAgents(input.workspaceId, team.name)) {
      setAgentTeam({
        agentId: agent.id,
        teamName: nextName,
        workspaceId: input.workspaceId,
      })
    }

    team.name = nextName
  }

  team.description = nextDescription

  return team
}

function requireTeam(workspaceId: number, teamId: string): Team {
  const team = getTeamById(workspaceId, teamId)

  if (team === undefined) {
    throw new Error("Expected a team in this workspace")
  }

  return team
}

function requireWorkspaceAdmin(workspaceId: number): void {
  if (!isCurrentUserWorkspaceAdmin(workspaceId)) {
    throw new Error("Only workspace admins can edit teams")
  }
}
