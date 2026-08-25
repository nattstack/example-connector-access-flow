import { Column, Row, Spacer } from "@nattstack/ui"
import { Link, createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { getProjectStatusLabel, projects } from "#/data/projects.ts"

export const Route = createFileRoute("/dashboard/")({
  component: function DashboardPage(): JSX.Element {
    return (
      <Column className="d px-32 py-32">
        <h1 className="text-24 font-500 text-text-primary">Dashboard</h1>

        <Spacer className="h-8" />

        <p className="text-14 text-text-secondary">
          Choose a project to review connectors and access.
        </p>

        <Spacer className="h-24" />

        <div
          className="
            grid grid-cols-2 gap-16
            max-1024:grid-cols-1
          "
        >
          {projects.map((project) => (
            <Link
              className="
                rounded-12 border border-border bg-bg-primary p-20 text-left
                no-underline
                hover:border-gray-6
              "
              key={project.id}
              params={{ projectId: project.id }}
              to="/dashboard/projects/$projectId"
            >
              <Column>
                <Row alignItems="center" className="gap-8" justifyContent="space-between">
                  <h2 className="text-18 font-500 text-text-primary">{project.name}</h2>
                  <span
                    className="
                      rounded-6 bg-gray-3 px-8 py-4 text-12 text-text-secondary
                    "
                  >
                    {getProjectStatusLabel(project.status)}
                  </span>
                </Row>

                <Spacer className="h-8" />

                <p className="text-14 text-text-secondary">{project.description}</p>

                <Spacer className="h-16" />

                <p className="text-12 text-text-secondary">
                  {project.connectorCount} connectors · Updated {project.updatedAt}
                </p>
              </Column>
            </Link>
          ))}
        </div>
      </Column>
    )
  },
})
