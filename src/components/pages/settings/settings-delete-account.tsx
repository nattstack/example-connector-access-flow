import { Button, Column, Input, Label, Row, Spacer } from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { useCurrentUser } from "#/data/user"

const INPUT_ID = "settings-delete-account-confirmation"

export function SettingsDeleteAccount(): JSX.Element {
  const user = useCurrentUser()

  const [confirmation, setConfirmation] = useState("")
  const [successMessage, setSuccessMessage] = useState<string>()

  const isDeleteDisabled = confirmation.trim() !== user.email

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (isDeleteDisabled) {
      return
    }

    setConfirmation("")
    setSuccessMessage("Account deleted.")
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-error/40 bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24 text-error">Delete Account</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Permanently delete your account and profile. This action can&apos;t be undone.
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
        <Label htmlFor={INPUT_ID}>Type {user.email} to confirm</Label>
        <Spacer height={4} />

        <Input
          autoComplete="off"
          id={INPUT_ID}
          onChange={(event) => {
            setConfirmation(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder={user.email}
          size={48}
          type="email"
          value={confirmation}
        />
        <Spacer height={16} />

        <Row className="justify-end">
          <Button
            disabled={isDeleteDisabled}
            label="Delete account"
            rounded
            type="submit"
            variant="primary"
          />
        </Row>
      </form>
    </Column>
  )
}
