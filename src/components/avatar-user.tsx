import type { JSX } from "react"

interface AvatarUserProps {
  name: string
  size?: number
}

const SIZE = 32

export function AvatarUser(props: AvatarUserProps): JSX.Element {
  const { name, size = SIZE } = props

  return (
    <span
      aria-hidden
      className="
        flex shrink-0 items-center justify-center rounded-full bg-gray-4 text-12
        font-500 text-text-primary
      "
      style={{
        height: size,
        width: size,
      }}
    >
      {getInitials(name)}
    </span>
  )
}

function getInitials(name: string): string {
  const nameParts = name.trim().toUpperCase().split(" ")

  if (nameParts.length === 1) {
    return nameParts[0][0]
  }

  const lastNamePartIndex = -1

  return nameParts[0][0] + nameParts.at(lastNamePartIndex)?.[0]
}
