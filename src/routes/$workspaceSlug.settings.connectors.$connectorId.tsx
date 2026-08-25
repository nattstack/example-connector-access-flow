import { Spacer } from "@nattstack/ui"
import { createFileRoute, notFound, useRouteContext } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsConnectorAccess } from "#/components/pages/settings/settings-connector-access"
import { formatConnectorTitle, getConnectorById } from "#/data/connectors"
import { getWorkspaceBySlug } from "#/data/workspaces"

export const Route = createFileRoute("/$workspaceSlug/settings/connectors/$connectorId")({
  beforeLoad: ({ context, params }) => {
    const connector = getConnectorById(context.workspace.id, params.connectorId)

    if (connector === undefined) {
      throw notFound()
    }
  },
  component: function SettingsConnectorDetailPage(): JSX.Element {
    const { workspace } = useRouteContext({ from: "/$workspaceSlug" })
    const { connectorId } = Route.useParams()
    const connector = getConnectorById(workspace.id, connectorId)

    if (connector === undefined) {
      throw notFound()
    }

    return (
      <>
        <h1 className="text-30">{connector.label}</h1>
        <Spacer height={24} />

        <SettingsConnectorAccess connector={connector} key={connector.id} />
      </>
    )
  },
  head: ({ params }) => {
    const workspace = getWorkspaceBySlug(params.workspaceSlug)
    const connector =
      workspace === undefined ? undefined : getConnectorById(workspace.id, params.connectorId)

    return {
      meta: [
        {
          title:
            connector === undefined
              ? "Connectors · Settings"
              : `${formatConnectorTitle(connector)} · Connectors · Settings`,
        },
      ],
    }
  },
})
