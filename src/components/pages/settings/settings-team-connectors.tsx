import { IconChevronRightOutline18 } from "@nattstack/icons"
import {
  Button,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
  Row,
} from "@nattstack/ui"
import { useParams } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  SettingsLinkRow,
  SettingsRow,
  SettingsSection,
} from "#/components/pages/settings/settings-section"
import {
  formatConnectorScopeLabel,
  isAppBlocked,
  listConnectorsAvailableForTeam,
  listConnectorsForTeam,
  setConnectorAccess,
  type Connector,
} from "#/data/connectors"
import { isCurrentUserWorkspaceAdmin } from "#/data/members"
import type { Team } from "#/data/teams"

interface ConnectorOption {
  label: string
  value: string
}

interface SettingsTeamConnectorRowProps {
  canRemove: boolean
  connector: Connector
  onRemove: () => void
}

interface SettingsTeamConnectorsProps {
  team: Team
}

export function SettingsTeamConnectors(props: SettingsTeamConnectorsProps): JSX.Element {
  const { team } = props
  const [connectors, setConnectors] = useState(() =>
    listConnectorsForTeam(team.workspaceId, team.id),
  )
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)
  const isAdmin = isCurrentUserWorkspaceAdmin(team.workspaceId)
  const availableConnectors = listConnectorsAvailableForTeam(team.workspaceId, team.id)
  const items: ConnectorOption[] = useMemo(
    () =>
      listConnectorsAvailableForTeam(team.workspaceId, team.id)
        .filter((connector) => connectors.every((onTeam) => onTeam.id !== connector.id))
        .map((connector) => ({
          label: connector.label,
          value: connector.id,
        })),
    [connectors, team.id, team.workspaceId],
  )

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue: ConnectorOption | null = null

  function onAdd(connectorId: string): void {
    setConnectorAccess({
      connectorId,
      teamId: team.id,
      workspaceId: team.workspaceId,
    })
    setIsComboboxOpen(false)
    setConnectors(listConnectorsForTeam(team.workspaceId, team.id))
  }

  function onRemove(connector: Connector): void {
    setConnectorAccess({
      connectorId: connector.id,
      teamId: undefined,
      workspaceId: team.workspaceId,
    })
    setConnectors(listConnectorsForTeam(team.workspaceId, team.id))
  }

  return (
    <SettingsSection title="Connectors">
      {isAdmin && (
        <SettingsRow
          description="A connector can only be restricted to one team. Adding one moves it here."
          label="Add a connector"
        >
          <Combobox<ConnectorOption>
            items={items}
            onOpenChange={setIsComboboxOpen}
            onValueChange={(nextValue) => {
              if (nextValue !== null) {
                onAdd(nextValue.value)
              }
            }}
            open={isComboboxOpen}
            value={selectedValue}
          >
            <ComboboxTrigger
              className="
                w-240
                max-768:w-full
              "
              size={36}
            >
              <ComboboxValue placeholder="Search a connector to add" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxSearch placeholder="Search connectors" />
              <ComboboxEmpty>
                {items.length === 0
                  ? "Every connector is already restricted to this team."
                  : "No connectors found."}
              </ComboboxEmpty>
              <ComboboxList>
                {(item: ConnectorOption) => (
                  <ComboboxItem key={item.value} value={item}>
                    <Row className="items-center gap-8">
                      <ConnectorOptionAvatar
                        connectorId={item.value}
                        connectors={availableConnectors}
                      />
                      <span className="truncate">{item.label}</span>
                    </Row>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </SettingsRow>
      )}
      {connectors.length === 0 ? (
        <SettingsRow
          description="No connectors are restricted to this team yet."
          label="Connectors"
        >
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        connectors.map((connector) => (
          <SettingsTeamConnectorRow
            canRemove={isAdmin}
            connector={connector}
            key={connector.id}
            onRemove={() => onRemove(connector)}
          />
        ))
      )}
    </SettingsSection>
  )
}

function ConnectorOptionAvatar(props: {
  connectorId: string
  connectors: Connector[]
}): JSX.Element {
  const connector = props.connectors.find((entry) => entry.id === props.connectorId)

  if (connector === undefined) {
    return <></>
  }

  return <AvatarConnector appId={connector.appId} />
}

function SettingsTeamConnectorRow(props: SettingsTeamConnectorRowProps): JSX.Element {
  const { canRemove, connector, onRemove } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)
  const scopeLabel = formatConnectorScopeLabel(connector)

  if (canRemove) {
    return (
      <SettingsRow
        description={blocked ? `${scopeLabel} · Blocked` : scopeLabel}
        label={connector.label}
        leading={<AvatarConnector appId={connector.appId} />}
      >
        <Button label="Remove" onClick={onRemove} size={32} variant="ghost" />
      </SettingsRow>
    )
  }

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
