import { Link, useParams } from "@tanstack/react-router"
import type { JSX } from "react"

interface BadgeTeamProps {
  team: string
}

export function BadgeTeam(props: BadgeTeamProps): JSX.Element {
  const { team } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <Link
      className="
        flex h-[18px] shrink-0 items-center rounded-4 bg-gray-4 px-4 text-12
        text-text-secondary
        hover:bg-gray-5
      "
      params={{ workspaceSlug }}
      to="/$workspaceSlug/settings/teams"
    >
      {team}
    </Link>
  )
}
