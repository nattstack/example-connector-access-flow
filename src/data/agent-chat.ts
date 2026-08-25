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

const CHAT_INBOX_TRIAGE: ChatItem[] = [
  {
    id: "16-meta-date",
    text: "Fri, Aug 21 9:12 AM",
    type: "meta",
  },
  {
    content: ["I can sort Linear inbox into reply-now, later, and noise. How far back?"],
    id: "16-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Since last night. Engineering only. Mentions and failed checks first."],
    id: "16-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Most of it is CI noise. The four that need you are the auth regression, two review pings, and Maya's cycle question.",
    ],
    id: "16-agent-sort",
    role: "agent",
    type: "message",
  },
  {
    content: ["12 unread. 4 need a reply this morning."],
    id: "16-agent-count",
    role: "agent",
    type: "message",
  },
]

const CHAT_PR_REVIEWER: ChatItem[] = [
  {
    id: "17-meta-date",
    text: "Mon, Aug 24 6:22 PM",
    type: "meta",
  },
  {
    content: ["Paste the PR and I'll mark nits versus things that can actually ship broken."],
    id: "17-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Auth path only. Ignore formatting. I want the risk, not a style pass."],
    id: "17-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "The session cookie can stick after logout if the redirect wins the race. The other two are naming and a missing test.",
    ],
    id: "17-agent-risk",
    role: "agent",
    type: "message",
  },
  {
    content: ["Two nits, one real risk in the auth path."],
    id: "17-agent-summary",
    role: "agent",
    type: "message",
  },
]

const CHAT_ISSUE_LABELER: ChatItem[] = [
  {
    id: "18-meta-date",
    text: "Mon, Aug 24 8:40 AM",
    type: "meta",
  },
  {
    content: ["I can label the new Linear issues and flag anything that looks copied."],
    id: "18-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Last 24 hours. Use bug, polish, and infra. Call out duplicates before you apply."],
    id: "18-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Most of the new ones are polish. The three that look copied all point at the same webhook retry ticket.",
    ],
    id: "18-agent-dupes",
    role: "agent",
    type: "message",
  },
  {
    content: ["Labeled 18 new issues. 3 look like duplicates."],
    id: "18-agent-done",
    role: "agent",
    type: "message",
  },
]

const CHAT_STACKTRACE: ChatItem[] = [
  {
    id: "19-meta-date",
    text: "Sun, Aug 23 3:05 PM",
    type: "meta",
  },
  {
    content: ["Paste the stack and I'll tell you the line that actually threw, not the wrappers."],
    id: "19-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Webhook retry loop. Prod only started failing after the last deploy."],
    id: "19-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "The retry reads ",
      { text: "payload.event", type: "code" },
      " after a 204. Empty body, then it dereferences and dies.",
    ],
    id: "19-agent-cause",
    role: "agent",
    type: "message",
  },
  {
    content: ["Null pointer in the webhook retry loop."],
    id: "19-agent-summary",
    role: "agent",
    type: "message",
  },
]

const CHAT_CYCLE_PLANNER: ChatItem[] = [
  {
    id: "20-meta-date",
    text: "Sat, Aug 22 1:20 PM",
    type: "meta",
  },
  {
    content: ["I can check whether this cycle still fits. Send the issues and the point cap."],
    id: "20-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Cycle 42. Cap is 32. Don't move the auth work."],
    id: "20-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Auth stays. If you keep the polish pile, you're at 40. Cut the three unowned chores and you're back under.",
    ],
    id: "20-agent-cut",
    role: "agent",
    type: "message",
  },
  {
    content: ["Cycle 42 is overloaded by about 8 points."],
    id: "20-agent-over",
    role: "agent",
    type: "message",
  },
]

const CHAT_ROADMAP_WRITER: ChatItem[] = [
  {
    id: "21-meta-date",
    text: "Fri, Aug 21 10:30 AM",
    type: "meta",
  },
  {
    content: ["Send the specs and I'll draft themes instead of a feature laundry list."],
    id: "21-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Last 20. Q4 only. Group them so sales can repeat the story."],
    id: "21-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Three themes hold: trusted access, quieter inbox, and usage the customer can explain. Everything else is a supporting bet.",
    ],
    id: "21-agent-themes",
    role: "agent",
    type: "message",
  },
  {
    content: ["Drafted Q4 themes from the last 20 specs."],
    id: "21-agent-done",
    role: "agent",
    type: "message",
  },
]

const CHAT_FOLLOW_UP_DRAFTS: ChatItem[] = [
  {
    id: "22-meta-date",
    text: "Thu, Aug 20 1:30 PM",
    type: "meta",
  },
  {
    content: ["Tell me who you're chasing and I'll draft the follow-up in your voice."],
    id: "22-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Maya. She reviewed the Notion launch notes and went quiet. Warm, not needy."],
    id: "22-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: ["Short, specific, and it names the two comments she still owns."],
    id: "22-agent-tone",
    role: "agent",
    type: "message",
  },
  {
    content: ["Hi Maya, looping back on the review."],
    id: "22-agent-draft",
    role: "agent",
    type: "message",
  },
]

const CHAT_WIKI_SEARCH: ChatItem[] = [
  {
    id: "23-meta-date",
    text: "Mon, Aug 24 5:10 PM",
    type: "meta",
  },
  {
    content: ["Ask the wiki. I'll bring back the page, not a pile of near-matches."],
    id: "23-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Launch checklist. The one ops actually uses, not the template."],
    id: "23-user-query",
    role: "user",
    type: "message",
  },
  {
    content: [
      "It's under Operations / Launch, last edited Thursday. The template in Getting started is the decoy.",
    ],
    id: "23-agent-where",
    role: "agent",
    type: "message",
  },
  {
    content: ["Found the launch checklist in the wiki."],
    id: "23-agent-found",
    role: "agent",
    type: "message",
  },
]

const CHAT_MEETING_RECAP: ChatItem[] = [
  {
    id: "24-meta-date",
    text: "Mon, Aug 24 11:05 AM",
    type: "meta",
  },
  {
    content: ["I can post a recap to Slack once the call ends. Which room?"],
    id: "24-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Ops weekly. Decisions and owners only. Put it in #ops."],
    id: "24-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "Posted. Three decisions, two owners, and I left the parking-lot items out of the pin.",
    ],
    id: "24-agent-posted",
    role: "agent",
    type: "message",
  },
  {
    content: ["Recap posted to the #ops channel."],
    id: "24-agent-done",
    role: "agent",
    type: "message",
  },
]

const CHAT_BRAND_VOICE: ChatItem[] = [
  {
    id: "25-meta-date",
    text: "Sun, Aug 23 9:50 AM",
    type: "meta",
  },
  {
    content: ["Paste the line and I'll tell you if it sounds like us or like a landing-page kit."],
    id: "25-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Card headline for the Notion gallery. It has to fit two lines, max."],
    id: "25-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: ["It's doing too much. Cut the clause after the comma and it still says the product."],
    id: "25-agent-cut",
    role: "agent",
    type: "message",
  },
  {
    content: ["Headline is too long for the card."],
    id: "25-agent-verdict",
    role: "agent",
    type: "message",
  },
]

const CHAT_PAGE_LAYOUT: ChatItem[] = [
  {
    id: "26-meta-date",
    text: "Sat, Aug 22 8:14 AM",
    type: "meta",
  },
  {
    content: ["Send the page and I'll say what should move before you rewrite the copy."],
    id: "26-agent-hello",
    role: "agent",
    type: "message",
  },
  {
    content: ["Docs homepage. People are missing the TOC and bouncing to search."],
    id: "26-user-scope",
    role: "user",
    type: "message",
  },
  {
    content: [
      "The hero is eating the fold. If the TOC sits under the headline, search stops being the only way in.",
    ],
    id: "26-agent-fix",
    role: "agent",
    type: "message",
  },
  {
    content: ["Moved the TOC above the fold."],
    id: "26-agent-done",
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
  "076e4104-3c4c-45c9-8f87-880374f33214": CHAT_MEETING_RECAP,
  "08533504-33d3-4553-a1c1-967915fcfb49": CHAT_WIKI_SEARCH,
  "1fff8a3f-f8a2-4033-a086-9cc2cbf8b9fc": CHAT_DAILY_PRIORITY,
  "2cdd26bc-2cfb-4609-b93f-259ea7f8cbf3": CHAT_LAUNCH_CHECKLIST,
  "4264572a-339b-443a-8232-ae00b5e24592": CHAT_PR_REVIEWER,
  "59691d7d-7471-48e8-9363-b74c37f696aa": CHAT_PAGE_LAYOUT,
  "5bfa94d1-c242-423f-ad02-a4b7a6e2bef3": CHAT_CHANGELOG,
  "5c0d79df-0818-4f17-949b-f96ede136048": CHAT_STACKTRACE,
  "6701dccd-47ab-4653-8a58-6d1131539c11": CHAT_CAMPAIGN,
  "7b8a6fbf-74e6-41fe-89ab-309459e1eef0": CHAT_FIGJAM_SUMMARIZER,
  "802badcd-0647-4297-990a-5f5f0ec07280": CHAT_ISSUE_LABELER,
  "91e55c9a-077a-4e45-aa14-22ef0fad739c": CHAT_ROADMAP_WRITER,
  "9984c2b6-7b18-4e36-97d3-a3b2fb900231": CHAT_COMPETITOR_ANALYSIS,
  "a2926ff5-1b8e-40d9-aea1-16a7135b63e5": CHAT_GTM,
  "a4150364-fb95-412d-9119-3abecc35cba4": CHAT_COMPONENT_AUDITOR,
  "b10245e6-c29f-4d0c-b0e9-0f535001711c": CHAT_GITHUB_FIXER,
  "b959bc08-651f-4b1a-bfc9-3b3312d8c817": CHAT_FOLLOW_UP_DRAFTS,
  "ba13dfae-b828-488b-ba82-882df3c89c50": CHAT_INBOX_TRIAGE,
  "bc3d75f4-bfdf-447f-9c1d-e27fd9b1e1d5": CHAT_VIRTUAL_ASSISTANT,
  "c23b6993-2165-4042-89cd-107b05b24ec0": CHAT_MEETING_NOTES,
  "c973a755-0476-4b8a-ba8d-8cbfb30ed609": CHAT_UI_BOT,
  "d28c5b88-901f-4df0-b5b1-c6b9cab1b420": CHAT_EMAIL_SUMMARY,
  "d58af729-505e-4621-8499-672861ddcafe": CHAT_PRICING,
  "d7fe3ac1-f0b2-4d47-b861-a97a592a08e5": CHAT_THREAD_SUMMARIZER,
  "dd0c0eb6-9e59-4d73-949a-33dbc96717d9": CHAT_COLOR_CONTRAST,
  "ec78fe3a-137d-4aaf-9120-957b20b60fc2": CHAT_BRAND_VOICE,
  "ee756ec1-4390-4851-81d6-3b7d7dca6cb0": CHAT_CYCLE_PLANNER,
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

export function getAgentChatById(agentId: string): ChatItem[] {
  return MOCK_AGENT_CHATS[agentId] ?? CHAT_PLACEHOLDER
}
