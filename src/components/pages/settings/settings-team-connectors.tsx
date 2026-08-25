import { IconChevronRightOutline18 } from "@nattstack/icons"
import { Column, Spacer } from "@nattstack/ui"
import { Link, useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  formatConnectorScopeLabel,
  formatConnectorTitle,
  isAppBlocked,
  type Connector,
} from "#/data/connectors"
import type { Team } from "#/data/teams"

interface SettingsTeamConnectorRowProps {
  connector: Connector
  teamId: string
}

interface SettingsTeamConnectorsProps {
  connectors: Connector[]
  team: Team
}

export function SettingsTeamConnectors(props: SettingsTeamConnectorsProps): JSX.Element {
  const { connectors, team } = props

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Connectors</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Connections this team owns, plus any granted from another team.
      </p>
      <Spacer height={16} />

      {connectors.length === 0 ? (
        <p className="text-14 text-text-secondary">No connectors for this team yet.</p>
      ) : (
        <Column as="ul" className="gap-y-4">
          {connectors.map((connector) => (
            <SettingsTeamConnectorRow connector={connector} key={connector.id} teamId={team.id} />
          ))}
        </Column>
      )}
    </Column>
  )
}

function SettingsTeamConnectorRow(props: SettingsTeamConnectorRowProps): JSX.Element {
  const { connector, teamId } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)
  const ownership = connector.ownerTeamId === teamId ? "Owns" : "Granted"

  return (
    <li>
      <Link
        className="
          flex min-h-56 w-full items-center rounded-12 px-12 select-none
          hover:bg-gray-3
        "
        params={{ connectorId: connector.id, workspaceSlug }}
        to="/$workspaceSlug/settings/connectors/$connectorId"
      >
        <AvatarConnector appId={connector.appId} />
        <Spacer width={12} />

        <Column className="min-w-0 flex-1">
          <span className="truncate text-14 font-500 text-text-primary">
            {formatConnectorTitle(connector)}
          </span>
          <span className="truncate text-13 text-text-secondary">
            {ownership}
            {" · "}
            {connector.label}
            {" · "}
            {formatConnectorScopeLabel(connector)}
            {blocked ? " · Blocked" : ""}
          </span>
        </Column>
        <Spacer width={8} />

        <IconChevronRightOutline18 className="shrink-0 text-gray-9" />
      </Link>
    </li>
  )
}
