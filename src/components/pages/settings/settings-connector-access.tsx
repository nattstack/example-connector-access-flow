import {
  Button,
  Column,
  Row,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
} from "@nattstack/ui"
import { useRouter } from "@tanstack/react-router"
import { useState, type JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import { AvatarConnector } from "#/components/avatar-connector"
import { getAgentById } from "#/data/agents"
import {
  formatConnectorScopeLabel,
  formatConnectorTitle,
  grantAgentToConnector,
  grantTeamToConnector,
  isAppBlocked,
  listGrantableAgents,
  listGrantableTeams,
  revokeAgentFromConnector,
  revokeTeamFromConnector,
  type Connector,
} from "#/data/connectors"
import { getTeamById, type Team } from "#/data/teams"

interface SettingsConnectorAccessProps {
  connector: Connector
}

export function SettingsConnectorAccess(props: SettingsConnectorAccessProps): JSX.Element {
  const { connector } = props
  const ownerTeam = getTeamById(connector.workspaceId, connector.ownerTeamId)
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)

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
        <h2 className="text-24">Owner team</h2>
        <Spacer height={8} />

        <p className="text-14 text-text-secondary">
          Every agent on this team inherits access. Moving an agent off the team drops this
          connector.
        </p>
        <Spacer height={16} />

        <p className="text-14 font-500 text-text-primary">{ownerTeam?.name ?? "Unknown team"}</p>
      </Column>

      <GrantedTeamsCard connector={connector} />
      <GrantedAgentsCard connector={connector} />
    </Column>
  )
}

function GrantedAgentsCard(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const grantableAgents = listGrantableAgents(connector)
  const [firstGrantableAgent] = grantableAgents
  const [agentId, setAgentId] = useState(firstGrantableAgent?.id ?? "")
  const selectedAgentId = agentId.length === 0 ? firstGrantableAgent?.id : agentId
  const selectedAgent =
    selectedAgentId === undefined
      ? undefined
      : grantableAgents.find((agent) => agent.id === selectedAgentId)

  const grantedAgents = connector.grantedAgentIds.flatMap((grantedAgentId) => {
    const agent = getAgentById(connector.workspaceId, grantedAgentId)

    return agent === undefined ? [] : [agent]
  })

  async function onGrant(): Promise<void> {
    if (selectedAgentId === undefined) {
      return
    }

    grantAgentToConnector({
      agentId: selectedAgentId,
      connectorId: connector.id,
      workspaceId: connector.workspaceId,
    })
    setAgentId("")
    await router.invalidate()
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Unteamed agents</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Agents without a team do not inherit access. Grant them one by one.
      </p>
      <Spacer height={16} />

      {grantedAgents.length === 0 ? (
        <p className="text-14 text-text-secondary">No unteamed agents have access yet.</p>
      ) : (
        <Column as="ul" className="gap-y-4">
          {grantedAgents.map((agent) => (
            <li className="flex min-h-56 items-center rounded-12 px-12" key={agent.id}>
              <AvatarAgent alt={agent.name} src={agent.avatar} />
              <Spacer width={8} />

              <span
                className="
                  min-w-0 flex-1 truncate text-14 font-500 text-text-primary
                "
              >
                {agent.name}
              </span>
              <Button
                label="Remove"
                onClick={async () => {
                  revokeAgentFromConnector({
                    agentId: agent.id,
                    connectorId: connector.id,
                    workspaceId: connector.workspaceId,
                  })
                  await router.invalidate()
                }}
                size={32}
                variant="ghost"
              />
            </li>
          ))}
        </Column>
      )}

      {grantableAgents.length > 0 && (
        <>
          <Spacer height={16} />

          <Row className="items-center">
            <Select
              onValueChange={(nextAgentId) => {
                if (nextAgentId !== null) {
                  setAgentId(nextAgentId)
                }
              }}
              value={selectedAgentId}
            >
              <SelectTrigger className="min-w-0 flex-1">
                <SelectValue>{selectedAgent?.name}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {grantableAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Spacer width={8} />

            <Button label="Grant access" onClick={onGrant} size={36} variant="secondary" />
          </Row>
        </>
      )}
    </Column>
  )
}

function GrantedTeamRow(props: { connector: Connector; team: Team }): JSX.Element {
  const { connector, team } = props
  const router = useRouter()

  return (
    <li className="flex min-h-56 items-center rounded-12 px-12">
      <Column className="min-w-0 flex-1">
        <span className="truncate text-14 font-500 text-text-primary">{team.name}</span>
        <span className="truncate text-13 text-text-secondary">{team.description}</span>
      </Column>
      <Button
        label="Remove"
        onClick={async () => {
          revokeTeamFromConnector({
            connectorId: connector.id,
            teamId: team.id,
            workspaceId: connector.workspaceId,
          })
          await router.invalidate()
        }}
        size={32}
        variant="ghost"
      />
    </li>
  )
}

function GrantedTeamsCard(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const grantableTeams = listGrantableTeams(connector)
  const [firstGrantableTeam] = grantableTeams
  const [teamId, setTeamId] = useState(firstGrantableTeam?.id ?? "")
  const selectedTeamId = teamId.length === 0 ? firstGrantableTeam?.id : teamId
  const selectedTeam =
    selectedTeamId === undefined
      ? undefined
      : grantableTeams.find((team) => team.id === selectedTeamId)

  const grantedTeams = connector.grantedTeamIds.flatMap((grantedTeamId) => {
    const team = getTeamById(connector.workspaceId, grantedTeamId)

    return team === undefined ? [] : [team]
  })

  async function onGrant(): Promise<void> {
    if (selectedTeamId === undefined) {
      return
    }

    grantTeamToConnector({
      connectorId: connector.id,
      teamId: selectedTeamId,
      workspaceId: connector.workspaceId,
    })
    setTeamId("")
    await router.invalidate()
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Other teams</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Grant another team and every agent on it inherits access. There is no per-agent deny.
      </p>
      <Spacer height={16} />

      {grantedTeams.length === 0 ? (
        <p className="text-14 text-text-secondary">No other teams have access yet.</p>
      ) : (
        <Column as="ul" className="gap-y-4">
          {grantedTeams.map((team) => (
            <GrantedTeamRow connector={connector} key={team.id} team={team} />
          ))}
        </Column>
      )}

      {grantableTeams.length > 0 && (
        <>
          <Spacer height={16} />

          <Row className="items-center">
            <Select
              onValueChange={(nextTeamId) => {
                if (nextTeamId !== null) {
                  setTeamId(nextTeamId)
                }
              }}
              value={selectedTeamId}
            >
              <SelectTrigger className="min-w-0 flex-1">
                <SelectValue>{selectedTeam?.name}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {grantableTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Spacer width={8} />

            <Button label="Grant access" onClick={onGrant} size={36} variant="secondary" />
          </Row>
        </>
      )}
    </Column>
  )
}
