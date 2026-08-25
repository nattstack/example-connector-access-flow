import type { JSX } from "react"

interface BadgeTeamProps {
  team: string
}

export function BadgeTeam(props: BadgeTeamProps): JSX.Element {
  const { team } = props

  return (
    <span
      className="
        flex h-[18px] shrink-0 items-center rounded-4 bg-gray-4 px-4 text-12
        text-text-secondary
      "
    >
      {team}
    </span>
  )
}
