import { isCurrentUserWorkspaceAdmin } from "#/data/members"

export interface Agent {
  avatar: string
  chat: string
  createdAt: string
  draft?: string
  id: string
  name: string
  team?: string
  updatedAt: string
  workspaceId: number
}

export const MOCK_AGENTS: Agent[] = [
  {
    avatar: "/avatars/cloud.webp",
    chat: "What do you actually want me around for? The more specific, the better I can get useful fast.",
    createdAt: "2026-08-25T01:02:00",
    draft: "Review all emails received in my connected inbox during the past 24 hours",
    id: "d28c5b88-901f-4df0-b5b1-c6b9cab1b420",
    name: "Email summary",
    updatedAt: "2026-08-25T01:10:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/bear.webp",
    chat: "What's still on your plate right now?",
    createdAt: "2026-08-25T00:40:00",
    id: "1fff8a3f-f8a2-4033-a086-9cc2cbf8b9fc",
    name: "Daily priority bot",
    updatedAt: "2026-08-25T00:57:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/mailbox.webp",
    chat: "Hi Anna, Thanks for circling back.",
    createdAt: "2026-08-20T10:05:00",
    id: "fdf33ec7-4f10-4865-8b53-f8f55115f65c",
    name: "Email responding",
    team: "Operations",
    updatedAt: "2026-08-20T18:22:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/owl.webp",
    chat: "Three action items from the standup.",
    createdAt: "2026-08-24T16:12:00",
    id: "c23b6993-2165-4042-89cd-107b05b24ec0",
    name: "Meeting notes",
    team: "Operations",
    updatedAt: "2026-08-24T16:40:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/paintbrush.webp",
    chat: "12 components drifted from the library.",
    createdAt: "2026-08-24T14:08:00",
    id: "a4150364-fb95-412d-9119-3abecc35cba4",
    name: "Component auditor",
    team: "Design",
    updatedAt: "2026-08-24T15:21:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/magnifying-glass.webp",
    chat: "4 text pairs fail AA on the settings page.",
    createdAt: "2026-08-23T11:30:00",
    id: "dd0c0eb6-9e59-4d73-949a-33dbc96717d9",
    name: "Color contrast check",
    team: "Design",
    updatedAt: "2026-08-23T12:04:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/robot.webp",
    chat: "Board recap is ready for the weekly share.",
    createdAt: "2026-08-22T09:18:00",
    id: "7b8a6fbf-74e6-41fe-89ab-309459e1eef0",
    name: "Figjam summarizer",
    updatedAt: "2026-08-22T10:55:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/cloud.webp",
    chat: "I can live in the company inboxes. What do you want me watching?",
    createdAt: "2026-08-25T01:18:00",
    draft:
      "Review all emails received in Company support during the past 24 hours and delete the ones I can ignore",
    id: "c8e4a1b0-3d72-4f19-8a56-2b9c0e7d4f31",
    name: "Email summary",
    updatedAt: "2026-08-25T01:24:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/mailbox.webp",
    chat: "This thread is 18 messages. Here's the ask.",
    createdAt: "2026-08-20T08:02:00",
    id: "d7fe3ac1-f0b2-4d47-b861-a97a592a08e5",
    name: "Thread summarizer",
    team: "Product",
    updatedAt: "2026-08-20T11:27:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/magnifying-glass.webp",
    chat: "Sent 1 Markdown file",
    createdAt: "2026-08-20T07:50:00",
    id: "9984c2b6-7b18-4e36-97d3-a3b2fb900231",
    name: "Competitor analysis",
    team: "Product",
    updatedAt: "2026-08-20T10:16:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/rocket.webp",
    chat: "90 days across product, story, and GTM.",
    createdAt: "2026-08-20T07:12:00",
    id: "a2926ff5-1b8e-40d9-aea1-16a7135b63e5",
    name: "GTM bot",
    team: "Marketing",
    updatedAt: "2026-08-20T09:44:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/cloud.webp",
    chat: "Drafted notes for the 1.4 release.",
    createdAt: "2026-08-24T19:30:00",
    id: "5bfa94d1-c242-423f-ad02-a4b7a6e2bef3",
    name: "Changelog writer",
    team: "Product",
    updatedAt: "2026-08-24T20:05:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/raccoon.webp",
    chat: "Pro is underpriced vs the usage spike.",
    createdAt: "2026-08-23T16:40:00",
    id: "d58af729-505e-4621-8499-672861ddcafe",
    name: "Pricing analyst",
    updatedAt: "2026-08-23T17:18:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/headphones.webp",
    chat: "Email + social assets are in the brief.",
    createdAt: "2026-08-22T12:00:00",
    id: "6701dccd-47ab-4653-8a58-6d1131539c11",
    name: "Campaign planner",
    team: "Marketing",
    updatedAt: "2026-08-22T12:36:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/mailbox.webp",
    chat: "Docs, tweet, and status page still open.",
    createdAt: "2026-08-21T08:25:00",
    id: "2cdd26bc-2cfb-4609-b93f-259ea7f8cbf3",
    name: "Launch checklist",
    updatedAt: "2026-08-21T09:03:00",
    workspaceId: 2,
  },
]

export function getAgentById(workspaceId: number, agentId: string): Agent | undefined {
  return MOCK_AGENTS.find((agent) => agent.id === agentId && agent.workspaceId === workspaceId)
}

export function getFirstAgent(workspaceId: number): Agent | undefined {
  return listAgentsByWorkspaceId(workspaceId)[0]
}

export function listAgentsByWorkspaceId(workspaceId: number): Agent[] {
  return MOCK_AGENTS.filter((agent) => agent.workspaceId === workspaceId)
}

export function setAgentTeam(input: {
  agentId: string
  teamName: string | undefined
  workspaceId: number
}): Agent {
  if (!isCurrentUserWorkspaceAdmin(input.workspaceId)) {
    throw new Error("Only workspace admins can edit teams")
  }

  const agent = getAgentById(input.workspaceId, input.agentId)

  if (agent === undefined) {
    throw new Error("Expected an agent in this workspace")
  }

  if (input.teamName === undefined) {
    delete agent.team
    return agent
  }

  agent.team = input.teamName

  return agent
}
