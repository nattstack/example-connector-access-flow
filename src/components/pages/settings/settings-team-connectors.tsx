import { IconChevronRightOutline18 } from "@nattstack/icons"
import { useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  SettingsLinkRow,
  SettingsRow,
  SettingsSection,
} from "#/components/pages/settings/settings-section"
import { formatConnectorScopeLabel, isAppBlocked, type Connector } from "#/data/connectors"

interface SettingsTeamConnectorRowProps {
  connector: Connector
}

interface SettingsTeamConnectorsProps {
  connectors: Connector[]
}

export function SettingsTeamConnectors(props: SettingsTeamConnectorsProps): JSX.Element {
  const { connectors } = props

  return (
    <SettingsSection title="Connectors">
      {connectors.length === 0 ? (
        <SettingsRow
          description="No connectors are restricted to this team yet."
          label="Connectors"
        >
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        connectors.map((connector) => (
          <SettingsTeamConnectorRow connector={connector} key={connector.id} />
        ))
      )}
    </SettingsSection>
  )
}

function SettingsTeamConnectorRow(props: SettingsTeamConnectorRowProps): JSX.Element {
  const { connector } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)
  const scopeLabel = formatConnectorScopeLabel(connector)

  return (
    <SettingsLinkRow
      description={blocked ? `${scopeLabel} · Blocked` : scopeLabel}
      label={connector.label}
      leading={<AvatarConnector appId={connector.appId} />}
      link={{
        params: { connectorId: connector.id, workspaceSlug },
        to: "/$workspaceSlug/settings/connectors/$connectorId",
      }}
    >
      <IconChevronRightOutline18 className="text-gray-9" />
    </SettingsLinkRow>
  )
}
