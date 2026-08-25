export interface Agent {
  chat: string
  createdAt: string
  id: string
  name: string
  updatedAt: string
}

export const MOCK_AGENTS: Agent[] = [
  {
    chat: "That’s the whole catalog. syntax-summaries.md is 18,514 lines, newest-first #1031 through #1. Only gap is #625 (404 on syntax.fm). Official transcripts were empty from about #225 back, so those older cards are notes-only.",
    createdAt: "2026-08-25T01:02:00",
    id: "11",
    name: "Email summary",
    updatedAt: "2026-08-25T01:10:00",
  },
  {
    chat: "What's still on your plate right now?",
    createdAt: "2026-08-25T00:40:00",
    id: "1",
    name: "Daily priority bot",
    updatedAt: "2026-08-25T00:57:00",
  },
  {
    chat: "That’s the whole catalog. syntax-summaries.md is 18,514 lines, newest-first #1031 through #1. Only gap is #625 (404 on syntax.fm). Official transcripts were empty from about #225 back, so those older cards are notes-only.",
    createdAt: "2026-08-21T09:12:00",
    id: "2",
    name: "Summarize podcasts",
    updatedAt: "2026-08-21T16:48:00",
  },
  {
    chat: "Hi Anna, Thanks for circling back.",
    createdAt: "2026-08-20T10:05:00",
    id: "3",
    name: "Email responding",
    updatedAt: "2026-08-20T18:22:00",
  },
  {
    chat: "Carousel clicks were opening /dashboard instead of the project page.",
    createdAt: "2026-08-20T11:14:00",
    id: "4",
    name: "Github fixer",
    updatedAt: "2026-08-20T17:05:00",
  },
  {
    chat: "Sent 1 text file",
    createdAt: "2026-08-20T13:30:00",
    id: "5",
    name: "Design portfolio analysis",
    updatedAt: "2026-08-20T15:41:00",
  },
  {
    chat: "Test ping 2. This is the banner.",
    createdAt: "2026-08-20T09:18:00",
    id: "6",
    name: "Virtual assistant bot",
    updatedAt: "2026-08-20T14:09:00",
  },
  {
    chat: "Here's the hero as it stands.",
    createdAt: "2026-08-20T08:45:00",
    id: "7",
    name: "UI bot",
    updatedAt: "2026-08-20T12:33:00",
  },
  {
    chat: "Two things to lock from their announcement.",
    createdAt: "2026-08-20T08:02:00",
    id: "8",
    name: "Product research",
    updatedAt: "2026-08-20T11:27:00",
  },
  {
    chat: "Sent 1 Markdown file",
    createdAt: "2026-08-20T07:50:00",
    id: "9",
    name: "Competitor analysis",
    updatedAt: "2026-08-20T10:16:00",
  },
  {
    chat: "90 days across product, story, and GTM.",
    createdAt: "2026-08-20T07:12:00",
    id: "10",
    name: "GTM bot",
    updatedAt: "2026-08-20T09:44:00",
  },
]

export function getAgentById(agentId: string): Agent | undefined {
  return MOCK_AGENTS.find((agent) => agent.id === agentId)
}

export function getFirstAgent(): Agent {
  const [agent] = MOCK_AGENTS

  if (agent === undefined) {
    throw new Error("Expected at least one mock agent")
  }

  return agent
}
