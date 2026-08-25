import {
  SiFigma,
  SiGithub,
  SiGmail,
  SiGooglecalendar,
  SiGoogledrive,
  SiLinear,
  SiNotion,
} from "@icons-pack/react-simple-icons"
import type { JSX } from "react"
import type { ConnectorAppId } from "#/data/connectors"

interface AvatarConnectorProps {
  appId: ConnectorAppId
  size?: number
}

interface BrandAvatar {
  background: string
  color: string
  Icon: (props: { color: string; size: number }) => JSX.Element
}

const SIZE = 32
const ICON_SCALE = 0.55

const BRAND_AVATARS: Record<ConnectorAppId, BrandAvatar> = {
  figma: { Icon: FigmaMark, background: "#FDE8E3", color: "default" },
  gcalendar: { Icon: GoogleCalendarMark, background: "#E8F0FE", color: "default" },
  gdrive: { Icon: GoogleDriveMark, background: "#E6F4EA", color: "default" },
  github: { Icon: GithubMark, background: "#F4F4F5", color: "#181717" },
  gmail: { Icon: GmailMark, background: "#FCE8E6", color: "#EA4335" },
  linear: { Icon: LinearMark, background: "#EEEFFB", color: "default" },
  notion: { Icon: NotionMark, background: "#F4F4F5", color: "#181717" },
  slack: { Icon: SlackMark, background: "#F4E8F5", color: "#4A154B" },
}

export function AvatarConnector(props: AvatarConnectorProps): JSX.Element {
  const { appId, size = SIZE } = props
  const brand = BRAND_AVATARS[appId]
  const { Icon } = brand

  return (
    <span
      aria-hidden
      className="
        flex shrink-0 items-center justify-center rounded-8 leading-none
      "
      style={{
        backgroundColor: brand.background,
        height: size,
        width: size,
      }}
    >
      <Icon color={brand.color} size={size * ICON_SCALE} />
    </span>
  )
}

function FigmaMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiFigma color={color} size={size} title="" />
}

function GithubMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiGithub color={color} size={size} title="" />
}

function GmailMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiGmail color={color} size={size} title="" />
}

function GoogleCalendarMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiGooglecalendar color={color} size={size} title="" />
}

function GoogleDriveMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiGoogledrive color={color} size={size} title="" />
}

function LinearMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiLinear color={color} size={size} title="" />
}

function NotionMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return <SiNotion color={color} size={size} title="" />
}

function SlackMark(props: { color: string; size: number }): JSX.Element {
  const { color, size } = props

  return (
    <svg
      aria-hidden
      fill={color}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.2 14.7a2.2 2.2 0 1 1-2.2-2.2h2.2zm1.1 0a2.2 2.2 0 1 1 4.4 0v5.5a2.2 2.2 0 1 1-4.4 0z" />
      <path d="M9.5 6.2a2.2 2.2 0 1 1 2.2-2.2v2.2zm0 1.1a2.2 2.2 0 1 1 0 4.4H4a2.2 2.2 0 1 1 0-4.4z" />
      <path d="M17.8 9.3a2.2 2.2 0 1 1 2.2 2.2h-2.2zm-1.1 0a2.2 2.2 0 1 1-4.4 0V3.8a2.2 2.2 0 1 1 4.4 0z" />
      <path d="M14.5 17.8a2.2 2.2 0 1 1-2.2 2.2v-2.2zm0-1.1a2.2 2.2 0 1 1 0-4.4H20a2.2 2.2 0 1 1 0-4.4z" />
    </svg>
  )
}
