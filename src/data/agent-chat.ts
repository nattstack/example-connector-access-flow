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

export const MOCK_AGENT_CHAT: ChatItem[] = [
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
