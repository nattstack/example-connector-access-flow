export interface Agent {
  avatar: string
  chat: string
  createdAt: string
  id: number
  name: string
  team?: string
  updatedAt: string
  workspaceId: number
}

export const MOCK_AGENTS: Agent[] = [
  {
    avatar: "/avatars/cloud.webp",
    chat: "3 need a reply today. The other 3 can wait until Thursday.",
    createdAt: "2026-08-25T01:02:00",
    id: 11,
    name: "Email summary",
    team: "Operations",
    updatedAt: "2026-08-25T01:10:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/bear.webp",
    chat: "What's still on your plate right now?",
    createdAt: "2026-08-25T00:40:00",
    id: 1,
    name: "Daily priority bot",
    updatedAt: "2026-08-25T00:57:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/headphones.webp",
    chat: "That’s the whole catalog. syntax-summaries.md is 18,514 lines, newest-first #1031 through #1. Only gap is #625 (404 on syntax.fm). Official transcripts were empty from about #225 back, so those older cards are notes-only.",
    createdAt: "2026-08-21T09:12:00",
    id: 2,
    name: "Summarize podcasts",
    updatedAt: "2026-08-21T16:48:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/mailbox.webp",
    chat: "Hi Anna, Thanks for circling back.",
    createdAt: "2026-08-20T10:05:00",
    id: 3,
    name: "Email responding",
    team: "Operations",
    updatedAt: "2026-08-20T18:22:00",
    workspaceId: 1,
  },
  {
    avatar: "/avatars/raccoon.webp",
    chat: "Carousel clicks were opening /dashboard instead of the project page.",
    createdAt: "2026-08-20T11:14:00",
    id: 4,
    name: "Github fixer",
    team: "Engineering",
    updatedAt: "2026-08-20T17:05:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/paintbrush.webp",
    chat: "Sent 1 text file",
    createdAt: "2026-08-20T13:30:00",
    id: 5,
    name: "Design portfolio analysis",
    updatedAt: "2026-08-20T15:41:00",
    workspaceId: 3,
  },
  {
    avatar: "/avatars/cat.webp",
    chat: "Test ping 2. This is the banner.",
    createdAt: "2026-08-20T09:18:00",
    id: 6,
    name: "Virtual assistant bot",
    updatedAt: "2026-08-20T14:09:00",
    workspaceId: 3,
  },
  {
    avatar: "/avatars/robot.webp",
    chat: "Here's the hero as it stands.",
    createdAt: "2026-08-20T08:45:00",
    id: 7,
    name: "UI bot",
    team: "Design",
    updatedAt: "2026-08-20T12:33:00",
    workspaceId: 3,
  },
  {
    avatar: "/avatars/owl.webp",
    chat: "Two things to lock from their announcement.",
    createdAt: "2026-08-20T08:02:00",
    id: 8,
    name: "Product research",
    team: "Product",
    updatedAt: "2026-08-20T11:27:00",
    workspaceId: 4,
  },
  {
    avatar: "/avatars/magnifying-glass.webp",
    chat: "Sent 1 Markdown file",
    createdAt: "2026-08-20T07:50:00",
    id: 9,
    name: "Competitor analysis",
    team: "Product",
    updatedAt: "2026-08-20T10:16:00",
    workspaceId: 4,
  },
  {
    avatar: "/avatars/rocket.webp",
    chat: "90 days across product, story, and GTM.",
    createdAt: "2026-08-20T07:12:00",
    id: 10,
    name: "GTM bot",
    team: "Marketing",
    updatedAt: "2026-08-20T09:44:00",
    workspaceId: 4,
  },
]

export function getAgentById(workspaceId: number, agentId: number): Agent | undefined {
  return MOCK_AGENTS.find((agent) => agent.id === agentId && agent.workspaceId === workspaceId)
}

export function getFirstAgent(workspaceId: number): Agent | undefined {
  return listAgentsByWorkspaceId(workspaceId)[0]
}

export function listAgentsByWorkspaceId(workspaceId: number): Agent[] {
  return MOCK_AGENTS.filter((agent) => agent.workspaceId === workspaceId)
}
