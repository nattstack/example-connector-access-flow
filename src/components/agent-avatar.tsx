import type { JSX } from "react"

interface AgentAvatarProps {
  alt?: string
  src: string
}

export function AgentAvatar(props: AgentAvatarProps): JSX.Element {
  const { alt = "", src } = props

  return (
    <img
      alt={alt}
      className="size-32 shrink-0 rounded-full object-cover"
      height={40}
      src={src}
      width={40}
    />
  )
}
