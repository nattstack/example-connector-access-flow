import { Button, Column, Input, Label, Row, Spacer } from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { updateCurrentUser, useCurrentUser } from "#/data/user"

const INPUT_ID = "settings-profile-image"
const PROFILE_IMAGE_MAX_LENGTH = 2048

export function SettingsProfileImage(): JSX.Element {
  const user = useCurrentUser()

  const [image, setImage] = useState(user.avatar)
  const [successMessage, setSuccessMessage] = useState<string>()

  const trimmedImage = image.trim()
  const isSaveDisabled = trimmedImage === user.avatar

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (isSaveDisabled) {
      return
    }

    updateCurrentUser({ avatar: trimmedImage })
    setImage(trimmedImage)
    setSuccessMessage("Profile image updated.")
  }

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Profile Image</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">
        Paste a direct image URL to use as your account avatar.
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
        <Label htmlFor={INPUT_ID}>Image URL</Label>
        <Spacer height={4} />

        <Input
          id={INPUT_ID}
          maxLength={PROFILE_IMAGE_MAX_LENGTH}
          onChange={(event) => {
            setImage(event.target.value)
            setSuccessMessage(undefined)
          }}
          placeholder="https://example.com/avatar.png"
          size={48}
          type="url"
          value={image}
        />
        <Spacer height={16} />

        {Boolean(trimmedImage) && (
          <>
            <Row
              className="
                items-center gap-x-12 rounded-12 border border-border p-12
              "
            >
              <Row className="size-48 overflow-hidden rounded-full bg-bg-secondary">
                <img alt="Avatar preview" className="size-full object-cover" src={trimmedImage} />
              </Row>
              <Column>
                <p className="text-14 font-500 text-text-primary">Preview</p>
                <p className="text-13 text-text-secondary">This image will appear in your menu.</p>
              </Column>
            </Row>
            <Spacer height={16} />
          </>
        )}

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
