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
import { useRouter } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { SettingsRow, SettingsSection } from "#/components/pages/settings/settings-section"
import {
  listConnectorApps,
  setAppBlocked,
  type ConnectorApp,
  type ConnectorAppId,
} from "#/data/connectors"
import { isCurrentUserWorkspaceAdmin } from "#/data/members"

interface BlockableAppOption {
  label: string
  value: ConnectorAppId
}

interface SettingsConnectorAppRowProps {
  app: ConnectorApp
  canUnblock: boolean
  onUnblock: () => Promise<void> | void
}

interface SettingsConnectorAppsProps {
  blockedApps: ConnectorApp[]
  workspaceId: number
}

export function SettingsConnectorApps(props: SettingsConnectorAppsProps): JSX.Element {
  const { blockedApps, workspaceId } = props
  const router = useRouter()
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)

  const isAdmin = isCurrentUserWorkspaceAdmin(workspaceId)
  const items: BlockableAppOption[] = useMemo(
    () =>
      listConnectorApps()
        .filter((app) => blockedApps.every((blocked) => blocked.id !== app.id))
        .map((app) => ({
          label: app.name,
          value: app.id,
        })),
    [blockedApps],
  )

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue: BlockableAppOption | null = null

  async function onBlock(appId: ConnectorAppId): Promise<void> {
    setAppBlocked(workspaceId, appId, true)
    setIsComboboxOpen(false)
    await router.invalidate()
  }

  async function onUnblock(app: ConnectorApp): Promise<void> {
    setAppBlocked(workspaceId, app.id, false)
    await router.invalidate()
  }

  return (
    <SettingsSection title="Connector apps">
      <SettingsRow
        description={
          isAdmin
            ? "Apps are allowed unless you block them. Blocked apps cannot be added, and agents cannot use existing connections."
            : "Apps are allowed unless a workspace admin blocks them. Blocked apps cannot be added, and agents cannot use existing connections."
        }
        label="Block an app"
      >
        <Combobox<BlockableAppOption>
          disabled={!isAdmin}
          items={items}
          onOpenChange={setIsComboboxOpen}
          onValueChange={async (nextValue) => {
            if (nextValue !== null) {
              await onBlock(nextValue.value)
            }
          }}
          open={isComboboxOpen}
          value={selectedValue}
        >
          <ComboboxTrigger
            className="
              w-240
              data-disabled:cursor-default data-disabled:opacity-50
              max-768:w-full
            "
            size={36}
          >
            <ComboboxValue
              placeholder={
                isAdmin ? "Search an app to block" : "Only workspace admins can block apps"
              }
            />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxSearch placeholder="Search apps" />
            <ComboboxEmpty>
              {items.length === 0 ? "Every app is already blocked." : "No apps found."}
            </ComboboxEmpty>
            <ComboboxList>
              {(item: BlockableAppOption) => (
                <ComboboxItem key={item.value} value={item}>
                  <Row className="items-center gap-8">
                    <AvatarConnector appId={item.value} />
                    <span className="truncate">{item.label}</span>
                  </Row>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </SettingsRow>
      {blockedApps.length === 0 ? (
        <SettingsRow
          description={
            isAdmin
              ? "Search to add an app to the block list."
              : "No connector apps are blocked in this workspace."
          }
          label="Blocked apps"
        >
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        blockedApps.map((app) => (
          <SettingsConnectorAppRow
            app={app}
            canUnblock={isAdmin}
            key={app.id}
            onUnblock={() => onUnblock(app)}
          />
        ))
      )}
    </SettingsSection>
  )
}

function SettingsConnectorAppRow(props: SettingsConnectorAppRowProps): JSX.Element {
  const { app, canUnblock, onUnblock } = props

  return (
    <SettingsRow description="Blocked from the connectors list" label={app.name}>
      <Button
        disabled={!canUnblock}
        label="Unblock"
        onClick={onUnblock}
        size={32}
        variant="ghost"
      />
    </SettingsRow>
  )
}
