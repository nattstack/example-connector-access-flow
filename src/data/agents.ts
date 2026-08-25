export interface Agent {
  avatar: string
  chat: string
  createdAt: string
  id: string
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
    id: "d28c5b88-901f-4df0-b5b1-c6b9cab1b420",
    name: "Email summary",
    team: "Operations",
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
    avatar: "/avatars/headphones.webp",
    chat: "That’s the whole catalog. syntax-summaries.md is 18,514 lines, newest-first #1031 through #1. Only gap is #625 (404 on syntax.fm). Official transcripts were empty from about #225 back, so those older cards are notes-only.",
    createdAt: "2026-08-21T09:12:00",
    id: "ba13dfae-b828-488b-ba82-882df3c89c50",
    name: "Summarize podcasts",
    updatedAt: "2026-08-21T16:48:00",
    workspaceId: 2,
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
    avatar: "/avatars/raccoon.webp",
    chat: "Carousel clicks were opening /dashboard instead of the project page.",
    createdAt: "2026-08-20T11:14:00",
    id: "b10245e6-c29f-4d0c-b0e9-0f535001711c",
    name: "Github fixer",
    team: "Engineering",
    updatedAt: "2026-08-20T17:05:00",
    workspaceId: 2,
  },
  {
    avatar: "/avatars/paintbrush.webp",
    chat: "Sent 1 text file",
    createdAt: "2026-08-20T13:30:00",
    id: "b959bc08-651f-4b1a-bfc9-3b3312d8c817",
    name: "Design portfolio analysis",
    updatedAt: "2026-08-20T15:41:00",
    workspaceId: 3,
  },
  {
    avatar: "/avatars/cat.webp",
    chat: "Test ping 2. This is the banner.",
    createdAt: "2026-08-20T09:18:00",
    id: "bc3d75f4-bfdf-447f-9c1d-e27fd9b1e1d5",
    name: "Virtual assistant bot",
    updatedAt: "2026-08-20T14:09:00",
    workspaceId: 3,
  },
  {
    avatar: "/avatars/robot.webp",
    chat: "Here's the hero as it stands.",
    createdAt: "2026-08-20T08:45:00",
    id: "c973a755-0476-4b8a-ba8d-8cbfb30ed609",
    name: "UI bot",
    team: "Design",
    updatedAt: "2026-08-20T12:33:00",
    workspaceId: 3,
  },
  {
    avatar: "/avatars/owl.webp",
    chat: "Two things to lock from their announcement.",
    createdAt: "2026-08-20T08:02:00",
    id: "d7fe3ac1-f0b2-4d47-b861-a97a592a08e5",
    name: "Product research",
    team: "Product",
    updatedAt: "2026-08-20T11:27:00",
    workspaceId: 4,
  },
  {
    avatar: "/avatars/magnifying-glass.webp",
    chat: "Sent 1 Markdown file",
    createdAt: "2026-08-20T07:50:00",
    id: "9984c2b6-7b18-4e36-97d3-a3b2fb900231",
    name: "Competitor analysis",
    team: "Product",
    updatedAt: "2026-08-20T10:16:00",
    workspaceId: 4,
  },
  {
    avatar: "/avatars/rocket.webp",
    chat: "90 days across product, story, and GTM.",
    createdAt: "2026-08-20T07:12:00",
    id: "a2926ff5-1b8e-40d9-aea1-16a7135b63e5",
    name: "GTM bot",
    team: "Marketing",
    updatedAt: "2026-08-20T09:44:00",
    workspaceId: 4,
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
