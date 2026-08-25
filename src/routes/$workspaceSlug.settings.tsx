import { Outlet, createFileRoute, useMatchRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { LayoutMain } from "#/components/pages/dashboard/layout-main"
import { SettingsBackLink } from "#/components/pages/settings/settings-back-link"

export const Route = createFileRoute("/$workspaceSlug/settings")({
  component: function SettingsLayout(): JSX.Element {
    const matchRoute = useMatchRoute()
    const isTeamDetail = matchRoute({ to: "/$workspaceSlug/settings/teams/$teamSlug" })
    const isConnectorDetail = matchRoute({
      to: "/$workspaceSlug/settings/connectors/$connectorId",
    })

    const leading = settingsDetailBackLink({
      isConnectorDetail: Boolean(isConnectorDetail),
      isTeamDetail: Boolean(isTeamDetail),
    })

    return (
      <LayoutMain leading={leading}>
        <Outlet />
      </LayoutMain>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Settings",
      },
    ],
  }),
})

function settingsDetailBackLink(input: {
  isConnectorDetail: boolean
  isTeamDetail: boolean
}): JSX.Element | undefined {
  if (input.isTeamDetail) {
    return <SettingsBackLink label="Teams" />
  }

  if (input.isConnectorDetail) {
    return <SettingsBackLink label="Connectors" />
  }

  return undefined
}
