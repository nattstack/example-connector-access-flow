import { Column, Spacer } from "@nattstack/ui"
import { Link } from "@tanstack/react-router"
import type { JSX } from "react"
import { projects } from "#/data/projects.ts"

const navLinkClassName = `
  rounded-8 px-12 py-8 text-14 text-text-secondary no-underline
  hover:bg-gray-3 hover:text-text-primary
`
const navLinkActiveClassName = "bg-gray-3 font-500 text-text-primary"

export function DashboardSidebar(): JSX.Element {
  return (
    <Column
      as="nav"
      className="
        h-svh w-240 shrink-0 border-r border-border bg-bg-shell-inner px-16
        py-24
      "
    >
      <Link className="px-12 text-16 font-500 text-text-primary no-underline" to="/dashboard">
        Connector Access
      </Link>

      <Spacer className="h-24" />

      <Column className="gap-4">
        <Link
          activeOptions={{ exact: true }}
          activeProps={{ className: navLinkActiveClassName }}
          className={navLinkClassName}
          to="/dashboard"
        >
          Dashboard
        </Link>
      </Column>

      <Spacer className="h-24" />

      <p className="px-12 text-12 font-500 text-text-secondary uppercase">Projects</p>

      <Spacer className="h-8" />

      <Column className="gap-4">
        {projects.map((project) => (
          <Link
            activeProps={{ className: navLinkActiveClassName }}
            className={navLinkClassName}
            key={project.id}
            params={{ projectId: project.id }}
            to="/dashboard/projects/$projectId"
          >
            {project.name}
          </Link>
        ))}
      </Column>
    </Column>
  )
}
