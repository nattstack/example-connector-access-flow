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
      className="aspect-1-1 size-40 shrink-0 rounded-8"
      height={40}
      src={src}
      width={40}
    />
  )
}
