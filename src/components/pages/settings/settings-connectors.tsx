import { IconChevronDownOutline18, IconMagnifierOutline18 } from "@nattstack/icons"
import {
  Button,
  Column,
  Input,
  Row,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
} from "@nattstack/ui"
import { Link, useParams, useRouter } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { BadgeTeam } from "#/components/badge-team"
import { DialogAddConnector } from "#/components/pages/settings/dialog-add-connector"
import {
  addConnector,
  formatConnectorAccessLabel,
  formatConnectorScopeCount,
  formatConnectorTitle,
  getConnectorAccessTeam,
  getConnectorApp,
  isAppBlocked,
  listConnectorApps,
  type Connector,
  type ConnectorAppId,
} from "#/data/connectors"
import type { Team } from "#/data/teams"

type AppFilter = "All" | ConnectorAppId

interface SettingsConnectorRowProps {
  connector: Connector
}

interface SettingsConnectorsProps {
  connectors: Connector[]
  teams: Team[]
  workspaceId: number
}

type SortDirection = "asc" | "desc"

export function SettingsConnectors(props: SettingsConnectorsProps): JSX.Element {
  const { connectors, teams, workspaceId } = props
  const router = useRouter()

  const [appFilter, setAppFilter] = useState<AppFilter>("All")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filterApps = useMemo(() => {
    const appIds = new Set(connectors.map((connector) => connector.appId))

    return listConnectorApps().filter((app) => appIds.has(app.id))
  }, [connectors])

  const visibleConnectors = useMemo(() => {
    const query = search.trim().toLowerCase()

    return connectors
      .filter((connector) => {
        if (appFilter !== "All" && connector.appId !== appFilter) {
          return false
        }

        if (query.length === 0) {
          return true
        }

        const app = getConnectorApp(connector.appId)
        const title = formatConnectorTitle(connector).toLowerCase()
        const accessLabel = formatConnectorAccessLabel(connector).toLowerCase()

        return (
          title.includes(query) ||
          connector.label.toLowerCase().includes(query) ||
          (app?.name.toLowerCase().includes(query) ?? false) ||
          accessLabel.includes(query)
        )
      })
      .toSorted((left, right) => {
        const typeResult = connectorTypeName(left).localeCompare(connectorTypeName(right))

        if (typeResult !== 0) {
          return sortDirection === "asc" ? typeResult : -typeResult
        }

        return left.label.localeCompare(right.label)
      })
  }, [appFilter, connectors, search, sortDirection])

  return (
    <Column as="section">
      <Row className="items-center" flexWrap="wrap" gap={8}>
        <Row className="min-w-0 flex-1 items-center" gap={8}>
          <div className="relative min-w-0 flex-1">
            <IconMagnifierOutline18
              className="
                pointer-events-none absolute top-1/2 left-12 -translate-y-1/2
                text-gray-9
              "
            />
            <Input
              aria-label="Search connectors"
              className="w-full pl-36"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by app, label, or team"
              size={36}
              value={search}
            />
          </div>
          <Select
            onValueChange={(nextFilter) => {
              if (nextFilter !== null) {
                setAppFilter(nextFilter)
              }
            }}
            value={appFilter}
          >
            <SelectTrigger className="w-auto shrink-0" size={36}>
              <SelectValue>{appFilterLabel(appFilter)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {filterApps.map((app) => (
                <SelectItem key={app.id} value={app.id}>
                  {app.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Row>
        <Button
          label="Add a connector"
          onClick={() => setIsAddOpen(true)}
          size={36}
          variant="primary"
        />
      </Row>
      <Spacer height={24} />

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th
              aria-sort={sortDirection === "asc" ? "ascending" : "descending"}
              className="w-[40%] py-12 text-left"
            >
              <button
                aria-label={
                  sortDirection === "asc"
                    ? "Sort by connector type descending"
                    : "Sort by connector type ascending"
                }
                className="
                  inline-flex cursor-pointer items-center border-0
                  bg-transparent p-0 text-12 font-500 text-text-secondary
                "
                onClick={() =>
                  setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"))
                }
                type="button"
              >
                Connector
                <Spacer width={4} />
                <IconChevronDownOutline18
                  className={sortDirection === "desc" ? "rotate-180" : undefined}
                  size={12}
                  strokeWidth={2}
                />
              </button>
            </th>
            <th
              className="
                w-[28%] py-12 text-left text-12 font-500 text-text-secondary
              "
            >
              Scopes
            </th>
            <th
              className="
                w-[32%] py-12 text-left text-12 font-500 text-text-secondary
              "
            >
              Access
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleConnectors.length === 0 ? (
            <tr>
              <td className="py-24 text-14 text-text-secondary" colSpan={3}>
                {connectors.length === 0
                  ? "No connectors in this workspace yet."
                  : "No connectors match your search."}
              </td>
            </tr>
          ) : (
            visibleConnectors.map((connector) => (
              <SettingsConnectorRow connector={connector} key={connector.id} />
            ))
          )}
        </tbody>
      </table>

      <DialogAddConnector
        isOpen={isAddOpen}
        onAdd={async (input) => {
          addConnector({
            ...input,
            workspaceId,
          })
          await router.invalidate()
        }}
        onIsOpenChange={setIsAddOpen}
        teams={teams}
        workspaceId={workspaceId}
      />
    </Column>
  )
}

function appFilterLabel(filter: AppFilter): string {
  if (filter === "All") {
    return "All"
  }

  return getConnectorApp(filter)?.name ?? filter
}

function connectorTypeName(connector: Connector): string {
  return getConnectorApp(connector.appId)?.name ?? connector.appId
}

function SettingsConnectorAccessBadge(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const accessTeam = getConnectorAccessTeam(connector)

  if (accessTeam !== undefined) {
    return <BadgeTeam team={accessTeam.name} />
  }

  return (
    <span
      className="
        flex h-[18px] shrink-0 items-center rounded-4 bg-gray-4 px-4 text-12
        text-text-secondary
      "
    >
      Everybody
    </span>
  )
}

function SettingsConnectorRow(props: SettingsConnectorRowProps): JSX.Element {
  const { connector } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)

  return (
    <tr
      className="
        border-b border-border
        last:border-b-0
        hover:bg-gray-3
      "
    >
      <td className="py-12">
        <Link
          className="flex min-w-0 items-center rounded-8 select-none"
          params={{ connectorId: connector.id, workspaceSlug }}
          to="/$workspaceSlug/settings/connectors/$connectorId"
        >
          <AvatarConnector appId={connector.appId} />
          <Spacer width={12} />

          <span className="truncate text-14 font-500 text-text-primary">{connector.label}</span>
        </Link>
      </td>
      <td className="truncate py-12 text-14 text-text-secondary">
        {formatConnectorScopeCount(connector)}
      </td>
      <td className="py-12">
        <Row className="min-w-0 flex-wrap items-center" gap={8}>
          <SettingsConnectorAccessBadge connector={connector} />
          {blocked && (
            <span
              className="
                flex h-[18px] shrink-0 items-center rounded-4 bg-gray-4 px-4
                text-12 text-text-secondary
              "
            >
              Blocked
            </span>
          )}
        </Row>
      </td>
    </tr>
  )
}
