import { Checkbox } from "@base-ui/react/checkbox"
import {
  Button,
  Column,
  DialogResponsive,
  DialogResponsivePopup,
  Label,
  Row,
  Spacer,
} from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { getConnectorApp, type ConnectorAppId } from "#/data/connectors"

interface DialogAuthorizeConnectorProps {
  appId: ConnectorAppId
  description?: string
  isOpen: boolean
  onAuthorize?: (scopeIds: string[]) => void
  onIsOpenChange: (isOpen: boolean) => void
}

type PermissionMode = "all" | "choose"

const SCOPE_PAIR_COUNT = 2

export function DialogAuthorizeConnector(props: DialogAuthorizeConnectorProps): JSX.Element {
  const { appId, description, isOpen, onAuthorize, onIsOpenChange } = props
  const app = getConnectorApp(appId)
  const scopes = app?.scopes ?? []
  const allScopeIds = scopes.map((scope) => scope.id)
  const [mode, setMode] = useState<PermissionMode>("all")
  const [scopeIds, setScopeIds] = useState<string[]>([])
  const selectedScopeIds = mode === "all" ? allScopeIds : scopeIds
  const isSubmitDisabled = selectedScopeIds.length === 0

  function onOpenChange(nextOpen: boolean): void {
    onIsOpenChange(nextOpen)

    if (!nextOpen) {
      setMode("all")
      setScopeIds([])
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (isSubmitDisabled) {
      return
    }

    onAuthorize?.(selectedScopeIds)
    onOpenChange(false)
  }

  return (
    <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <form onSubmit={onSubmit}>
          <Column>
            <Row alignItems="center">
              <AvatarConnector appId={appId} />

              <Spacer width={12} />

              <h2 className="text-24 tracking-[-0.02em]">Authorize {app?.name ?? "this app"}</h2>
            </Row>
            <Spacer height={8} />

            <p className="text-14 text-text-secondary">
              {description ??
                "Grant every permission we request, or choose which scopes this agent can use."}
            </p>
            <Spacer height={24} />

            <Column className="gap-y-8">
              <PermissionOption
                checked={mode === "all"}
                description={
                  scopes.length === 0
                    ? `Grant every ${app?.name ?? "app"} permission we request.`
                    : `Grant ${scopeListLabel(scopes.map((scope) => scope.label))}.`
                }
                label="Allow all permissions"
                onSelect={() => setMode("all")}
                value="all"
              />
              <PermissionOption
                checked={mode === "choose"}
                description="Pick which scopes to enable instead of granting all."
                label="Choose permissions"
                onSelect={() => setMode("choose")}
                value="choose"
              />
            </Column>

            {mode === "choose" && scopes.length > 0 && (
              <>
                <Spacer height={16} />

                <Label>Scopes</Label>
                <Spacer height={8} />

                <Column className="gap-y-8">
                  {scopes.map((scope) => {
                    const checked = scopeIds.includes(scope.id)
                    const inputId = `authorize-connector-scope-${scope.id}`

                    return (
                      <Row className="items-start" key={scope.id}>
                        <Checkbox.Root
                          checked={checked}
                          className="
                            flex size-16 shrink-0 items-center justify-center
                            rounded-4 border border-border bg-bg-primary p-0
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-primary
                            data-checked:border-gray-12 data-checked:bg-gray-12
                            data-checked:text-gray-1
                          "
                          id={inputId}
                          nativeButton
                          onCheckedChange={(nextChecked) => {
                            setScopeIds((current) =>
                              nextChecked
                                ? [...current, scope.id]
                                : current.filter((scopeId) => scopeId !== scope.id),
                            )
                          }}
                          render={<button aria-label={scope.label} type="button" />}
                        >
                          <Checkbox.Indicator className="flex data-unchecked:hidden">
                            <IconCheck />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
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
              </>
            )}
            <Spacer height={24} />

            <Row className="justify-end gap-8">
              <Button label="Cancel" onClick={() => onOpenChange(false)} variant="ghost" />
              <Button
                disabled={isSubmitDisabled}
                label="Authorize"
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

function IconCheck(props: { className?: string }): JSX.Element {
  const { className = "size-12" } = props

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m2.5 8.5 4 4 7-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function PermissionOption(props: {
  checked: boolean
  description: string
  label: string
  onSelect: () => void
  value: PermissionMode
}): JSX.Element {
  const { checked, description, label, onSelect, value } = props
  const inputId = `authorize-connector-permission-${value}`

  return (
    <label
      className={`
        block w-full cursor-pointer rounded-12 border px-12 py-10
        ${checked ? "border-border bg-gray-3" : "border-border bg-bg-primary"}
      `}
      htmlFor={inputId}
    >
      <input
        checked={checked}
        className="sr-only"
        id={inputId}
        name="authorize-connector-permission-mode"
        onChange={onSelect}
        type="radio"
        value={value}
      />
      <Row alignItems="center" className="justify-between">
        <Column className="min-w-0">
          <p className="text-14 font-500 text-text-primary">{label}</p>
          <Spacer height={4} />

          <p className="text-13 text-text-secondary">{description}</p>
        </Column>

        {checked && (
          <>
            <Spacer width={12} />

            <span className="shrink-0 text-text-primary">
              <IconCheck className="size-16" />
            </span>
          </>
        )}
      </Row>
    </label>
  )
}

function scopeListLabel(labels: string[]): string {
  if (labels.length === 0) {
    return "every requested permission"
  }

  if (labels.length === 1) {
    return labels[0] ?? "every requested permission"
  }

  const lastLabel = labels.at(-1)

  if (labels.length === SCOPE_PAIR_COUNT) {
    return `${labels[0] ?? ""} and ${lastLabel ?? ""}`
  }

  return `${labels.slice(0, -1).join(", ")}, and ${lastLabel ?? ""}`
}
