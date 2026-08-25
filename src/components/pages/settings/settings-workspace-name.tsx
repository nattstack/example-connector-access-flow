import { Input } from "@nattstack/ui"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { useState, type JSX } from "react"
import { AvatarWorkspace } from "#/components/avatar-workspace"
import { SettingsRow, SettingsSection } from "#/components/pages/settings/settings-section"
import { isCurrentUserWorkspaceAdmin } from "#/data/members"
import { renameWorkspace } from "#/data/workspaces"

const INPUT_ID = "settings-workspace-name"
const WORKSPACE_NAME_MAX_LENGTH = 120

export function SettingsWorkspaceName(): JSX.Element {
  const { workspace } = useRouteContext({ from: "/$workspaceSlug" })
  const router = useRouter()
  const isAdmin = isCurrentUserWorkspaceAdmin(workspace.id)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [name, setName] = useState(workspace.name)

  async function saveName(): Promise<void> {
    if (!isAdmin) {
      return
    }

    const trimmedName = name.trim()

    if (trimmedName.length === 0) {
      setName(workspace.name)
      setErrorMessage(undefined)
      return
    }

    if (trimmedName === workspace.name) {
      setName(trimmedName)
      return
    }

    try {
      renameWorkspace(workspace.slug, trimmedName)
      setName(trimmedName)
      setErrorMessage(undefined)
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update this name.")
    }
  }

  return (
    <SettingsSection>
      <SettingsRow description="Used in the workspace switcher." label="Logo">
        <AvatarWorkspace logo={workspace.logo} name={workspace.name} size={32} />
      </SettingsRow>
      <SettingsRow
        description={
          isAdmin
            ? "This is shown in the workspace switcher and across your workspace."
            : "This is shown in the workspace switcher and across your workspace. Only workspace admins can change it."
        }
        htmlFor={isAdmin ? INPUT_ID : undefined}
        label="Name"
      >
        {isAdmin ? (
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              await saveName()
            }}
          >
            <Input
              className="
                w-240
                max-768:w-full
              "
              id={INPUT_ID}
              maxLength={WORKSPACE_NAME_MAX_LENGTH}
              onBlur={saveName}
              onChange={(event) => {
                setName(event.target.value)
                setErrorMessage(undefined)
              }}
              placeholder="Workspace name"
              size={36}
              value={name}
            />
          </form>
        ) : (
          <span className="text-14 text-text-secondary">{workspace.name}</span>
        )}
      </SettingsRow>
      <SettingsRow description="Used in this workspace's URL. This cannot be changed." label="URL">
        <span className="text-14 text-text-secondary">/{workspace.slug}</span>
      </SettingsRow>
      {Boolean(errorMessage) && (
        <p className="px-20 py-12 text-13 text-error" role="alert">
          {errorMessage}
        </p>
      )}
    </SettingsSection>
  )
}
