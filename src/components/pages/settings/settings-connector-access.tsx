import {
  Column,
  Row,
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Spacer,
} from "@nattstack/ui"
import { useRouter } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  formatConnectorScopeLabel,
  formatConnectorTitle,
  getConnectorAccessTeam,
  isAppBlocked,
  setConnectorAccess,
  type Connector,
} from "#/data/connectors"
import { listTeamsByWorkspaceId } from "#/data/teams"

const ACCESS_EVERYBODY = "everybody"

interface SettingsConnectorAccessProps {
  connector: Connector
}

export function SettingsConnectorAccess(props: SettingsConnectorAccessProps): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)
  const teams = listTeamsByWorkspaceId(connector.workspaceId)
  const accessTeam = getConnectorAccessTeam(connector)
  const accessValue = accessTeam?.id ?? ACCESS_EVERYBODY

  async function onAccessChange(nextAccess: null | string): Promise<void> {
    if (nextAccess === null) {
      return
    }

    setConnectorAccess({
      connectorId: connector.id,
      teamId: nextAccess === ACCESS_EVERYBODY ? undefined : nextAccess,
      workspaceId: connector.workspaceId,
    })
    await router.invalidate()
  }

  return (
    <Column className="gap-y-16">
      <Column
        as="section"
        className="
          rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
        "
      >
        <Row className="items-center">
          <AvatarConnector appId={connector.appId} />
          <Spacer width={12} />

          <Column className="min-w-0">
            <h2 className="text-24">{formatConnectorTitle(connector)}</h2>
            <p className="text-14 text-text-secondary">
              {connector.label}
              {" · "}
              {formatConnectorScopeLabel(connector)}
            </p>
          </Column>
        </Row>
        {blocked && (
          <>
            <Spacer height={16} />

            <p className="text-14 text-text-secondary">
              This app is blocked in the workspace. Agents cannot use it until a workspace admin
              allows it again.
            </p>
          </>
        )}
      </Column>

      <Column
        as="section"
        className="
          rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
        "
      >
        <h2 className="text-24">Access</h2>
        <Spacer height={8} />

        <p className="text-14 text-text-secondary">
          Everybody in the workspace can use this connector, or restrict it to one team.
        </p>
        <Spacer height={16} />

        <Select onValueChange={onAccessChange} value={accessValue}>
          <SelectTrigger className="w-full">
            <SelectValue>{accessTeam?.name ?? "Everybody"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ACCESS_EVERYBODY}>Everybody</SelectItem>
            {teams.length > 0 && (
              <>
                <SelectSeparator />
                <SelectGroup>
                  <SelectGroupLabel>Team</SelectGroupLabel>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </>
            )}
          </SelectContent>
        </Select>
      </Column>
    </Column>
  )
}
