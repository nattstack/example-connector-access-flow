import { SiFigma, SiLinear, SiNotion, SiVercel } from "@icons-pack/react-simple-icons"
import type { JSX } from "react"
import type { WorkspaceLogo } from "#/data/workspaces"

interface AvatarWorkspaceProps {
  logo?: WorkspaceLogo
  name: string
  size?: number
}

const SIZE = 16
const ICON_SCALE = 0.55
const HASH_PRIME = 31
const VIEWBOX = "0 0 16 16"

const BRAND_AVATARS = {
  figma: { Icon: SiFigma, background: "#FDE8E3" },
  linear: { Icon: SiLinear, background: "#EEEFFB" },
  notion: { Icon: SiNotion, background: "#F4F4F5" },
  vercel: { Icon: SiVercel, background: "#F4F4F5" },
} as const satisfies Record<WorkspaceLogo, { background: string; Icon: typeof SiFigma }>

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
  const { logo, name, size = SIZE } = props
  const brand = brandAvatarFromWorkspace(logo, name)

  if (brand !== undefined) {
    const { Icon } = brand

    return (
      <span
        aria-hidden
        className="
          flex shrink-0 items-center justify-center rounded-4 leading-none
        "
        style={{
          backgroundColor: brand.background,
          height: size,
          width: size,
        }}
      >
        <Icon color="default" size={size * ICON_SCALE} title="" />
      </span>
    )
  }

  return <GeneratedAvatar name={name} size={size} />
}

function brandAvatarFromWorkspace(
  logo: undefined | WorkspaceLogo,
  name: string,
): (typeof BRAND_AVATARS)[WorkspaceLogo] | undefined {
  if (logo !== undefined) {
    return BRAND_AVATARS[logo]
  }

  const normalized = normalizeAvatarName(name)

  if (isWorkspaceLogo(normalized)) {
    return BRAND_AVATARS[normalized]
  }

  const firstWord = normalized.split(/[\s-]+/u)[0] ?? ""

  if (isWorkspaceLogo(firstWord)) {
    return BRAND_AVATARS[firstWord]
  }

  return undefined
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

function isWorkspaceLogo(value: string): value is WorkspaceLogo {
  return Object.hasOwn(BRAND_AVATARS, value)
}

function normalizeAvatarName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replaceAll(/[\u0300-\u036F]/gu, "")
    .replaceAll(/\([^)]*\)/gu, "")
    .trim()
}
