import { Column, Row, Spacer } from "@nattstack/ui"
import { Link, type LinkComponentProps } from "@tanstack/react-router"
import type { JSX } from "react"
import { LogoLink } from "#/components/logo-link"
import { projects } from "#/data/projects"

export function DashboardSidebar(): JSX.Element {
  return (
    <Column
      as="aside"
      className="
        sticky top-0 left-0 isolate z-30 h-dvh w-256 shrink-0
        shadow-[inset_-1px_0_0_0_var(--color-border)]
      "
    >
      {/* Logo */}
      <Row className="mt-8 ml-8">
        <LogoLink />
      </Row>
      <Spacer height={8} />

      {/* Navigation */}
      <Column as="nav" className="gap-y-2 px-8">
        <NavLink activeOptions={{ exact: true }} label="Dashboard" to="/dashboard" />
      </Column>
      <Spacer height={24} />

      <p className="px-12 text-12 font-500 text-text-secondary uppercase">Projects</p>
      <Spacer className="h-8" />

      <Column as="nav" className="gap-y-2 px-8">
        {projects.map((project) => (
          <NavLink
            key={project.id}
            label={project.name}
            params={{ projectId: project.id }}
            to="/dashboard/projects/$projectId"
          />
        ))}
      </Column>
    </Column>
  )
}

function NavLink(props: { label: string } & LinkComponentProps): JSX.Element {
  const { label = "", to = "/dashboard", ...rest } = props

  return (
    <Link
      activeProps={{ className: "bg-gray-3 text-text-primary!" }}
      className="
        flex h-36 items-center rounded-8 px-8 text-14 text-text-secondary
        hover:bg-gray-3 hover:text-text-primary
      "
      to={to}
      {...rest}
    >
      {label}
    </Link>
  )
}
