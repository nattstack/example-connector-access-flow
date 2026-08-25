import { IconChevronRightOutline18 } from "@nattstack/icons"
import { Button, Column, Row, Spacer } from "@nattstack/ui"
import { Link, useParams, useRouter } from "@tanstack/react-router"
import { useState, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { DialogAddConnector } from "#/components/pages/settings/dialog-add-connector"
import {
  addConnector,
  formatConnectorGrantSummary,
  formatConnectorScopeLabel,
  formatConnectorTitle,
  isAppBlocked,
  type Connector,
} from "#/data/connectors"
import type { Team } from "#/data/teams"

interface SettingsConnectorRowProps {
  connector: Connector
}

interface SettingsConnectorsProps {
  connectors: Connector[]
  teams: Team[]
  workspaceId: number
}

export function SettingsConnectors(props: SettingsConnectorsProps): JSX.Element {
  const { connectors, teams, workspaceId } = props
  const router = useRouter()
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <Column as="section">
      <Row className="items-start justify-between">
        <Column className="min-w-0">
          <h2 className="text-24">Connections</h2>
          <Spacer height={8} />

          <p className="text-14 text-text-secondary">
            Team-owned apps that agents can use in chat. Multiple connections of the same app can
            have different scopes.
          </p>
        </Column>
        <Spacer width={16} />

        <Button
          disabled={teams.length === 0}
          label="Add a connector"
          onClick={() => setIsAddOpen(true)}
          size={36}
          variant="primary"
        />
      </Row>
      <Spacer height={16} />

      <Column
        className="
          rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
        "
      >
        {connectors.length === 0 ? (
          <p className="text-14 text-text-secondary">No connectors in this workspace yet.</p>
        ) : (
          <Column as="ul" className="gap-y-4">
            {connectors.map((connector) => (
              <SettingsConnectorRow connector={connector} key={connector.id} />
            ))}
          </Column>
        )}
      </Column>

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

function SettingsConnectorRow(props: SettingsConnectorRowProps): JSX.Element {
  const { connector } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)

  return (
    <li>
      <Link
        className="
          flex min-h-56 w-full items-center rounded-12 px-12 select-none
          hover:bg-gray-3
        "
        params={{ connectorId: connector.id, workspaceSlug }}
        to="/$workspaceSlug/settings/connectors/$connectorId"
      >
        <AvatarConnector appId={connector.appId} />
        <Spacer width={12} />

        <Column className="min-w-0 flex-1">
          <Row className="min-w-0 items-center">
            <span className="truncate text-14 font-500 text-text-primary">
              {formatConnectorTitle(connector)}
            </span>
            {blocked && (
              <>
                <Spacer width={8} />

                <span
                  className="
                    inline-flex h-24 shrink-0 items-center rounded-6 bg-gray-4
                    px-8 text-12 font-500 text-text-secondary
                  "
                >
                  Blocked
                </span>
              </>
            )}
          </Row>
          <span className="truncate text-13 text-text-secondary">
            {connector.label}
            {" · "}
            {formatConnectorScopeLabel(connector)}
            {" · "}
            {formatConnectorGrantSummary(connector)}
          </span>
        </Column>
        <Spacer width={8} />

        <IconChevronRightOutline18 className="shrink-0 text-gray-9" />
      </Link>
    </li>
  )
}
