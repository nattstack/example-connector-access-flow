import { Column, Row, Spacer, Switch } from "@nattstack/ui"
import { useRouter } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  isAppBlocked,
  listConnectorApps,
  setAppBlocked,
  type ConnectorApp,
} from "#/data/connectors"

interface SettingsConnectorAppRowProps {
  app: ConnectorApp
  workspaceId: number
}

interface SettingsConnectorAppsProps {
  workspaceId: number
}

export function SettingsConnectorApps(props: SettingsConnectorAppsProps): JSX.Element {
  const { workspaceId } = props
  const apps = listConnectorApps()

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
        Workspace admins can block an app from the connectors list. Blocked apps cannot be added,
        and agents cannot use existing connections.
      </p>
      <Spacer height={16} />

      <Column as="ul" className="gap-y-4">
        {apps.map((app) => (
          <SettingsConnectorAppRow app={app} key={app.id} workspaceId={workspaceId} />
        ))}
      </Column>
    </Column>
  )
}

function SettingsConnectorAppRow(props: SettingsConnectorAppRowProps): JSX.Element {
  const { app, workspaceId } = props
  const router = useRouter()
  const blocked = isAppBlocked(workspaceId, app.id)
  const switchId = `settings-connector-app-${app.id}`

  return (
    <li className="flex min-h-56 items-center rounded-12 px-12">
      <AvatarConnector appId={app.id} />
      <Spacer width={12} />

      <Column className="min-w-0 flex-1">
        <label className="truncate text-14 font-500 text-text-primary" htmlFor={switchId}>
          {app.name}
        </label>
        <span className="truncate text-13 text-text-secondary">
          {blocked ? "Blocked from the connectors list" : "Allowed in this workspace"}
        </span>
      </Column>
      <Row className="shrink-0 items-center">
        <span className="text-13 text-text-secondary">{blocked ? "Blocked" : "Allowed"}</span>
        <Spacer width={8} />

        <Switch
          checked={!blocked}
          id={switchId}
          onCheckedChange={async (allowed) => {
            setAppBlocked(workspaceId, app.id, !allowed)
            await router.invalidate()
          }}
          size={24}
        />
      </Row>
    </li>
  )
}
