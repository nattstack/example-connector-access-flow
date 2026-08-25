import { Button, Column, Input, Label, Row, Spacer } from "@nattstack/ui"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { useState, type FormEvent, type JSX } from "react"
import { renameWorkspace } from "#/data/workspaces"

const INPUT_ID = "settings-workspace-name"
const WORKSPACE_NAME_MAX_LENGTH = 120

export function SettingsWorkspaceName(): JSX.Element {
  const { workspace } = useRouteContext({ from: "/$workspaceSlug" })
  const router = useRouter()

  const [name, setName] = useState(workspace.name)
  const [successMessage, setSuccessMessage] = useState<string>()

  const trimmedName = name.trim()
  const isSaveDisabled = trimmedName.length === 0 || trimmedName === workspace.name

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    renameWorkspace(workspace.slug, trimmedName)
    setName(trimmedName)
    setSuccessMessage("Workspace name updated.")
    await router.invalidate()
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Name</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        This is shown in the workspace switcher and across your workspace.
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

      <form className="flex flex-col" onSubmit={onSubmit}>
        <Label htmlFor={INPUT_ID}>Name</Label>
        <Spacer height={4} />

        <Input
          id={INPUT_ID}
          maxLength={WORKSPACE_NAME_MAX_LENGTH}
          onChange={(event) => {
            setName(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="Workspace name"
          size={48}
          value={name}
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
