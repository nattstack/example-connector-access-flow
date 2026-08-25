import { IconArrowLeftOutline18 } from "@nattstack/icons"
import { Spacer } from "@nattstack/ui"
import { Link } from "@tanstack/react-router"
import type { JSX } from "react"

interface SettingsBackLinkProps {
  label: string
}

export function SettingsBackLink(props: SettingsBackLinkProps): JSX.Element {
  const { label } = props

  return (
    <Link
      className="
        inline-flex h-32 items-center text-14 font-500 text-text-secondary
        select-none
        hover:text-text-primary
      "
      to=".."
    >
      <IconArrowLeftOutline18 />
      <Spacer width={8} />

      {label}
    </Link>
  )
}
