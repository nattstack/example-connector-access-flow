import { Spacer } from "@nattstack/ui"
import { Link, type LinkComponentProps, useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import { Logomark } from "#/components/logomark"
import { Logotype } from "#/components/logotype"

export function LogoLink(props: LinkComponentProps): JSX.Element {
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const { to = "/$workspaceSlug", ...rest } = props

  return (
    <Link
      className="
        flex w-fit items-center rounded-12 p-8 transition-opacity select-none
        hover:opacity-75
      "
      params={{ workspaceSlug }}
      to={to}
      {...rest}
    >
      <Logomark />
      <Spacer width={8} />

      <Logotype className="mt-2 text-text-primary" />
    </Link>
  )
}
