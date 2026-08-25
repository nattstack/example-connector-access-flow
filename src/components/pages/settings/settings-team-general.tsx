import {
  Button,
  Column,
  DialogResponsive,
  DialogResponsivePopup,
  Input,
  Label,
  Row,
  Spacer,
} from "@nattstack/ui"
import { useNavigate, useParams, useRouter } from "@tanstack/react-router"
import { useState, type FormEvent, type JSX } from "react"
import { SettingsRow, SettingsSection } from "#/components/pages/settings/settings-section"
import { clearConnectorTeamAccess } from "#/data/connectors"
import { isCurrentUserWorkspaceAdmin } from "#/data/members"
import { deleteTeam, updateTeam, type Team } from "#/data/teams"

const DELETE_INPUT_ID = "settings-team-delete-confirmation"
const DESCRIPTION_INPUT_ID = "settings-team-description"
const NAME_INPUT_ID = "settings-team-name"
const TEAM_DESCRIPTION_MAX_LENGTH = 200
const TEAM_NAME_MAX_LENGTH = 120

interface SettingsTeamGeneralProps {
  team: Team
}

export function SettingsTeamDelete(props: SettingsTeamGeneralProps): JSX.Element {
  return <TeamDeleteSection team={props.team} />
}

export function SettingsTeamGeneral(props: SettingsTeamGeneralProps): JSX.Element {
  const { team } = props
  const isAdmin = isCurrentUserWorkspaceAdmin(team.workspaceId)

  return <TeamGeneralSection isAdmin={isAdmin} team={team} />
}

function TeamDeleteSection(props: { team: Team }): JSX.Element {
  const { team } = props
  const navigate = useNavigate()
  const router = useRouter()
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const [confirmation, setConfirmation] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)
  const isDeleteDisabled = confirmation.trim() !== team.name

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
      clearConnectorTeamAccess({
        teamId: team.id,
        workspaceId: team.workspaceId,
      })
      deleteTeam({
        teamId: team.id,
        workspaceId: team.workspaceId,
      })
      onOpenChange(false)
      await navigate({ params: { workspaceSlug }, to: "/$workspaceSlug/settings/teams" })
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not delete this team.")
    }
  }

  return (
    <SettingsSection title="Danger zone">
      <SettingsRow
        description="Permanently delete this team. Members and agents stay in the workspace but leave the team. Connectors restricted to this team become available to everybody."
        label="Delete team"
      >
        <Button
          className="text-error"
          label="Delete team"
          onClick={() => setIsOpen(true)}
          size={32}
          variant="ghost"
        />
      </SettingsRow>

      <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
        <DialogResponsivePopup className="max-w-[420px]">
          <form onSubmit={onSubmit}>
            <Column>
              <h2 className="text-24 tracking-[-0.02em]">Delete team</h2>
              <Spacer height={8} />

              <p className="text-14 text-text-secondary">
                Permanently delete {team.name}. Members and agents stay in the workspace but leave
                the team. This action can&apos;t be undone.
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

              <Label htmlFor={DELETE_INPUT_ID}>Type {team.name} to confirm</Label>
              <Spacer height={8} />

              <Input
                autoComplete="off"
                autoFocus
                id={DELETE_INPUT_ID}
                onChange={(event) => {
                  setConfirmation(event.target.value)
                  setErrorMessage(undefined)
                }}
                placeholder="Type the team name"
                size={36}
                value={confirmation}
              />
              <Spacer height={24} />

              <Row className="justify-end gap-8">
                <Button label="Cancel" onClick={() => onOpenChange(false)} variant="ghost" />
                <Button
                  disabled={isDeleteDisabled}
                  label="Delete team"
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

function TeamGeneralSection(props: { isAdmin: boolean; team: Team }): JSX.Element {
  const { isAdmin, team } = props
  const router = useRouter()
  const [description, setDescription] = useState(team.description)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [name, setName] = useState(team.name)

  async function saveDescription(): Promise<void> {
    if (!isAdmin) {
      return
    }

    const trimmedDescription = description.trim()

    if (trimmedDescription === team.description) {
      setDescription(trimmedDescription)
      return
    }

    try {
      updateTeam({
        description: trimmedDescription,
        teamId: team.id,
        workspaceId: team.workspaceId,
      })
      setDescription(trimmedDescription)
      setErrorMessage(undefined)
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update this description.")
    }
  }

  async function saveName(): Promise<void> {
    if (!isAdmin) {
      return
    }

    const trimmedName = name.trim()

    if (trimmedName.length === 0) {
      setName(team.name)
      setErrorMessage(undefined)
      return
    }

    if (trimmedName === team.name) {
      setName(trimmedName)
      return
    }

    try {
      updateTeam({
        name: trimmedName,
        teamId: team.id,
        workspaceId: team.workspaceId,
      })
      setName(trimmedName)
      setErrorMessage(undefined)
      await router.invalidate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not update this name.")
    }
  }

  return (
    <SettingsSection>
      <SettingsRow
        description={
          isAdmin
            ? "Members and agents can join this team. Shown in settings and anywhere this team appears."
            : "Members and agents can join this team. Only workspace admins can change it."
        }
        htmlFor={isAdmin ? NAME_INPUT_ID : undefined}
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
              id={NAME_INPUT_ID}
              maxLength={TEAM_NAME_MAX_LENGTH}
              onBlur={saveName}
              onChange={(event) => {
                setName(event.target.value)
                setErrorMessage(undefined)
              }}
              placeholder="Team name"
              size={36}
              value={name}
            />
          </form>
        ) : (
          <span className="text-14 text-text-secondary">{team.name}</span>
        )}
      </SettingsRow>
      <SettingsRow
        description={
          isAdmin
            ? "Shown in the teams list and anywhere this team appears."
            : "Shown in the teams list and anywhere this team appears. Only workspace admins can change it."
        }
        htmlFor={isAdmin ? DESCRIPTION_INPUT_ID : undefined}
        label="Description"
      >
        {isAdmin ? (
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              await saveDescription()
            }}
          >
            <Input
              className="
                w-240
                max-768:w-full
              "
              id={DESCRIPTION_INPUT_ID}
              maxLength={TEAM_DESCRIPTION_MAX_LENGTH}
              onBlur={saveDescription}
              onChange={(event) => {
                setDescription(event.target.value)
                setErrorMessage(undefined)
              }}
              placeholder="What this team does"
              size={36}
              value={description}
            />
          </form>
        ) : (
          <span className="text-14 text-text-secondary">{team.description || "None"}</span>
        )}
      </SettingsRow>
      <SettingsRow description="Used in this team's URL. This cannot be changed." label="URL">
        <span className="text-14 text-text-secondary">/{team.slug}</span>
      </SettingsRow>
      {Boolean(errorMessage) && (
        <p className="px-20 py-12 text-13 text-error" role="alert">
          {errorMessage}
        </p>
      )}
    </SettingsSection>
  )
}
