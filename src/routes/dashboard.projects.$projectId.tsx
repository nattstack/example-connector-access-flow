import { ButtonLink, Column, Row, Spacer } from "@nattstack/ui"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import type { JSX } from "react"
import { getProjectById, getProjectStatusLabel } from "#/data/projects.ts"

export const Route = createFileRoute("/dashboard/projects/$projectId")({
  component: function ProjectDetailPage(): JSX.Element {
    const { project } = Route.useLoaderData()

    return (
      <Column className="px-32 py-32">
        <ButtonLink as={Link} label="Back to dashboard" size={32} to="/dashboard" variant="ghost" />

        <Spacer className="h-16" />

        <Row alignItems="center" className="gap-12">
          <h1 className="text-24 font-500 text-text-primary">{project.name}</h1>
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

        <Spacer className="h-24" />

        <div
          className="
            grid grid-cols-3 gap-16
            max-1024:grid-cols-1
          "
        >
          <DetailCard label="Owner" value={project.owner} />
          <DetailCard label="Connectors" value={String(project.connectorCount)} />
          <DetailCard label="Last updated" value={project.updatedAt} />
        </div>
      </Column>
    )
  },
  loader: ({ params }) => {
    const project = getProjectById(params.projectId)

    if (project === undefined) {
      throw notFound()
    }

    return { project }
  },
})

// oxlint-disable-next-line react/only-export-components
function DetailCard({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <Column className="rounded-12 border border-border bg-bg-primary p-20">
      <p className="text-12 font-500 text-text-secondary">{label}</p>

      <Spacer className="h-8" />

      <p className="text-16 font-500 text-text-primary">{value}</p>
    </Column>
  )
}
