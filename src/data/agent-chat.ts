import type { ConnectorAppId } from "#/data/connector-apps"

export type ChatInline =
  | { href: string; text: string; type: "link" }
  | { text: string; type: "bold" }
  | { text: string; type: "code" }

export type ChatItem =
  | {
      action?: "authorize" | "request"
      actionLabel: string
      appId: ConnectorAppId
      description: string
      dialogDescription?: string
      id: string
      status?: "added" | "requested"
      title: string
      toolCount?: number
      type: "connect"
    }
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
    content: ["Hey Sam. Good to meet you."],
    id: "11-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: [
      "What do you actually want me around for? The more specific, the better I can get useful fast.",
    ],
    id: "11-agent-purpose",
    role: "agent",
    type: "message",
  },
]

const CHAT_MEETING_NOTES: ChatItem[] = [
  {
    id: "12-meta-date",
    text: "Mon, Aug 24 4:12 PM",
    type: "meta",
  },
  {
    content: ["Drop the standup transcript and I'll pull the asks that actually landed."],
    id: "12-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Ops standup. Skip the status theater. I only want owners and dates."],
    id: "12-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Three landed: ship the access-flow screens by Wednesday, finish the billing copy pass, and book the connector review.",
    ],
    id: "12-agent-landed",
    role: "agent",
    type: "message",
  },
  {
    content: ["Three action items from the standup."],
    id: "12-agent-summary",
    role: "agent",
    type: "message",
  },
]

const CHAT_COMPONENT_AUDITOR: ChatItem[] = [
  {
    id: "13-meta-date",
    text: "Mon, Aug 24 2:08 PM",
    type: "meta",
  },
  {
    content: ["Point me at the file and I'll mark every component that drifted from the library."],
    id: "13-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Settings and the workspace switcher. Tokens only, ignore one-off marketing pages."],
    id: "13-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Most of it is still on ",
      { text: "Button", type: "code" },
      " and ",
      { text: "Input", type: "code" },
      ". The rest is radius and spacing that never got remapped.",
    ],
    id: "13-agent-findings",
    role: "agent",
    type: "message",
  },
  {
    content: ["12 components drifted from the library."],
    id: "13-agent-count",
    role: "agent",
    type: "message",
  },
]

const CHAT_COLOR_CONTRAST: ChatItem[] = [
  {
    id: "14-meta-date",
    text: "Sun, Aug 23 11:30 AM",
    type: "meta",
  },
  {
    content: ["I can scan a page for text pairs that miss AA. Where should I start?"],
    id: "14-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Settings. Light theme first. Secondary text on the gray panels."],
    id: "14-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "The helper copy on ",
      { text: "text-secondary", type: "code" },
      " over ",
      { text: "bg-gray-4", type: "code" },
      " is the usual miss. Captions under inputs fail too.",
    ],
    id: "14-agent-pairs",
    role: "agent",
    type: "message",
  },
  {
    content: ["4 text pairs fail AA on the settings page."],
    id: "14-agent-fail",
    role: "agent",
    type: "message",
  },
]

const CHAT_FIGJAM_SUMMARIZER: ChatItem[] = [
  {
    id: "15-meta-date",
    text: "Sat, Aug 22 9:18 AM",
    type: "meta",
  },
  {
    content: ["Send the FigJam and I'll turn the sticky clusters into a recap people can share."],
    id: "15-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Weekly product board. Decisions and leftovers only. No quote dump."],
    id: "15-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Locked: ship access-flow this week, hold pricing until we have usage. Leftover: the empty-state copy still has no owner.",
    ],
    id: "15-agent-locked",
    role: "agent",
    type: "message",
  },
  {
    content: ["Board recap is ready for the weekly share."],
    id: "15-agent-ready",
    role: "agent",
    type: "message",
  },
]

const CHAT_EMAIL_SUMMARY_VERCEL: ChatItem[] = [
  {
    id: "21-meta-date",
    text: "Tue, Aug 25 1:18 AM",
    type: "meta",
  },
  {
    content: ["Hey Sam. Good to meet you."],
    id: "21-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["I can live in the company inboxes. What do you want me watching?"],
    id: "21-agent-purpose",
    role: "agent",
    type: "message",
  },
]

const CHAT_THREAD_SUMMARIZER: ChatItem[] = [
  {
    id: "27-meta-date",
    text: "Thu, Aug 20 8:02 AM",
    type: "meta",
  },
  {
    content: ["Drop the thread and I'll pull the ask out of the back-and-forth."],
    id: "27-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Launch channel. I need the decision, not the 18 messages."],
    id: "27-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "They want the status page live before the tweet, and docs can ship an hour later. That's the whole ask.",
    ],
    id: "27-agent-ask",
    role: "agent",
    type: "message",
  },
  {
    content: ["This thread is 18 messages. Here's the ask."],
    id: "27-agent-summary",
    role: "agent",
    type: "message",
  },
]

const CHAT_CHANGELOG: ChatItem[] = [
  {
    id: "28-meta-date",
    text: "Mon, Aug 24 7:30 PM",
    type: "meta",
  },
  {
    content: ["I can turn the 1.4 commits into notes people will actually read."],
    id: "28-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Customer-facing only. Skip internal refactors. Ship-ready, not witty."],
    id: "28-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Three items: usage export, the quieter retry banner, and the workspace switcher fix.",
    ],
    id: "28-agent-items",
    role: "agent",
    type: "message",
  },
  {
    content: ["Drafted notes for the 1.4 release."],
    id: "28-agent-done",
    role: "agent",
    type: "message",
  },
]

const CHAT_PRICING: ChatItem[] = [
  {
    id: "29-meta-date",
    text: "Sun, Aug 23 4:40 PM",
    type: "meta",
  },
  {
    content: [
      "I can tell you if the plan still matches usage, or if you're leaving money on the table.",
    ],
    id: "29-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Pro versus the last 30 days. Ignore enterprise. I want the spike, not a deck."],
    id: "29-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Usage jumped after the connector launch. Pro's cap is where people bounce, not the seat count.",
    ],
    id: "29-agent-read",
    role: "agent",
    type: "message",
  },
  {
    content: ["Pro is underpriced vs the usage spike."],
    id: "29-agent-verdict",
    role: "agent",
    type: "message",
  },
]

const CHAT_CAMPAIGN: ChatItem[] = [
  {
    id: "30-meta-date",
    text: "Sat, Aug 22 12:00 PM",
    type: "meta",
  },
  {
    content: ["I can turn the launch into a brief: email, social, and what we still need."],
    id: "30-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["1.4. One brief. I don't want a folder of half-started docs."],
    id: "30-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Email owns the changelog. Social gets the usage export clip. Design still owes the 1200 crop.",
    ],
    id: "30-agent-split",
    role: "agent",
    type: "message",
  },
  {
    content: ["Email + social assets are in the brief."],
    id: "30-agent-done",
    role: "agent",
    type: "message",
  },
]

const CHAT_LAUNCH_CHECKLIST: ChatItem[] = [
  {
    id: "31-meta-date",
    text: "Fri, Aug 21 8:25 AM",
    type: "meta",
  },
  {
    content: ["I can walk the launch list and tell you what's still blocking the tweet."],
    id: "31-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["1.4. What's actually open? Don't restate the done column."],
    id: "31-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Docs, the tweet, and the status page. Everything else is already in prod or scheduled.",
    ],
    id: "31-agent-open",
    role: "agent",
    type: "message",
  },
  {
    content: ["Docs, tweet, and status page still open."],
    id: "31-agent-summary",
    role: "agent",
    type: "message",
  },
]

const MOCK_AGENT_CHATS: Record<string, ChatItem[]> = {
  "1fff8a3f-f8a2-4033-a086-9cc2cbf8b9fc": CHAT_DAILY_PRIORITY,
  "2cdd26bc-2cfb-4609-b93f-259ea7f8cbf3": CHAT_LAUNCH_CHECKLIST,
  "5bfa94d1-c242-423f-ad02-a4b7a6e2bef3": CHAT_CHANGELOG,
  "6701dccd-47ab-4653-8a58-6d1131539c11": CHAT_CAMPAIGN,
  "7b8a6fbf-74e6-41fe-89ab-309459e1eef0": CHAT_FIGJAM_SUMMARIZER,
  "9984c2b6-7b18-4e36-97d3-a3b2fb900231": CHAT_COMPETITOR_ANALYSIS,
  "a2926ff5-1b8e-40d9-aea1-16a7135b63e5": CHAT_GTM,
  "a4150364-fb95-412d-9119-3abecc35cba4": CHAT_COMPONENT_AUDITOR,
  "c23b6993-2165-4042-89cd-107b05b24ec0": CHAT_MEETING_NOTES,
  "c8e4a1b0-3d72-4f19-8a56-2b9c0e7d4f31": CHAT_EMAIL_SUMMARY_VERCEL,
  "d28c5b88-901f-4df0-b5b1-c6b9cab1b420": CHAT_EMAIL_SUMMARY,
  "d58af729-505e-4621-8499-672861ddcafe": CHAT_PRICING,
  "d7fe3ac1-f0b2-4d47-b861-a97a592a08e5": CHAT_THREAD_SUMMARIZER,
  "dd0c0eb6-9e59-4d73-949a-33dbc96717d9": CHAT_COLOR_CONTRAST,
  "fdf33ec7-4f10-4865-8b53-f8f55115f65c": CHAT_EMAIL_RESPONDING,
}

const CHAT_PLACEHOLDER: ChatItem[] = [
  {
    id: "placeholder-meta",
    text: "Tue, Aug 25 12:40 AM",
    type: "meta",
  },
  {
    content: ["Hey. What should we work on?"],
    id: "placeholder-hello",
    role: "agent",
    type: "message",
  },
]

export function getAgentAuthorizeReply(agentId: string): ChatItem[] {
  if (agentId !== "d28c5b88-901f-4df0-b5b1-c6b9cab1b420") {
    return []
  }

  return [
    {
      content: ["Gmail's connected. Pulling everything from the last 24 hours."],
      id: "11-agent-gmail-connected",
      role: "agent",
      type: "message",
    },
    {
      content: ["13 threads since yesterday morning. Two are on a clock."],
      id: "11-agent-thread-count",
      role: "agent",
      type: "message",
    },
    {
      content: [
        "On a clock: Maya asked you to ",
        { href: "https://zoom.us", text: "Register on Zoom", type: "link" },
        " for Thursday's customer call, and the ",
        { href: "https://docs.google.com", text: "Activity form", type: "link" },
        " for the offsite is still with you. Jordan wants a yes on the ",
        { href: "https://calendar.google.com", text: "schedule", type: "link" },
        " before noon.",
      ],
      id: "11-agent-on-a-clock",
      role: "agent",
      type: "message",
    },
    {
      content: [
        "The rest: 2 unnamed LinkedIn invitations, a pile of Google security alerts to ",
        { href: "mailto:sam@example.com", text: "sam@example.com", type: "link" },
        ", TLDR, and a Substack you can ignore.",
      ],
      id: "11-agent-the-rest",
      role: "agent",
      type: "message",
    },
    {
      content: [
        "Go to ",
        {
          href: "/figma/settings/connectors",
          text: "/figma/settings/connectors",
          type: "link",
        },
        " to see the new connector.",
      ],
      id: "11-agent-see-connector",
      role: "agent",
      type: "message",
    },
  ]
}

export function getAgentChatById(agentId: string): ChatItem[] {
  return MOCK_AGENT_CHATS[agentId] ?? CHAT_PLACEHOLDER
}

export function getAgentRequestAccessReply(agentId: string): ChatItem[] {
  if (agentId !== "c8e4a1b0-3d72-4f19-8a56-2b9c0e7d4f31") {
    return []
  }

  return [
    {
      content: [
        "Sent. A workspace admin will get a request to update the policy and unblock Gmail.",
      ],
      id: "21-agent-requested",
      role: "agent",
      type: "message",
    },
    {
      content: ["I can't use Company support until they change it."],
      id: "21-agent-waiting",
      role: "agent",
      type: "message",
    },
  ]
}

export function getAgentSendReply(agentId: string): ChatItem[] {
  if (agentId === "c8e4a1b0-3d72-4f19-8a56-2b9c0e7d4f31") {
    return [
      {
        content: ["I can't get into Company support. The connection is blocked."],
        id: "21-agent-on-it",
        role: "agent",
        type: "message",
      },
      {
        content: [
          "Company support is connected, but Gmail is blocked by workspace policy. I can't read or delete anything until an admin updates it.",
        ],
        id: "21-agent-existing-gmail",
        role: "agent",
        type: "message",
      },
      {
        content: ["Contact an admin on the card and ask them to update the policy."],
        id: "21-agent-need-delete",
        role: "agent",
        type: "message",
      },
      {
        action: "request",
        actionLabel: "Contact admin",
        appId: "gmail",
        description: "Connection blocked · Ask an admin to update the policy",
        id: "21-connect-gmail",
        title: "Company support",
        type: "connect",
      },
    ]
  }

  if (agentId !== "d28c5b88-901f-4df0-b5b1-c6b9cab1b420") {
    return []
  }

  return [
    {
      content: ["On it. Checking your inbox for anything from the last 24 hours."],
      id: "11-agent-on-it",
      role: "agent",
      type: "message",
    },
    {
      content: [
        "Gmail is already set up, just not signed in. Connect it on the card and I'll pull the last 24 hours right after.",
      ],
      id: "11-agent-need-gmail",
      role: "agent",
      type: "message",
    },
    {
      actionLabel: "Authorize",
      appId: "gmail",
      description: "Search, read, draft, and manage email.",
      id: "11-connect-gmail",
      title: "Gmail",
      type: "connect",
    },
  ]
}
