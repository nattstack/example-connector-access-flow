import { IconChevronExpandYOutline18 } from "@nattstack/icons"
import {
  Button,
  Checkbox,
  Column,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
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
} from "@nattstack/ui"
import { useMemo, useState, type FormEvent, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { getConnectorApp, listAvailableConnectorApps, type ConnectorAppId } from "#/data/connectors"
import type { Team } from "#/data/teams"

interface AppOption {
  label: string
  value: ConnectorAppId
}

interface DialogAddConnectorProps {
  isOpen: boolean
  onAdd: (input: {
    appId: ConnectorAppId
    label: string
    scopeIds: string[]
    teamId?: string
  }) => Promise<void> | void
  onIsOpenChange: (isOpen: boolean) => void
  teams: Team[]
  workspaceId: number
}

const ACCESS_EVERYBODY = "everybody"
const LABEL_INPUT_ID = "settings-add-connector-label"

export function DialogAddConnector(props: DialogAddConnectorProps): JSX.Element {
  const { isOpen, onAdd, onIsOpenChange, teams, workspaceId } = props
  const apps = listAvailableConnectorApps(workspaceId)
  const defaultApp = apps.find((app) => app.id === "gmail") ?? apps[0]
  const [access, setAccess] = useState(ACCESS_EVERYBODY)
  const [appId, setAppId] = useState<ConnectorAppId | undefined>(defaultApp?.id)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isAppComboboxOpen, setIsAppComboboxOpen] = useState(false)
  const [label, setLabel] = useState("")
  const [scopeIds, setScopeIds] = useState<string[]>(defaultScopeIds(defaultApp?.id))
  const appItems: AppOption[] = useMemo(
    () =>
      apps.map((app) => ({
        label: app.name,
        value: app.id,
      })),
    [apps],
  )
  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedAppItem = appItems.find((item) => item.value === appId) ?? null

  const selectedApp = appId === undefined ? undefined : getConnectorApp(appId)
  const selectedAccessTeam = teams.find((team) => team.id === access)
  const hasScopes = selectedApp !== undefined && selectedApp.scopes.length > 0
  const isSubmitDisabled =
    appId === undefined || label.trim().length === 0 || (hasScopes && scopeIds.length === 0)

  function onOpenChange(nextOpen: boolean): void {
    onIsOpenChange(nextOpen)

    if (!nextOpen) {
      const nextApps = listAvailableConnectorApps(workspaceId)
      const nextApp = nextApps.find((app) => app.id === "gmail") ?? nextApps[0]

      setAccess(ACCESS_EVERYBODY)
      setAppId(nextApp?.id)
      setErrorMessage(undefined)
      setIsAppComboboxOpen(false)
      setLabel("")
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
        scopeIds,
        teamId: access === ACCESS_EVERYBODY ? undefined : access,
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
              Connect an app, choose scopes, and decide who can use it. Scopes cannot be changed
              later.
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

                <Combobox<AppOption>
                  items={appItems}
                  onOpenChange={setIsAppComboboxOpen}
                  onValueChange={(nextApp) => {
                    if (nextApp === null) {
                      return
                    }

                    setAppId(nextApp.value)
                    setErrorMessage(undefined)
                    setIsAppComboboxOpen(false)
                    setScopeIds(defaultScopeIds(nextApp.value))
                  }}
                  open={isAppComboboxOpen}
                  value={selectedAppItem}
                >
                  <ComboboxTrigger
                    className="
                      w-full
                      **:data-[component=combobox-icon]:hidden
                    "
                  >
                    <ComboboxValue className="flex min-w-0 flex-1" placeholder="Search an app">
                      {(item: AppOption) => (
                        <Row className="min-w-0 items-center">
                          <AvatarConnector appId={item.value} size={18} />
                          <Spacer width={8} />

                          <span className="truncate">{item.label}</span>
                        </Row>
                      )}
                    </ComboboxValue>
                    <IconChevronExpandYOutline18 className="shrink-0 text-gray-9" />
                  </ComboboxTrigger>
                  <ComboboxContent>
                    <ComboboxSearch placeholder="Search apps" />
                    <ComboboxEmpty>No apps found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: AppOption) => (
                        <ComboboxItem key={item.value} value={item}>
                          <Row className="items-center">
                            <AvatarConnector appId={item.value} size={18} />
                            <Spacer width={8} />

                            <span className="truncate">{item.label}</span>
                          </Row>
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <Spacer height={16} />

                {hasScopes && selectedApp !== undefined && (
                  <>
                    <Label>Scopes</Label>
                    <Spacer height={8} />

                    <p className="text-13 text-text-secondary">
                      These cannot be changed after the connector is created.
                    </p>
                    <Spacer height={8} />

                    <Column className="gap-y-8">
                      {selectedApp.scopes.map((scope) => {
                        const checked = scopeIds.includes(scope.id)
                        const inputId = `settings-add-connector-scope-${scope.id}`

                        return (
                          <Row className="items-start" key={scope.id}>
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

                            <Column className="min-w-0">
                              <Label htmlFor={inputId}>{scope.label}</Label>
                              <Spacer height={4} />

                              <p className="text-13 text-text-secondary">{scope.description}</p>
                            </Column>
                          </Row>
                        )
                      })}
                    </Column>
                    <Spacer height={16} />
                  </>
                )}

                <Label>Access</Label>
                <Spacer height={8} />

                <Select
                  onValueChange={(nextAccess) => {
                    if (nextAccess !== null) {
                      setAccess(nextAccess)
                      setErrorMessage(undefined)
                    }
                  }}
                  value={access}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{selectedAccessTeam?.name ?? "Everybody"}</SelectValue>
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
                <Spacer height={16} />

                <Label htmlFor={LABEL_INPUT_ID}>Label</Label>
                <Spacer height={8} />

                <Input
                  id={LABEL_INPUT_ID}
                  onChange={(event) => {
                    setLabel(event.target.value)
                    setErrorMessage(undefined)
                  }}
                  placeholder="Work inbox"
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

function defaultScopeIds(appId: ConnectorAppId | undefined): string[] {
  const app = appId === undefined ? undefined : getConnectorApp(appId)
  const firstScope = app?.scopes[0]

  return firstScope === undefined ? [] : [firstScope.id]
}
