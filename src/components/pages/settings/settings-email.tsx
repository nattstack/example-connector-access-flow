import { Button, Column, Input, Label, Row, Spacer } from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { updateCurrentUser, useCurrentUser } from "#/data/user"

const INPUT_ID = "settings-change-email"

export function SettingsEmail(): JSX.Element {
  const user = useCurrentUser()

  const [email, setEmail] = useState(user.email)
  const [successMessage, setSuccessMessage] = useState<string>()

  const normalizedEmail = email.trim().toLowerCase()
  const isSaveDisabled = normalizedEmail.length === 0 || normalizedEmail === user.email

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    updateCurrentUser({ email: normalizedEmail })
    setEmail(normalizedEmail)
    setSuccessMessage("Email updated.")
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Email</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">Change the email shown on your account.</p>
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
        <Label htmlFor={INPUT_ID}>Email</Label>
        <Spacer height={4} />

        <Input
          autoComplete="email"
          id={INPUT_ID}
          onChange={(event) => {
            setEmail(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="you@example.com"
          size={48}
          type="email"
          value={email}
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
