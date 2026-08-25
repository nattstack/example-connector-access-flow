import { Button, Column, Input, Label, Row, Spacer } from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"

const CURRENT_PASSWORD_INPUT_ID = "settings-current-password"
const NEW_PASSWORD_INPUT_ID = "settings-new-password"
const CONFIRM_PASSWORD_INPUT_ID = "settings-confirm-password"

export function SettingsPassword(): JSX.Element {
  const [confirmation, setConfirmation] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState<string>()

  const doPasswordsMismatch = Boolean(confirmation) && newPassword !== confirmation
  const isSaveDisabled =
    currentPassword.length === 0 ||
    newPassword.length === 0 ||
    confirmation.length === 0 ||
    doPasswordsMismatch

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    setConfirmation("")
    setCurrentPassword("")
    setNewPassword("")
    setSuccessMessage("Password updated.")
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Password</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Change the password you use to sign in to your account.
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
        <Label htmlFor={CURRENT_PASSWORD_INPUT_ID}>Current password</Label>
        <Spacer height={4} />

        <Input
          autoComplete="current-password"
          id={CURRENT_PASSWORD_INPUT_ID}
          onChange={(event) => {
            setCurrentPassword(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="Enter your current password"
          size={48}
          type="password"
          value={currentPassword}
        />
        <Spacer height={16} />

        <Label htmlFor={NEW_PASSWORD_INPUT_ID}>New password</Label>
        <Spacer height={4} />

        <Input
          autoComplete="new-password"
          id={NEW_PASSWORD_INPUT_ID}
          onChange={(event) => {
            setNewPassword(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="Enter your new password"
          size={48}
          type="password"
          value={newPassword}
        />
        <Spacer height={16} />

        <Label htmlFor={CONFIRM_PASSWORD_INPUT_ID}>Confirm new password</Label>
        <Spacer height={4} />

        <Input
          autoComplete="new-password"
          id={CONFIRM_PASSWORD_INPUT_ID}
          invalid={doPasswordsMismatch}
          onChange={(event) => {
            setConfirmation(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="Re-enter your new password"
          size={48}
          type="password"
          value={confirmation}
        />
        {doPasswordsMismatch && (
          <>
            <Spacer height={8} />

            <p className="text-13 text-error" role="alert">
              New passwords do not match.
            </p>
          </>
        )}
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
