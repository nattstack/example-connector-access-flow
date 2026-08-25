export type ChatInline =
  | { href: string; text: string; type: "link" }
  | { text: string; type: "bold" }
  | { text: string; type: "code" }

export type ChatItem =
  | {
      content: ChatText[]
      id: string
      role: "agent" | "user"
      type: "message"
    }
  | {
      description: string
      id: string
      status: "saved"
      title: string
      type: "secret"
    }
  | {
      id: string
      label: string
      selected?: boolean
      type: "choice"
    }
  | {
      id: string
      text: string
      type: "meta"
    }

export type ChatText = ChatInline | string

const GITHUB_REPO_URL = "https://github.com/davidyen1124/third-time-charm"
const GITHUB_PAGES_CAR_PHYSICS_URL = "https://davidyen1124.github.io/car-physics"
const GITHUB_PAGES_LINKEDIN_URL = "https://davidyen1124.github.io/linkedin"
const GITHUB_PAGES_PREFIXED_LINKEDIN_URL =
  "https://davidyen1124.github.io/third-time-charm/linkedin"
const GITHUB_PAGES_SITE_URL = "https://davidyen1124.github.io/third-time-charm/"
const PR_CAR_PHYSICS_URL = `${GITHUB_REPO_URL}/pull/22`
const PR_GALLERY_URL = `${GITHUB_REPO_URL}/pull/24`

const CHAT_DAILY_PRIORITY: ChatItem[] = [
  {
    id: "1-meta-date",
    text: "Tue, Aug 25 12:40 AM",
    type: "meta",
  },
  {
    content: [
      "Hey Natt. Want a tight list for today, or should I pull yesterday's leftovers first?",
    ],
    id: "1-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Leftovers first, then what's actually due today."],
    id: "1-user-leftovers",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Three things carried over: the connector review, the billing copy pass, and the Friday demo notes.",
    ],
    id: "1-agent-carryover",
    role: "agent",
    type: "message",
  },
  {
    content: ["Drop the demo notes. Add the access-flow screens."],
    id: "1-user-reshuffle",
    role: "user",
    type: "message",
  },
  {
    content: ["Done. Today's stack is connector review, billing copy, then access-flow screens."],
    id: "1-agent-stack",
    role: "agent",
    type: "message",
  },
  {
    content: ["What's still on your plate right now?"],
    id: "1-agent-plate",
    role: "agent",
    type: "message",
  },
]

const CHAT_PODCASTS: ChatItem[] = [
  {
    id: "2-meta-date",
    text: "Fri, Aug 21 9:12 AM",
    type: "meta",
  },
  {
    content: ["I can turn Syntax episodes into short cards you can scan later."],
    id: "2-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Do the whole catalog. Newest first. Notes if there's no transcript."],
    id: "2-user-catalog",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Working through ",
      { text: "syntax.fm", type: "code" },
      ". Official transcripts get thin after the early 200s, so those will be notes-only.",
    ],
    id: "2-agent-working",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "That's the whole catalog. syntax-summaries.md is 18,514 lines, newest-first #1031 through #1. Only gap is #625 (404 on syntax.fm). Official transcripts were empty from about #225 back, so those older cards are notes-only.",
    ],
    id: "2-agent-done",
    role: "agent",
    type: "message",
  },
]

const CHAT_EMAIL_RESPONDING: ChatItem[] = [
  {
    id: "3-meta-date",
    text: "Thu, Aug 20 10:05 AM",
    type: "meta",
  },
  {
    content: ["Paste the thread and I'll draft a reply in your voice."],
    id: "3-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Anna asked if we can move the kickoff to Tuesday and whether the connector demo is ready.",
    ],
    id: "3-user-thread",
    role: "user",
    type: "message",
  },
  {
    content: ["Warm, short, and yes to Tuesday. Keep the demo line honest."],
    id: "3-user-tone",
    role: "user",
    type: "message",
  },
  {
    content: ["Hi Anna, Thanks for circling back."],
    id: "3-agent-draft",
    role: "agent",
    type: "message",
  },
]

const CHAT_GITHUB_FIXER: ChatItem[] = [
  {
    id: "meta-date",
    text: "Thu, Aug 20 6:03 PM",
    type: "meta",
  },
  {
    id: "meta-rename",
    text: "Renamed to Github fixer",
    type: "meta",
  },
  {
    content: ["Hey Natt. Good to meet you."],
    id: "agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "What do you want me around for? A specific job, or more of a general extra pair of hands?",
    ],
    id: "agent-purpose",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Got it. GitHub fixer it is. Checking what's already connected so I can start on issues.",
    ],
    id: "agent-got-it",
    role: "agent",
    type: "message",
  },
  {
    content: [
      { href: GITHUB_REPO_URL, text: GITHUB_REPO_URL, type: "link" },
      "\n",
      { href: GITHUB_PAGES_SITE_URL, text: GITHUB_PAGES_SITE_URL, type: "link" },
      " -> ",
      { href: GITHUB_PAGES_CAR_PHYSICS_URL, text: GITHUB_PAGES_CAR_PHYSICS_URL, type: "link" },
      "\ncreate a PR fixing the links",
    ],
    id: "user-first-task",
    role: "user",
    type: "message",
  },
  {
    content: [
      "On it. I'll find every third-time-charm GitHub Pages link, point it at car-physics, and open a PR.",
    ],
    id: "agent-on-it",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Hit a wall launching a cloud agent on that repo (Cursor isn't installed there). Checking the files now so I can still get the PR up.",
    ],
    id: "agent-wall",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "The old ",
      { text: "github.io/third-time-charm", type: "code" },
      " URL is in the README (all 8 demo links), the repo homepage, plus the Vite base and React router basename. I'll point those at ",
      { text: "/car-physics", type: "code" },
      " so the site actually works at the new path.",
    ],
    id: "agent-urls",
    role: "agent",
    type: "message",
  },
  {
    content: ["I need GitHub connected to open the PR. Want me to hook that up?"],
    id: "agent-need-github",
    role: "agent",
    type: "message",
  },
  {
    id: "choice-connect-github",
    label: "Yes, connect GitHub",
    selected: true,
    type: "choice",
  },
  {
    content: [
      "Connecting GitHub now. I need a personal access token with repo access so I can open the PR.",
    ],
    id: "agent-connecting",
    role: "agent",
    type: "message",
  },
  {
    description: "Saved securely and kept private.",
    id: "secret-github-token",
    status: "saved",
    title: "GitHub personal access token",
    type: "secret",
  },
  {
    content: ["Token's in. Connecting GitHub and then opening the PR."],
    id: "agent-token-in",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "GitHub is connected as ",
      { text: "nattstack", type: "bold" },
      ". You don't have push on the original repo, so I'm opening the PR from a fork.",
    ],
    id: "agent-connected-fork",
    role: "agent",
    type: "message",
  },
  {
    content: ["GitHub is set, signed in as ", { text: "nattstack", type: "bold" }, "."],
    id: "agent-signed-in",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "PR is up: ",
      { href: PR_CAR_PHYSICS_URL, text: "Point GitHub Pages links at /car-physics", type: "link" },
      ". It updates the 8 README demo links, plus the Vite base and React router basename so the site actually lives at ",
      { text: "/car-physics", type: "code" },
      ". I left the GitHub asset URLs alone since those still belong to this repo.",
    ],
    id: "agent-pr-up",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Close the PR. Open a new one for\n\nUpdate the links from\n",
      { href: GITHUB_PAGES_LINKEDIN_URL, text: GITHUB_PAGES_LINKEDIN_URL, type: "link" },
      " -> ",
      {
        href: GITHUB_PAGES_PREFIXED_LINKEDIN_URL,
        text: GITHUB_PAGES_PREFIXED_LINKEDIN_URL,
        type: "link",
      },
    ],
    id: "user-close-pr",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Closing that PR, then opening a new one that points ",
      { text: "github.io/linkedin", type: "code" },
      " at the third-time-charm linkedin page.",
    ],
    id: "agent-closing-pr",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Close the PR. Open a new one for\n\nUpdate the links like this one\n",
      { href: GITHUB_PAGES_LINKEDIN_URL, text: GITHUB_PAGES_LINKEDIN_URL, type: "link" },
      " (broken link) -> ",
      {
        href: GITHUB_PAGES_PREFIXED_LINKEDIN_URL,
        text: GITHUB_PAGES_PREFIXED_LINKEDIN_URL,
        type: "link",
      },
    ],
    id: "user-close-pr-again",
    role: "user",
    type: "message",
  },
  {
    content: [
      "PR 23 is already closed. Next I'll find every broken ",
      { text: "github.io/{demo}", type: "code" },
      " link like linkedin and open a new PR that prefixes them with ",
      { text: "/third-time-charm", type: "code" },
      ".",
    ],
    id: "agent-find-broken",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Found it. The gallery clicks ",
      { text: "window.open('/linkedin')", type: "code" },
      ", which lands on ",
      { text: "github.io/linkedin", type: "code" },
      " instead of ",
      { text: "github.io/third-time-charm/linkedin", type: "code" },
      ". Fixing all of those.",
    ],
    id: "agent-found-it",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "PR 23 is closed. New one is up: ",
      {
        href: PR_GALLERY_URL,
        text: "Fix gallery demo links that 404 at the domain root.",
        type: "link",
      },
    ],
    id: "agent-new-pr",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "Carousel clicks were opening ",
      { text: "/linkedin", type: "code" },
      " at the domain root. They now go to ",
      { text: "/third-time-charm/linkedin", type: "code" },
      ", and the other demos get the same prefix.",
    ],
    id: "agent-carousel",
    role: "agent",
    type: "message",
  },
]

const CHAT_DESIGN_PORTFOLIO: ChatItem[] = [
  {
    id: "5-meta-date",
    text: "Thu, Aug 20 1:30 PM",
    type: "meta",
  },
  {
    content: ["Send the case studies and I'll mark what reads well and what feels thin."],
    id: "5-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Start with the access-flow writeup. I want the critique before I rewrite it."],
    id: "5-user-start",
    role: "user",
    type: "message",
  },
  {
    content: [
      "The problem is clear. The before/after is not. I need the raw notes under the shots.",
    ],
    id: "5-agent-critique",
    role: "agent",
    type: "message",
  },
  {
    content: ["Sent 1 text file"],
    id: "5-user-file",
    role: "user",
    type: "message",
  },
]

const CHAT_VIRTUAL_ASSISTANT: ChatItem[] = [
  {
    id: "6-meta-date",
    text: "Thu, Aug 20 9:18 AM",
    type: "meta",
  },
  {
    content: ["I'm up. Want a reminder, a draft, or just a ping to check the banner?"],
    id: "6-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Ping the banner. I need to see the second state."],
    id: "6-user-banner",
    role: "user",
    type: "message",
  },
  {
    content: ["Test ping 1. This is the quiet state."],
    id: "6-agent-ping-1",
    role: "agent",
    type: "message",
  },
  {
    content: ["Test ping 2. This is the banner."],
    id: "6-agent-ping-2",
    role: "agent",
    type: "message",
  },
]

const CHAT_UI_BOT: ChatItem[] = [
  {
    id: "7-meta-date",
    text: "Thu, Aug 20 8:45 AM",
    type: "meta",
  },
  {
    content: ["I can take the hero from copy to layout. What are we shipping?"],
    id: "7-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Connector landing. One line, one visual, no feature grid yet."],
    id: "7-user-brief",
    role: "user",
    type: "message",
  },
  {
    content: [
      "I'll keep the logomark left, headline in ",
      { text: "text-32", type: "code" },
      ", and a single primary action.",
    ],
    id: "7-agent-plan",
    role: "agent",
    type: "message",
  },
  {
    content: ["Here's the hero as it stands."],
    id: "7-agent-hero",
    role: "agent",
    type: "message",
  },
]

const CHAT_PRODUCT_RESEARCH: ChatItem[] = [
  {
    id: "8-meta-date",
    text: "Thu, Aug 20 8:02 AM",
    type: "meta",
  },
  {
    content: ["Drop the announcement and I'll pull the product claims from the noise."],
    id: "8-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["They just shipped agent memory and usage-based seats. Ignore the pricing theater."],
    id: "8-user-announce",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Memory is the real shift. Seats are just how they meter it. I'll lock the two claims that change our roadmap.",
    ],
    id: "8-agent-read",
    role: "agent",
    type: "message",
  },
  {
    content: ["Two things to lock from their announcement."],
    id: "8-agent-lock",
    role: "agent",
    type: "message",
  },
]

const CHAT_COMPETITOR_ANALYSIS: ChatItem[] = [
  {
    id: "9-meta-date",
    text: "Thu, Aug 20 7:50 AM",
    type: "meta",
  },
  {
    content: ["I can compare them on setup time, connector coverage, and who they sell to."],
    id: "9-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Do those three. Put it in a markdown table I can paste into the brief."],
    id: "9-user-table",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Need their public pricing page and the two launch posts. I'll keep our names out of the file.",
    ],
    id: "9-agent-need",
    role: "agent",
    type: "message",
  },
  {
    content: ["Sent 1 Markdown file"],
    id: "9-user-file",
    role: "user",
    type: "message",
  },
]

const CHAT_GTM: ChatItem[] = [
  {
    id: "10-meta-date",
    text: "Thu, Aug 20 7:12 AM",
    type: "meta",
  },
  {
    content: ["I can turn the launch into a 90-day plan. Product, story, or GTM first?"],
    id: "10-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["All three. I need one calendar, not three docs."],
    id: "10-user-all",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Weeks 1-4 are product-ready. Weeks 5-8 are the story. Weeks 9-12 are outbound and the first case study.",
    ],
    id: "10-agent-phases",
    role: "agent",
    type: "message",
  },
  {
    content: ["90 days across product, story, and GTM."],
    id: "10-agent-summary",
    role: "agent",
    type: "message",
  },
]

const CHAT_EMAIL_SUMMARY: ChatItem[] = [
  {
    id: "11-meta-date",
    text: "Tue, Aug 25 1:02 AM",
    type: "meta",
  },
  {
    content: [
      "I can collapse the inbox into what needs a reply, what's FYI, and what you can ignore.",
    ],
    id: "11-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Last 24 hours. Operations only."],
    id: "11-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: ["47 unread. 6 need a reply, 4 are FYI, the rest is noise or already handled."],
    id: "11-agent-count",
    role: "agent",
    type: "message",
  },
  {
    id: "11-choice-replies",
    label: "Show the 6 that need a reply",
    selected: true,
    type: "choice",
  },
  {
    content: ["3 need a reply today. The other 3 can wait until Thursday."],
    id: "11-agent-today",
    role: "agent",
    type: "message",
  },
]

const MOCK_AGENT_CHATS: Record<string, ChatItem[]> = {
  "1fff8a3f-f8a2-4033-a086-9cc2cbf8b9fc": CHAT_DAILY_PRIORITY,
  "9984c2b6-7b18-4e36-97d3-a3b2fb900231": CHAT_COMPETITOR_ANALYSIS,
  "a2926ff5-1b8e-40d9-aea1-16a7135b63e5": CHAT_GTM,
  "b10245e6-c29f-4d0c-b0e9-0f535001711c": CHAT_GITHUB_FIXER,
  "b959bc08-651f-4b1a-bfc9-3b3312d8c817": CHAT_DESIGN_PORTFOLIO,
  "ba13dfae-b828-488b-ba82-882df3c89c50": CHAT_PODCASTS,
  "bc3d75f4-bfdf-447f-9c1d-e27fd9b1e1d5": CHAT_VIRTUAL_ASSISTANT,
  "c973a755-0476-4b8a-ba8d-8cbfb30ed609": CHAT_UI_BOT,
  "d28c5b88-901f-4df0-b5b1-c6b9cab1b420": CHAT_EMAIL_SUMMARY,
  "d7fe3ac1-f0b2-4d47-b861-a97a592a08e5": CHAT_PRODUCT_RESEARCH,
  "fdf33ec7-4f10-4865-8b53-f8f55115f65c": CHAT_EMAIL_RESPONDING,
}

export function getAgentChatById(agentId: string): ChatItem[] {
  const chat = MOCK_AGENT_CHATS[agentId]

  if (chat === undefined) {
    throw new Error(`Expected mock chat for agent ${agentId}`)
  }

  return chat
}
