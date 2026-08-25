import { IconChevronExpandYOutline18 } from "@nattstack/icons"
import {
  Button,
  Column,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
  Row,
  Spacer,
} from "@nattstack/ui"
import { useRouter } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  listBlockedConnectorApps,
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
  workspaceId: number
}

export function SettingsConnectorApps(props: SettingsConnectorAppsProps): JSX.Element {
  const { workspaceId } = props
  const router = useRouter()
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)

  const isAdmin = isCurrentUserWorkspaceAdmin(workspaceId)
  const blockedApps = listBlockedConnectorApps(workspaceId)
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
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Connector apps</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        {isAdmin
          ? `
            Apps are allowed unless you block them. Search to add an app to the
            block list. Blocked apps cannot be added, and agents cannot use
            existing connections.
          `
          : `
            Apps are allowed unless a workspace admin blocks them. Blocked apps
            cannot be added, and agents cannot use existing connections.
          `}
      </p>
      <Spacer height={16} />

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
            w-full
            data-disabled:cursor-default data-disabled:opacity-50
            **:data-[component=combobox-icon]:hidden
          "
          size={36}
        >
          <ComboboxValue
            placeholder={
              isAdmin ? "Search an app to block" : "Only workspace admins can block apps"
            }
          />
          <IconChevronExpandYOutline18 className="shrink-0 text-gray-9" />
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
      <Spacer height={16} />

      {blockedApps.length === 0 ? (
        <p className="text-14 text-text-secondary">
          {isAdmin
            ? "No apps are blocked. Search to add one to the block list."
            : "No apps are blocked."}
        </p>
      ) : (
        <Column as="ul" className="gap-y-4">
          {blockedApps.map((app) => (
            <SettingsConnectorAppRow
              app={app}
              canUnblock={isAdmin}
              key={app.id}
              onUnblock={() => onUnblock(app)}
            />
          ))}
        </Column>
      )}
    </Column>
  )
}

function SettingsConnectorAppRow(props: SettingsConnectorAppRowProps): JSX.Element {
  const { app, canUnblock, onUnblock } = props

  return (
    <li className="flex min-h-56 items-center rounded-12 px-12">
      <AvatarConnector appId={app.id} />
      <Spacer width={12} />

      <Column className="min-w-0 flex-1">
        <span className="truncate text-14 font-500 text-text-primary">{app.name}</span>
        <span className="truncate text-13 text-text-secondary">
          Blocked from the connectors list
        </span>
      </Column>
      <Button
        disabled={!canUnblock}
        label="Unblock"
        onClick={onUnblock}
        size={32}
        variant="ghost"
      />
    </li>
  )
}
