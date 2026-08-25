import {
  Button,
  Checkbox,
  Column,
  DialogResponsive,
  DialogResponsivePopup,
  Input,
  Label,
  Row,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
} from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { getConnectorApp, listAvailableConnectorApps, type ConnectorAppId } from "#/data/connectors"
import type { Team } from "#/data/teams"
import { getCurrentUser } from "#/data/user"

interface DialogAddConnectorProps {
  isOpen: boolean
  onAdd: (input: {
    appId: ConnectorAppId
    label: string
    ownerTeamId: string
    scopeIds: string[]
  }) => Promise<void> | void
  onIsOpenChange: (isOpen: boolean) => void
  teams: Team[]
  workspaceId: number
}

const LABEL_INPUT_ID = "settings-add-connector-label"

export function DialogAddConnector(props: DialogAddConnectorProps): JSX.Element {
  const { isOpen, onAdd, onIsOpenChange, teams, workspaceId } = props
  const apps = listAvailableConnectorApps(workspaceId)
  const [firstApp] = apps
  const [firstTeam] = teams

  const [appId, setAppId] = useState<ConnectorAppId | undefined>(firstApp?.id)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [label, setLabel] = useState(defaultLabelForApp(firstApp?.id))
  const [ownerTeamId, setOwnerTeamId] = useState(firstTeam?.id ?? "")
  const [scopeIds, setScopeIds] = useState<string[]>(defaultScopeIds(firstApp?.id))

  const selectedApp = appId === undefined ? undefined : getConnectorApp(appId)
  const selectedOwnerTeam = teams.find((team) => team.id === ownerTeamId)
  const hasScopes = selectedApp !== undefined && selectedApp.scopes.length > 0
  const isSubmitDisabled =
    appId === undefined ||
    ownerTeamId.length === 0 ||
    label.trim().length === 0 ||
    (hasScopes && scopeIds.length === 0)

  function onOpenChange(nextOpen: boolean): void {
    onIsOpenChange(nextOpen)

    if (!nextOpen) {
      const [nextApp] = listAvailableConnectorApps(workspaceId)
      const [nextTeam] = teams

      setAppId(nextApp?.id)
      setErrorMessage(undefined)
      setLabel(defaultLabelForApp(nextApp?.id))
      setOwnerTeamId(nextTeam?.id ?? "")
      setScopeIds(defaultScopeIds(nextApp?.id))
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (appId === undefined || isSubmitDisabled) {
      return
    }

    try {
      await onAdd({
        appId,
        label: label.trim(),
        ownerTeamId,
        scopeIds,
      })
      onOpenChange(false)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not add this connector.")
    }
  }

  return (
    <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <form onSubmit={onSubmit}>
          <Column>
            <h2 className="text-24 tracking-[-0.02em]">Add a connector</h2>
            <Spacer height={8} />

            <p className="text-14 text-text-secondary">
              Connect an app and give a team of agents access to it.
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

            {apps.length === 0 ? (
              <p className="text-14 text-text-secondary">
                Every connector app is blocked in this workspace.
              </p>
            ) : (
              <>
                <Label>App</Label>
                <Spacer height={8} />

                <Select
                  onValueChange={(nextAppId) => {
                    if (nextAppId === null) {
                      return
                    }

                    setAppId(nextAppId)
                    setErrorMessage(undefined)
                    setLabel(defaultLabelForApp(nextAppId))
                    setScopeIds(defaultScopeIds(nextAppId))
                  }}
                  value={appId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{selectedApp?.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {apps.map((app) => (
                      <SelectItem key={app.id} value={app.id}>
                        <Row className="items-center">
                          <AvatarConnector appId={app.id} size={18} />
                          <Spacer width={8} />

                          <span>{app.name}</span>
                        </Row>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Spacer height={16} />

                {hasScopes && selectedApp !== undefined && (
                  <>
                    <Label>Scopes</Label>
                    <Spacer height={8} />

                    <Column className="gap-y-8">
                      {selectedApp.scopes.map((scope) => {
                        const checked = scopeIds.includes(scope.id)
                        const inputId = `settings-add-connector-scope-${scope.id}`

                        return (
                          <Row className="items-center" key={scope.id}>
                            <Checkbox
                              checked={checked}
                              id={inputId}
                              onCheckedChange={(nextChecked) => {
                                setErrorMessage(undefined)
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
                  </>
                )}

                <Label>Owner team</Label>
                <Spacer height={8} />

                <Select
                  onValueChange={(nextTeamId) => {
                    if (nextTeamId !== null) {
                      setOwnerTeamId(nextTeamId)
                      setErrorMessage(undefined)
                    }
                  }}
                  value={ownerTeamId.length === 0 ? undefined : ownerTeamId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{selectedOwnerTeam?.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Spacer height={16} />

                <Label htmlFor={LABEL_INPUT_ID}>Account</Label>
                <Spacer height={8} />

                <Input
                  id={LABEL_INPUT_ID}
                  onChange={(event) => {
                    setLabel(event.target.value)
                    setErrorMessage(undefined)
                  }}
                  placeholder="Account or workspace name"
                  value={label}
                />
              </>
            )}
            <Spacer height={24} />

            <Row className="justify-end gap-8">
              <Button label="Cancel" onClick={() => onOpenChange(false)} variant="ghost" />
              <Button
                disabled={isSubmitDisabled}
                label="Add a connector"
                type="submit"
                variant="primary"
              />
            </Row>
          </Column>
        </form>
      </DialogResponsivePopup>
    </DialogResponsive>
  )
}

function defaultLabelForApp(appId: ConnectorAppId | undefined): string {
  if (appId === "gmail") {
    return getCurrentUser().email
  }

  if (appId === "github") {
    return "nattstack"
  }

  if (appId === "slack") {
    return "Workspace"
  }

  return ""
}

function defaultScopeIds(appId: ConnectorAppId | undefined): string[] {
  const app = appId === undefined ? undefined : getConnectorApp(appId)
  const firstScope = app?.scopes[0]

  return firstScope === undefined ? [] : [firstScope.id]
}
