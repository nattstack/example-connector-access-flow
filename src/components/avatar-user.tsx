import type { JSX } from "react"

interface AvatarUserProps {
  alt?: string
  size?: number
  src: string
}

const SIZE = 32

export function AvatarUser(props: AvatarUserProps): JSX.Element {
  const { alt = "", src, size = SIZE } = props

  return (
    <img
      alt={alt}
      className="shrink-0 rounded-full object-cover select-none"
      draggable={false}
      src={src}
      style={{
        height: size,
        width: size,
      }}
    />
  )
}
