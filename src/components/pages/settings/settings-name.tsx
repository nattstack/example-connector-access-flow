import { Button, Column, Input, Label, Row, Spacer } from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { updateCurrentUser, useCurrentUser } from "#/data/user"

const INPUT_ID = "settings-change-name"
const USER_NAME_MAX_LENGTH = 120

export function SettingsName(): JSX.Element {
  const user = useCurrentUser()

  const [name, setName] = useState(user.name)
  const [successMessage, setSuccessMessage] = useState<string>()

  const trimmedName = name.trim()
  const isSaveDisabled = trimmedName.length === 0 || trimmedName === user.name

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    updateCurrentUser({ name: trimmedName })
    setName(trimmedName)
    setSuccessMessage("Name updated.")
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
        This is shown in your account menu and across your workspace.
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
          autoComplete="name"
          id={INPUT_ID}
          maxLength={USER_NAME_MAX_LENGTH}
          onChange={(event) => {
            setName(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="Your name"
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
