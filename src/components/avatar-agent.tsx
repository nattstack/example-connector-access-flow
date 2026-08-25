import type { JSX } from "react"

interface AvatarAgentProps {
  alt?: string
  size?: number
  src: string
}

const SIZE = 32

export function AvatarAgent(props: AvatarAgentProps): JSX.Element {
  const { alt = "", src, size = SIZE } = props

  return (
    <img
      alt={alt}
      className="shrink-0 rounded-full object-cover"
      src={src}
      style={{
        height: size,
        width: size,
      }}
      width={40}
    />
  )
}
