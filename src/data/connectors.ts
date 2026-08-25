import { getAgentById, listUnteamedAgentsByWorkspaceId, type Agent } from "#/data/agents"
import { CONNECTOR_APP_CATALOG, type ConnectorAppId } from "#/data/connector-apps"
export { type ConnectorAppId } from "#/data/connector-apps"
import { getTeamById, listTeamsByWorkspaceId, type Team } from "#/data/teams"

const SCOPE_PAIR_COUNT = 2

export interface Connector {
  appId: ConnectorAppId
  grantedAgentIds: string[]
  grantedTeamIds: string[]
  id: string
  label: string
  ownerTeamId: string
  scopeIds: string[]
  workspaceId: number
}

export interface ConnectorApp {
  id: ConnectorAppId
  name: string
  scopes: ConnectorScope[]
}

export interface ConnectorScope {
  id: string
  label: string
}

interface BlockedApp {
  appId: ConnectorAppId
  workspaceId: number
}

const GMAIL_SCOPES: ConnectorScope[] = [
  { id: "read", label: "Read" },
  { id: "delete", label: "Delete" },
]

const CONNECTOR_APPS: ConnectorApp[] = CONNECTOR_APP_CATALOG.map((app) => ({
  id: app.id,
  name: app.name,
  scopes: app.id === "gmail" ? GMAIL_SCOPES : [],
}))

const MOCK_BLOCKED_APPS: BlockedApp[] = [
  { appId: "slack", workspaceId: 2 },
  { appId: "github", workspaceId: 4 },
]

const MOCK_CONNECTORS: Connector[] = [
  {
    appId: "gmail",
    grantedAgentIds: ["1fff8a3f-f8a2-4033-a086-9cc2cbf8b9fc"],
    grantedTeamIds: [],
    id: "c8e1a4b2-6d0f-4a73-9e15-2b7c8d0f3a21",
    label: "Inbox",
    ownerTeamId: "a3f1c8e2-4b7d-4e91-9c2a-1f6b8d0e3a11",
    scopeIds: ["read"],
    workspaceId: 1,
  },
  {
    appId: "gmail",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "d9f2b5c3-7e10-4b84-af26-3c8d9e1a4b32",
    label: "Cleanup",
    ownerTeamId: "a3f1c8e2-4b7d-4e91-9c2a-1f6b8d0e3a11",
    scopeIds: ["read", "delete"],
    workspaceId: 1,
  },
  {
    appId: "slack",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "e0a3c6d4-8f21-4c95-b037-4d9e0f2b5c43",
    label: "Figma Design",
    ownerTeamId: "7955dd9a-c8f4-4faf-9103-a054ed33789e",
    scopeIds: [],
    workspaceId: 1,
  },
  {
    appId: "github",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "f1b4d7e5-9032-4da6-c148-5e0f1a3c6d54",
    label: "nattstack",
    ownerTeamId: "b4e2d9f3-5c8e-4f02-ad3b-2e7c9e1f4b22",
    scopeIds: [],
    workspaceId: 2,
  },
  {
    appId: "slack",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "02c5e8f6-a143-4eb7-d259-6f1a2b4d7e65",
    label: "Linear Product",
    ownerTeamId: "a9361bc3-4c13-4ad2-a242-c861b085560d",
    scopeIds: [],
    workspaceId: 2,
  },
  {
    appId: "gmail",
    grantedAgentIds: [],
    grantedTeamIds: ["c5f3e0a4-6d9f-4013-be4c-3f8d0f2a5c33"],
    id: "13d6f907-b254-4fc8-e36a-702b3c5e8f76",
    label: "Ops inbox",
    ownerTeamId: "cac5d6b9-444d-4f69-973a-04a0fd2781df",
    scopeIds: ["read"],
    workspaceId: 3,
  },
  {
    appId: "slack",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "24e70a18-c365-40d9-f47b-813c4d6f9087",
    label: "Notion Design",
    ownerTeamId: "c5f3e0a4-6d9f-4013-be4c-3f8d0f2a5c33",
    scopeIds: [],
    workspaceId: 3,
  },
  {
    appId: "github",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "35f81b29-d476-41ea-058c-924d5e70a198",
    label: "vercel",
    ownerTeamId: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    scopeIds: [],
    workspaceId: 4,
  },
  {
    appId: "slack",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "46092c3a-e587-42fb-169d-a35e6f81b2a9",
    label: "Vercel Marketing",
    ownerTeamId: "e7b5a2c6-8f1b-4235-da6e-5b0f2b4c7e55",
    scopeIds: [],
    workspaceId: 4,
  },
  {
    appId: "gmail",
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: "571a3d4b-f698-430c-27ae-b46f7092c3ba",
    label: "Product inbox",
    ownerTeamId: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    scopeIds: ["read"],
    workspaceId: 4,
  },
]

export function addConnector(input: {
  appId: ConnectorAppId
  label: string
  ownerTeamId: string
  scopeIds: string[]
  workspaceId: number
}): Connector {
  const app = getConnectorApp(input.appId)

  if (app === undefined) {
    throw new Error("Expected a connector app")
  }

  if (isAppBlocked(input.workspaceId, input.appId)) {
    throw new Error(`${app.name} is blocked in this workspace`)
  }

  const ownerTeam = getTeamById(input.workspaceId, input.ownerTeamId)

  if (ownerTeam === undefined) {
    throw new Error("Expected an owner team in this workspace")
  }

  const scopeIds = uniqueScopeIds(app, input.scopeIds)

  if (app.scopes.length > 0 && scopeIds.length === 0) {
    throw new Error(`Select at least one ${app.name} scope`)
  }

  const label = input.label.trim()

  if (label.length === 0) {
    throw new Error("Expected a connector label")
  }

  const connector: Connector = {
    appId: input.appId,
    grantedAgentIds: [],
    grantedTeamIds: [],
    id: crypto.randomUUID(),
    label,
    ownerTeamId: input.ownerTeamId,
    scopeIds,
    workspaceId: input.workspaceId,
  }

  MOCK_CONNECTORS.push(connector)

  return connector
}

export function formatConnectorGrantSummary(connector: Connector): string {
  const ownerTeam = getTeamById(connector.workspaceId, connector.ownerTeamId)
  const extraTeamCount = connector.grantedTeamIds.length
  const extraAgentCount = connector.grantedAgentIds.length
  const parts = [ownerTeam?.name ?? "Unknown team"]

  if (extraTeamCount > 0) {
    parts.push(extraTeamCount === 1 ? "+1 team" : `+${String(extraTeamCount)} teams`)
  }

  if (extraAgentCount > 0) {
    parts.push(extraAgentCount === 1 ? "1 agent" : `${String(extraAgentCount)} agents`)
  }

  return parts.join(" · ")
}

export function formatConnectorScopeCount(connector: Connector): string | undefined {
  const app = getConnectorApp(connector.appId)

  if (app === undefined || app.scopes.length === 0) {
    return undefined
  }

  const grantedCount = connector.scopeIds.filter((scopeId) =>
    app.scopes.some((scope) => scope.id === scopeId),
  ).length

  return `${String(grantedCount)}/${String(app.scopes.length)}`
}

export function formatConnectorScopeLabel(connector: Connector): string {
  const app = getConnectorApp(connector.appId)

  if (app === undefined || app.scopes.length === 0) {
    return "Connected"
  }

  const labels = connector.scopeIds.flatMap((scopeId) => {
    const scope = app.scopes.find((item) => item.id === scopeId)

    return scope === undefined ? [] : [scope.label]
  })

  if (labels.length === 0) {
    return "Connected"
  }

  if (labels.length === 1) {
    return labels[0] ?? "Connected"
  }

  const lastLabel = labels.at(-1)

  if (labels.length === SCOPE_PAIR_COUNT) {
    return `${labels[0] ?? ""} and ${lastLabel ?? ""}`
  }

  return `${labels.slice(0, -1).join(", ")}, and ${lastLabel ?? ""}`
}

export function formatConnectorTitle(connector: Connector): string {
  const app = getConnectorApp(connector.appId)
  const name = app?.name ?? "Connector"
  const scopeLabel = formatConnectorScopeLabel(connector)

  if (app !== undefined && app.scopes.length === 0) {
    return name
  }

  return `${name} · ${scopeLabel}`
}

export function getConnectorApp(appId: ConnectorAppId): ConnectorApp | undefined {
  return CONNECTOR_APPS.find((app) => app.id === appId)
}

export function getConnectorById(workspaceId: number, connectorId: string): Connector | undefined {
  return MOCK_CONNECTORS.find(
    (connector) => connector.workspaceId === workspaceId && connector.id === connectorId,
  )
}

export function grantAgentToConnector(input: {
  agentId: string
  connectorId: string
  workspaceId: number
}): Connector {
  const connector = requireConnector(input.workspaceId, input.connectorId)
  const agent = getAgentById(input.workspaceId, input.agentId)

  if (agent === undefined) {
    throw new Error("Expected an agent in this workspace")
  }

  if (agent.team !== undefined) {
    throw new Error("Grant individual access only to agents that are not on a team")
  }

  if (!connector.grantedAgentIds.includes(input.agentId)) {
    connector.grantedAgentIds.push(input.agentId)
  }

  return connector
}

export function grantTeamToConnector(input: {
  connectorId: string
  teamId: string
  workspaceId: number
}): Connector {
  const connector = requireConnector(input.workspaceId, input.connectorId)
  const team = getTeamById(input.workspaceId, input.teamId)

  if (team === undefined) {
    throw new Error("Expected a team in this workspace")
  }

  if (team.id === connector.ownerTeamId) {
    throw new Error("The owner team already has access")
  }

  if (!connector.grantedTeamIds.includes(input.teamId)) {
    connector.grantedTeamIds.push(input.teamId)
  }

  return connector
}

export function isAppBlocked(workspaceId: number, appId: ConnectorAppId): boolean {
  return MOCK_BLOCKED_APPS.some((item) => item.workspaceId === workspaceId && item.appId === appId)
}

export function listAvailableConnectorApps(workspaceId: number): ConnectorApp[] {
  return listConnectorApps().filter((app) => !isAppBlocked(workspaceId, app.id))
}

export function listBlockedConnectorApps(workspaceId: number): ConnectorApp[] {
  return listConnectorApps().filter((app) => isAppBlocked(workspaceId, app.id))
}

export function listConnectorApps(): ConnectorApp[] {
  return CONNECTOR_APPS
}

export function listConnectorsByWorkspaceId(workspaceId: number): Connector[] {
  return MOCK_CONNECTORS.filter((connector) => connector.workspaceId === workspaceId)
}

export function listConnectorsForAgent(workspaceId: number, agent: Agent): Connector[] {
  return listConnectorsByWorkspaceId(workspaceId).filter((connector) =>
    agentCanUseConnector(agent, connector),
  )
}

export function listConnectorsForTeam(workspaceId: number, teamId: string): Connector[] {
  return listConnectorsByWorkspaceId(workspaceId).filter(
    (connector) => connector.ownerTeamId === teamId || connector.grantedTeamIds.includes(teamId),
  )
}

export function listGrantableAgents(connector: Connector): Agent[] {
  return listUnteamedAgentsByWorkspaceId(connector.workspaceId).filter(
    (agent) => !connector.grantedAgentIds.includes(agent.id),
  )
}

export function listGrantableTeams(connector: Connector): Team[] {
  return listTeamsByWorkspaceId(connector.workspaceId).filter(
    (team) => team.id !== connector.ownerTeamId && !connector.grantedTeamIds.includes(team.id),
  )
}

export function revokeAgentFromConnector(input: {
  agentId: string
  connectorId: string
  workspaceId: number
}): Connector {
  const connector = requireConnector(input.workspaceId, input.connectorId)

  connector.grantedAgentIds = connector.grantedAgentIds.filter(
    (agentId) => agentId !== input.agentId,
  )

  return connector
}

export function revokeTeamFromConnector(input: {
  connectorId: string
  teamId: string
  workspaceId: number
}): Connector {
  const connector = requireConnector(input.workspaceId, input.connectorId)

  connector.grantedTeamIds = connector.grantedTeamIds.filter((teamId) => teamId !== input.teamId)

  return connector
}

export function setAppBlocked(workspaceId: number, appId: ConnectorAppId, blocked: boolean): void {
  const existingIndex = MOCK_BLOCKED_APPS.findIndex(
    (item) => item.workspaceId === workspaceId && item.appId === appId,
  )

  if (blocked && existingIndex === -1) {
    MOCK_BLOCKED_APPS.push({ appId, workspaceId })
    return
  }

  if (!blocked && existingIndex !== -1) {
    MOCK_BLOCKED_APPS.splice(existingIndex, 1)
  }
}

function agentCanUseConnector(agent: Agent, connector: Connector): boolean {
  if (isAppBlocked(connector.workspaceId, connector.appId)) {
    return false
  }

  if (connector.grantedAgentIds.includes(agent.id)) {
    return true
  }

  if (agent.team === undefined) {
    return false
  }

  const ownerTeam = getTeamById(connector.workspaceId, connector.ownerTeamId)

  if (ownerTeam !== undefined && agent.team === ownerTeam.name) {
    return true
  }

  return connector.grantedTeamIds.some((teamId) => {
    const team = getTeamById(connector.workspaceId, teamId)

    return team !== undefined && agent.team === team.name
  })
}

function requireConnector(workspaceId: number, connectorId: string): Connector {
  const connector = getConnectorById(workspaceId, connectorId)

  if (connector === undefined) {
    throw new Error("Expected a connector in this workspace")
  }

  return connector
}

function uniqueScopeIds(app: ConnectorApp, scopeIds: string[]): string[] {
  const allowed = new Set(app.scopes.map((scope) => scope.id))

  return [...new Set(scopeIds)].filter((scopeId) => allowed.has(scopeId))
}
