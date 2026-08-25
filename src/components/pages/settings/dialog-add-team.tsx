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
import { useState, type FormEvent, type JSX } from "react"

interface DialogAddTeamProps {
  isOpen: boolean
  onAdd: (input: { description: string; name: string }) => Promise<void> | void
  onIsOpenChange: (isOpen: boolean) => void
}

const DESCRIPTION_INPUT_ID = "settings-add-team-description"
const NAME_INPUT_ID = "settings-add-team-name"
const TEAM_DESCRIPTION_MAX_LENGTH = 200
const TEAM_NAME_MAX_LENGTH = 120

export function DialogAddTeam(props: DialogAddTeamProps): JSX.Element {
  const { isOpen, onAdd, onIsOpenChange } = props
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>()
  const [name, setName] = useState("")

  function onOpenChange(nextOpen: boolean): void {
    onIsOpenChange(nextOpen)

    if (!nextOpen) {
      setDescription("")
      setErrorMessage(undefined)
      setName("")
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const trimmedName = name.trim()

    if (trimmedName.length === 0) {
      return
    }

    try {
      await onAdd({
        description: description.trim(),
        name: trimmedName,
      })
      onOpenChange(false)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not add this team.")
    }
  }

  return (
    <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <form onSubmit={onSubmit}>
          <Column>
            <h2 className="text-24 tracking-[-0.02em]">Add a team</h2>
            <Spacer height={8} />

            <p className="text-14 text-text-secondary">
              Create a team so members, agents, and connectors can be grouped together.
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

            <Label htmlFor={NAME_INPUT_ID}>Name</Label>
            <Spacer height={8} />

            <Input
              autoFocus
              id={NAME_INPUT_ID}
              maxLength={TEAM_NAME_MAX_LENGTH}
              onChange={(event) => {
                setName(event.target.value)
                setErrorMessage(undefined)
              }}
              placeholder="Design"
              value={name}
            />
            <Spacer height={16} />

            <Label htmlFor={DESCRIPTION_INPUT_ID}>Description</Label>
            <Spacer height={8} />

            <Input
              id={DESCRIPTION_INPUT_ID}
              maxLength={TEAM_DESCRIPTION_MAX_LENGTH}
              onChange={(event) => {
                setDescription(event.target.value)
                setErrorMessage(undefined)
              }}
              placeholder="What this team does"
              value={description}
            />
            <Spacer height={24} />

            <Row className="justify-end gap-8">
              <Button label="Cancel" onClick={() => onOpenChange(false)} variant="ghost" />
              <Button
                disabled={name.trim().length === 0}
                label="Add a team"
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
