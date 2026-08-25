import { Spacer } from "@nattstack/ui"
import { Link, useParams } from "@tanstack/react-router"
import type { JSX } from "react"

interface DashboardSidebarLinkProps {
  icon: JSX.Element
  label: string
  to: DashboardSidebarLinkTo
}

type DashboardSidebarLinkTo =
  | "/$workspaceSlug"
  | "/$workspaceSlug/settings/account"
  | "/$workspaceSlug/settings/profile"
  | "/$workspaceSlug/settings/security"

export function DashboardSidebarLink(props: DashboardSidebarLinkProps): JSX.Element {
  const { icon, label, to } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <Link
      activeOptions={{ exact: true }}
      activeProps={{ className: "bg-gray-3 text-text-primary" }}
      className="
        flex h-36 w-full shrink-0 cursor-pointer items-center overflow-hidden
        rounded-8 px-8 select-none
        hover:bg-gray-3 hover:text-text-primary
      "
      params={{ workspaceSlug }}
      to={to}
    >
      {icon}
      <Spacer width={8} />

      <span className="truncate text-14 font-500">{label}</span>
    </Link>
  )
}
