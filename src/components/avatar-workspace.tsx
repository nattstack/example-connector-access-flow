import type { JSX } from "react"

interface AvatarWorkspaceProps {
  name: string
  size?: number
}

interface FruitAvatar {
  background: string
  emoji: string
}

const SIZE = 16
const EMOJI_SCALE = 0.75
const HASH_PRIME = 31
const VIEWBOX = "0 0 16 16"

const FRUIT_AVATARS: Record<string, FruitAvatar> = {
  apple: { background: "#FEE2E2", emoji: "🍎" },
  banana: { background: "#FEF3C7", emoji: "🍌" },
  blueberry: { background: "#DBEAFE", emoji: "🫐" },
  cherries: { background: "#FCE7F3", emoji: "🍒" },
  cherry: { background: "#FCE7F3", emoji: "🍒" },
  coconut: { background: "#E7E5E4", emoji: "🥥" },
  "dragon fruit": { background: "#FCE7F3", emoji: "🐉" },
  grape: { background: "#EDE9FE", emoji: "🍇" },
  grapes: { background: "#EDE9FE", emoji: "🍇" },
  kiwi: { background: "#D1FAE5", emoji: "🥝" },
  lemon: { background: "#FEF9C3", emoji: "🍋" },
  mango: { background: "#FFEDD5", emoji: "🥭" },
  melon: { background: "#D1FAE5", emoji: "🍈" },
  orange: { background: "#FFEDD5", emoji: "🍊" },
  peach: { background: "#FFE4E6", emoji: "🍑" },
  pear: { background: "#ECFCCB", emoji: "🍐" },
  pineapple: { background: "#FEF3C7", emoji: "🍍" },
  strawberry: { background: "#FEE2E2", emoji: "🍓" },
  watermelon: { background: "#D1FAE5", emoji: "🍉" },
}

const GENERATED_PALETTES = [
  ["#DBEAFE", "#60A5FA", "#1D4ED8"],
  ["#D1FAE5", "#34D399", "#047857"],
  ["#FCE7F3", "#F472B6", "#BE185D"],
  ["#EDE9FE", "#A78BFA", "#6D28D9"],
  ["#FFEDD5", "#FB923C", "#C2410C"],
  ["#FEF3C7", "#FBBF24", "#B45309"],
  ["#E0E7FF", "#818CF8", "#4338CA"],
  ["#CFFAFE", "#22D3EE", "#0E7490"],
] as const

export function AvatarWorkspace(props: AvatarWorkspaceProps): JSX.Element {
  const { name, size = SIZE } = props
  const fruit = fruitAvatarFromName(name)

  if (fruit !== undefined) {
    return (
      <span
        aria-hidden
        className="
          flex shrink-0 items-center justify-center rounded-4 leading-none
        "
        style={{
          backgroundColor: fruit.background,
          fontSize: size * EMOJI_SCALE,
          height: size,
          width: size,
        }}
      >
        {fruit.emoji}
      </span>
    )
  }

  return <GeneratedAvatar name={name} size={size} />
}

function fruitAvatarFromName(name: string): FruitAvatar | undefined {
  const normalized = normalizeAvatarName(name)

  return FRUIT_AVATARS[normalized] ?? FRUIT_AVATARS[normalized.split(/[\s-]+/u)[0] ?? ""]
}

function GeneratedAvatar(props: { name: string; size: number }): JSX.Element {
  const { name, size } = props

  const hash = hashName(name)
  const palette = GENERATED_PALETTES[hash % GENERATED_PALETTES.length] ?? GENERATED_PALETTES[0]

  const [background, mid, foreground] = palette

  return (
    <svg aria-hidden className="shrink-0 rounded-4" height={size} viewBox={VIEWBOX} width={size}>
      <rect fill={background} height="16" rx="4" width="16" />
      <circle cx="13" cy="3" fill={mid} r="7" />
      <circle cx="3" cy="14" fill={foreground} opacity="0.7" r="6" />
    </svg>
  )
}

function hashName(name: string): number {
  let hash = 0

  for (const character of name) {
    hash = hash * HASH_PRIME + (character.codePointAt(0) ?? 0)
  }

  return Math.abs(hash)
}

function normalizeAvatarName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replaceAll(/[\u0300-\u036F]/gu, "")
    .replaceAll(/\([^)]*\)/gu, "")
    .trim()
}
