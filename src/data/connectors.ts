import { CONNECTOR_APP_CATALOG, type ConnectorAppId } from "#/data/connector-apps"
export { type ConnectorAppId } from "#/data/connector-apps"
import { getTeamById, type Team } from "#/data/teams"

const SCOPE_PAIR_COUNT = 2

export interface Connector {
  appId: ConnectorAppId
  id: string
  label: string
  scopeIds: string[]
  teamId?: string
  workspaceId: number
}

export interface ConnectorApp {
  id: ConnectorAppId
  name: string
  scopes: ConnectorScope[]
}

export interface ConnectorScope {
  description: string
  id: string
  label: string
}

interface BlockedApp {
  appId: ConnectorAppId
  workspaceId: number
}

const GMAIL_SCOPES: ConnectorScope[] = [
  {
    description: "Let agents read messages in this Gmail account.",
    id: "read",
    label: "Read",
  },
  {
    description: "Let agents permanently delete messages.",
    id: "delete",
    label: "Delete",
  },
]

const CONNECTOR_APPS: ConnectorApp[] = CONNECTOR_APP_CATALOG.map((app) => ({
  id: app.id,
  name: app.name,
  scopes: app.id === "gmail" ? GMAIL_SCOPES : [],
}))

const MOCK_BLOCKED_APPS: BlockedApp[] = [{ appId: "github", workspaceId: 2 }]

const MOCK_CONNECTORS: Connector[] = [
  {
    appId: "gmail",
    id: "682b4e5c-07a9-441d-38bf-c57f81a3d4cb",
    label: "Company support",
    scopeIds: ["read"],
    workspaceId: 2,
  },
  {
    appId: "gmail",
    id: "793c5f6d-18ba-452e-49c0-d68f92b4e5dc",
    label: "Company press",
    scopeIds: ["read"],
    workspaceId: 2,
  },
  {
    appId: "gmail",
    id: "8a4d607e-29cb-463f-5ad1-e79fa3c5f6ed",
    label: "Company legal",
    scopeIds: ["read"],
    workspaceId: 2,
  },
  {
    appId: "gmail",
    id: "9b5e718f-3adc-4740-6be2-f8a0b4d607fe",
    label: "Company business",
    scopeIds: ["read"],
    workspaceId: 2,
  },
  {
    appId: "github",
    id: "35f81b29-d476-41ea-058c-924d5e70a198",
    label: "vercel",
    scopeIds: [],
    teamId: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    workspaceId: 2,
  },
  {
    appId: "slack",
    id: "46092c3a-e587-42fb-169d-a35e6f81b2a9",
    label: "Vercel Marketing",
    scopeIds: [],
    teamId: "e7b5a2c6-8f1b-4235-da6e-5b0f2b4c7e55",
    workspaceId: 2,
  },
  {
    appId: "gmail",
    id: "571a3d4b-f698-430c-27ae-b46f7092c3ba",
    label: "Product inbox",
    scopeIds: ["read"],
    teamId: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    workspaceId: 2,
  },
]

export function addConnector(input: {
  appId: ConnectorAppId
  label: string
  scopeIds: string[]
  teamId?: string
  workspaceId: number
}): Connector {
  const app = getConnectorApp(input.appId)

  if (app === undefined) {
    throw new Error("Expected a connector app")
  }

  if (isAppBlocked(input.workspaceId, input.appId)) {
    throw new Error(`${app.name} is blocked in this workspace`)
  }

  if (input.teamId !== undefined && getTeamById(input.workspaceId, input.teamId) === undefined) {
    throw new Error("Expected a team in this workspace")
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
    id: crypto.randomUUID(),
    label,
    scopeIds,
    workspaceId: input.workspaceId,
    ...(input.teamId === undefined ? {} : { teamId: input.teamId }),
  }

  MOCK_CONNECTORS.push(connector)

  return connector
}

export function clearConnectorTeamAccess(input: { teamId: string; workspaceId: number }): void {
  for (const connector of MOCK_CONNECTORS) {
    if (connector.workspaceId === input.workspaceId && connector.teamId === input.teamId) {
      delete connector.teamId
    }
  }
}

export function deleteConnector(input: { connectorId: string; workspaceId: number }): void {
  const index = MOCK_CONNECTORS.findIndex(
    (connector) =>
      connector.workspaceId === input.workspaceId && connector.id === input.connectorId,
  )

  if (index === -1) {
    throw new Error("Expected a connector in this workspace")
  }

  MOCK_CONNECTORS.splice(index, 1)
}

export function formatConnectorAccessLabel(connector: Connector): string {
  const team = getConnectorAccessTeam(connector)

  return team?.name ?? "Everybody"
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

export function getConnectorAccessTeam(connector: Connector): Team | undefined {
  if (connector.teamId === undefined) {
    return undefined
  }

  return getTeamById(connector.workspaceId, connector.teamId)
}

export function getConnectorApp(appId: ConnectorAppId): ConnectorApp | undefined {
  return CONNECTOR_APPS.find((app) => app.id === appId)
}

export function getConnectorById(workspaceId: number, connectorId: string): Connector | undefined {
  return MOCK_CONNECTORS.find(
    (connector) => connector.workspaceId === workspaceId && connector.id === connectorId,
  )
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

export function listConnectorsAvailableForTeam(workspaceId: number, teamId: string): Connector[] {
  return listConnectorsByWorkspaceId(workspaceId)
    .filter((connector) => connector.teamId !== teamId)
    .toSorted((left, right) => left.label.localeCompare(right.label))
}

export function listConnectorsByWorkspaceId(workspaceId: number): Connector[] {
  return MOCK_CONNECTORS.filter((connector) => connector.workspaceId === workspaceId)
}

export function listConnectorsForTeam(workspaceId: number, teamId: string): Connector[] {
  return listConnectorsByWorkspaceId(workspaceId).filter((connector) => connector.teamId === teamId)
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

export function setConnectorAccess(input: {
  connectorId: string
  teamId: string | undefined
  workspaceId: number
}): Connector {
  const connector = requireConnector(input.workspaceId, input.connectorId)

  if (input.teamId === undefined) {
    delete connector.teamId
    return connector
  }

  if (getTeamById(input.workspaceId, input.teamId) === undefined) {
    throw new Error("Expected a team in this workspace")
  }

  connector.teamId = input.teamId

  return connector
}

export function updateConnector(input: {
  connectorId: string
  label: string
  workspaceId: number
}): Connector {
  const connector = requireConnector(input.workspaceId, input.connectorId)
  const label = input.label.trim()

  if (label.length === 0) {
    throw new Error("Expected a connector label")
  }

  connector.label = label

  return connector
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
