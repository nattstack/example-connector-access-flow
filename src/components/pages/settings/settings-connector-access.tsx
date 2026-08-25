import {
  Button,
  Checkbox,
  Column,
  Input,
  Label,
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
import { useNavigate, useParams, useRouter } from "@tanstack/react-router"
import { useState, type FormEvent, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  deleteConnector,
  formatConnectorScopeLabel,
  formatConnectorTitle,
  getConnectorAccessTeam,
  getConnectorApp,
  isAppBlocked,
  setConnectorAccess,
  updateConnector,
  type Connector,
} from "#/data/connectors"
import { listTeamsByWorkspaceId } from "#/data/teams"

const ACCESS_EVERYBODY = "everybody"
const CONNECTOR_LABEL_MAX_LENGTH = 120
const DELETE_INPUT_ID = "settings-connector-delete-confirmation"
const LABEL_INPUT_ID = "settings-connector-label"

interface SettingsConnectorAccessProps {
  connector: Connector
}

export function SettingsConnectorAccess(props: SettingsConnectorAccessProps): JSX.Element {
  const { connector } = props
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)
  const app = getConnectorApp(connector.appId)
  const hasScopes = app !== undefined && app.scopes.length > 0

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

      <ConnectorLabelCard connector={connector} />
      {hasScopes && app !== undefined && <ConnectorScopesCard connector={connector} />}
      <ConnectorAccessCard connector={connector} />
      <ConnectorDeleteCard connector={connector} />
    </Column>
  )
}

function ConnectorAccessCard(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
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
  )
}

function ConnectorDeleteCard(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const navigate = useNavigate()
  const router = useRouter()
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const [confirmation, setConfirmation] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>()
  const isDeleteDisabled = confirmation.trim() !== connector.label

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (isDeleteDisabled) {
      return
    }

    try {
      deleteConnector({
        connectorId: connector.id,
        workspaceId: connector.workspaceId,
      })
      await navigate({ params: { workspaceSlug }, to: "/$workspaceSlug/settings/connectors/" })
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not delete this connector.")
    }
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-error/40 bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24 text-error">Delete connector</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Permanently remove this connector. Agents lose access immediately. This action can&apos;t be
        undone.
      </p>
      <Spacer height={16} />

      {Boolean(errorMessage) && (
        <>
          <p className="text-13 text-error" role="alert">
            {errorMessage}
          </p>
          <Spacer height={16} />
        </>
      )}

      <form className="flex flex-col" onSubmit={onSubmit}>
        <Label htmlFor={DELETE_INPUT_ID}>Type {connector.label} to confirm</Label>
        <Spacer height={4} />

        <Input
          autoComplete="off"
          id={DELETE_INPUT_ID}
          onChange={(event) => {
            setConfirmation(event.target.value)
            setErrorMessage(undefined)
          }}
          placeholder={connector.label}
          size={48}
          value={confirmation}
        />
        <Spacer height={16} />

        <Row className="justify-end">
          <Button
            disabled={isDeleteDisabled}
            label="Delete connector"
            rounded
            type="submit"
            variant="primary"
          />
        </Row>
      </form>
    </Column>
  )
}

function ConnectorLabelCard(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [label, setLabel] = useState(connector.label)
  const [successMessage, setSuccessMessage] = useState<string>()
  const trimmedLabel = label.trim()
  const isSaveDisabled = trimmedLabel.length === 0 || trimmedLabel === connector.label

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    try {
      updateConnector({
        connectorId: connector.id,
        label: trimmedLabel,
        scopeIds: connector.scopeIds,
        workspaceId: connector.workspaceId,
      })
      setLabel(trimmedLabel)
      setErrorMessage(undefined)
      setSuccessMessage("Label updated.")
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update this label.")
    }
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Label</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Shown in the connectors list and anywhere this connection appears.
      </p>
      <Spacer height={16} />

      {Boolean(successMessage) && (
        <>
          <output
            className="
              rounded-8 border border-success/40 bg-success/10 px-12 py-10
              text-14 text-success
            "
          >
            {successMessage}
          </output>
          <Spacer height={16} />
        </>
      )}

      {Boolean(errorMessage) && (
        <>
          <p className="text-13 text-error" role="alert">
            {errorMessage}
          </p>
          <Spacer height={16} />
        </>
      )}

      <form className="flex flex-col" onSubmit={onSubmit}>
        <Label htmlFor={LABEL_INPUT_ID}>Label</Label>
        <Spacer height={4} />

        <Input
          id={LABEL_INPUT_ID}
          maxLength={CONNECTOR_LABEL_MAX_LENGTH}
          onChange={(event) => {
            setLabel(event.target.value)
            setErrorMessage(undefined)
            setSuccessMessage(undefined)
          }}
          placeholder="Work inbox"
          size={48}
          value={label}
        />
        <Spacer height={16} />

        <Row className="justify-end">
          <Button
            disabled={isSaveDisabled}
            label="Save"
            rounded
            type="submit"
            variant="secondary"
          />
        </Row>
      </form>
    </Column>
  )
}

function ConnectorScopesCard(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const app = getConnectorApp(connector.appId)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [scopeIds, setScopeIds] = useState(connector.scopeIds)
  const [successMessage, setSuccessMessage] = useState<string>()
  const isSaveDisabled = scopeIds.length === 0 || sameScopeIds(scopeIds, connector.scopeIds)

  if (app === undefined) {
    return <></>
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    try {
      updateConnector({
        connectorId: connector.id,
        label: connector.label,
        scopeIds,
        workspaceId: connector.workspaceId,
      })
      setErrorMessage(undefined)
      setSuccessMessage("Scopes updated.")
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update these scopes.")
    }
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Scopes</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Choose what this connector can do in {app.name}.
      </p>
      <Spacer height={16} />

      {Boolean(successMessage) && (
        <>
          <output
            className="
              rounded-8 border border-success/40 bg-success/10 px-12 py-10
              text-14 text-success
            "
          >
            {successMessage}
          </output>
          <Spacer height={16} />
        </>
      )}

      {Boolean(errorMessage) && (
        <>
          <p className="text-13 text-error" role="alert">
            {errorMessage}
          </p>
          <Spacer height={16} />
        </>
      )}

      <form className="flex flex-col" onSubmit={onSubmit}>
        <Column className="gap-y-8">
          {app.scopes.map((scope) => {
            const checked = scopeIds.includes(scope.id)
            const inputId = `settings-connector-scope-${scope.id}`

            return (
              <Row className="items-center" key={scope.id}>
                <Checkbox
                  checked={checked}
                  id={inputId}
                  onCheckedChange={(nextChecked) => {
                    setErrorMessage(undefined)
                    setSuccessMessage(undefined)
                    setScopeIds((current) =>
                      nextChecked === true
                        ? [...current, scope.id]
                        : current.filter((scopeId) => scopeId !== scope.id),
                    )
                  }}
                />
                <Spacer width={8} />

                <Label htmlFor={inputId}>{scope.label}</Label>
              </Row>
            )
          })}
        </Column>
        <Spacer height={16} />

        <Row className="justify-end">
          <Button
            disabled={isSaveDisabled}
            label="Save"
            rounded
            type="submit"
            variant="secondary"
          />
        </Row>
      </form>
    </Column>
  )
}

function sameScopeIds(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false
  }

  const rightIds = new Set(right)

  return left.every((scopeId) => rightIds.has(scopeId))
}
