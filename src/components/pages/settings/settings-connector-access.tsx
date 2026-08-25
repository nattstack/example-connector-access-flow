import {
  Button,
  Column,
  DialogResponsive,
  DialogResponsivePopup,
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
  Switch,
} from "@nattstack/ui"
import { useNavigate, useParams, useRouter } from "@tanstack/react-router"
import { useState, type FormEvent, type JSX, type ReactNode } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import {
  deleteConnector,
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

interface SettingsRowProps {
  children: ReactNode
  description: string
  htmlFor?: string
  label: string
}

interface SettingsSectionProps {
  children: ReactNode
  title?: string
}

export function SettingsConnectorAccess(props: SettingsConnectorAccessProps): JSX.Element {
  const { connector } = props
  const app = getConnectorApp(connector.appId)
  const hasScopes = app !== undefined && app.scopes.length > 0

  return (
    <Column className="gap-y-32">
      <ConnectorGeneralSection connector={connector} />
      {hasScopes && <ConnectorScopesSection connector={connector} />}
      <ConnectorAccessSection connector={connector} />
      <ConnectorDeleteSection connector={connector} />
    </Column>
  )
}

function ConnectorAccessSection(props: { connector: Connector }): JSX.Element {
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
    <SettingsSection title="Access">
      <SettingsRow
        description={
          accessTeam === undefined
            ? "Everybody in this workspace can use this connector."
            : `Only ${accessTeam.name} can use this connector.`
        }
        label="Who can use this"
      >
        <Select onValueChange={onAccessChange} value={accessValue}>
          <SelectTrigger
            className="
              w-240
              max-768:w-full
            "
            size={36}
          >
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
      </SettingsRow>
    </SettingsSection>
  )
}

function ConnectorDeleteSection(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const navigate = useNavigate()
  const router = useRouter()
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const [confirmation, setConfirmation] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)
  const isDeleteDisabled = confirmation.trim() !== connector.label

  function onOpenChange(nextOpen: boolean): void {
    setIsOpen(nextOpen)

    if (!nextOpen) {
      setConfirmation("")
      setErrorMessage(undefined)
    }
  }

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
      onOpenChange(false)
      await navigate({ params: { workspaceSlug }, to: "/$workspaceSlug/settings/connectors" })
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not delete this connector.")
    }
  }

  return (
    <SettingsSection title="Danger zone">
      <SettingsRow
        description="Permanently remove this connector. Agents lose access immediately. This action can't be undone."
        label="Delete connector"
      >
        <Button
          className="text-error"
          label="Delete connector"
          onClick={() => setIsOpen(true)}
          size={32}
          variant="ghost"
        />
      </SettingsRow>

      <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
        <DialogResponsivePopup className="max-w-[420px]">
          <form onSubmit={onSubmit}>
            <Column>
              <h2 className="text-24 tracking-[-0.02em]">Delete connector</h2>
              <Spacer height={8} />

              <p className="text-14 text-text-secondary">
                Permanently remove this connector. Agents lose access immediately. This action
                can&apos;t be undone.
              </p>
              <Spacer height={24} />

              {Boolean(errorMessage) && (
                <>
                  <p className="text-13 text-error" role="alert">
                    {errorMessage}
                  </p>
                  <Spacer height={16} />
                </>
              )}

              <Label htmlFor={DELETE_INPUT_ID}>Type {connector.label} to confirm</Label>
              <Spacer height={8} />

              <Input
                autoComplete="off"
                autoFocus
                id={DELETE_INPUT_ID}
                onChange={(event) => {
                  setConfirmation(event.target.value)
                  setErrorMessage(undefined)
                }}
                placeholder="Type the label"
                size={36}
                value={confirmation}
              />
              <Spacer height={24} />

              <Row className="justify-end gap-8">
                <Button label="Cancel" onClick={() => onOpenChange(false)} variant="ghost" />
                <Button
                  disabled={isDeleteDisabled}
                  label="Delete connector"
                  type="submit"
                  variant="primary"
                />
              </Row>
            </Column>
          </form>
        </DialogResponsivePopup>
      </DialogResponsive>
    </SettingsSection>
  )
}

function ConnectorGeneralSection(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const blocked = isAppBlocked(connector.workspaceId, connector.appId)
  const app = getConnectorApp(connector.appId)
  const appName = app?.name ?? "Connector"
  const [errorMessage, setErrorMessage] = useState<string>()
  const [label, setLabel] = useState(connector.label)

  async function saveLabel(): Promise<void> {
    const trimmedLabel = label.trim()

    if (trimmedLabel.length === 0) {
      setLabel(connector.label)
      setErrorMessage(undefined)
      return
    }

    if (trimmedLabel === connector.label) {
      setLabel(trimmedLabel)
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
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update this label.")
    }
  }

  return (
    <SettingsSection>
      <SettingsRow
        description={
          blocked
            ? "This app is blocked in the workspace. Agents cannot use it until a workspace admin allows it again."
            : `Connected to ${appName}.`
        }
        label="App"
      >
        <Row className="items-center">
          <AvatarConnector appId={connector.appId} />
          <Spacer width={8} />

          <span className="text-14 font-500">{appName}</span>
        </Row>
      </SettingsRow>
      <SettingsRow
        description="Shown in the connectors list and anywhere this connection appears."
        htmlFor={LABEL_INPUT_ID}
        label="Label"
      >
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            await saveLabel()
          }}
        >
          <Input
            className="
              w-240
              max-768:w-full
            "
            id={LABEL_INPUT_ID}
            maxLength={CONNECTOR_LABEL_MAX_LENGTH}
            onBlur={saveLabel}
            onChange={(event) => {
              setLabel(event.target.value)
              setErrorMessage(undefined)
            }}
            placeholder="Work inbox"
            size={36}
            value={label}
          />
        </form>
      </SettingsRow>
      {Boolean(errorMessage) && (
        <p className="px-20 py-12 text-13 text-error" role="alert">
          {errorMessage}
        </p>
      )}
    </SettingsSection>
  )
}

function ConnectorScopesSection(props: { connector: Connector }): JSX.Element {
  const { connector } = props
  const router = useRouter()
  const app = getConnectorApp(connector.appId)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [scopeIds, setScopeIds] = useState(connector.scopeIds)

  if (app === undefined) {
    return <></>
  }

  async function onScopeChange(scopeId: string, nextChecked: boolean): Promise<void> {
    const nextScopeIds = nextChecked
      ? [...scopeIds, scopeId]
      : scopeIds.filter((currentScopeId) => currentScopeId !== scopeId)

    if (nextScopeIds.length === 0) {
      setErrorMessage("Choose at least one scope.")
      return
    }

    try {
      updateConnector({
        connectorId: connector.id,
        label: connector.label,
        scopeIds: nextScopeIds,
        workspaceId: connector.workspaceId,
      })
      setErrorMessage(undefined)
      setScopeIds(nextScopeIds)
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update these scopes.")
    }
  }

  return (
    <SettingsSection title="Scopes">
      {app.scopes.map((scope) => {
        const inputId = `settings-connector-scope-${scope.id}`

        return (
          <SettingsRow
            description={scope.description}
            htmlFor={inputId}
            key={scope.id}
            label={scope.label}
          >
            <Switch
              checked={scopeIds.includes(scope.id)}
              id={inputId}
              onCheckedChange={async (nextChecked) => {
                if (typeof nextChecked === "boolean") {
                  await onScopeChange(scope.id, nextChecked)
                }
              }}
            />
          </SettingsRow>
        )
      })}
      {Boolean(errorMessage) && (
        <p className="px-20 py-12 text-13 text-error" role="alert">
          {errorMessage}
        </p>
      )}
    </SettingsSection>
  )
}

function SettingsRow(props: SettingsRowProps): JSX.Element {
  const { children, description, htmlFor, label } = props

  return (
    <Row
      className="
        items-center justify-between gap-24 border-b border-border px-20 py-16
        last:border-b-0
      "
    >
      <Column className="min-w-0 flex-1">
        {htmlFor === undefined ? (
          <span className="text-14 font-500">{label}</span>
        ) : (
          <Label className="text-14 font-500" htmlFor={htmlFor}>
            {label}
          </Label>
        )}
        <Spacer height={4} />

        <p className="text-13 text-text-secondary">{description}</p>
      </Column>
      <div className="shrink-0">{children}</div>
    </Row>
  )
}

function SettingsSection(props: SettingsSectionProps): JSX.Element {
  const { children, title } = props

  return (
    <Column as="section">
      {title !== undefined && (
        <>
          <h2 className="text-14 font-500">{title}</h2>
          <Spacer height={8} />
        </>
      )}
      <Column
        className="
          overflow-hidden rounded-16 border border-border bg-bg-shell-inner
          shadow-2
        "
      >
        {children}
      </Column>
    </Column>
  )
}
