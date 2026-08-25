import {
  Button,
  Column,
  DialogResponsive,
  DialogResponsivePopup,
  Input,
  Label,
  Row,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
} from "@nattstack/ui"
import { useState, type FormEvent, type JSX } from "react"
import { memberRoleLabel, type MemberRole } from "#/data/members"

interface DialogAddMemberProps {
  isOpen: boolean
  onAdd: (input: { email: string; role: MemberRole }) => Promise<void> | void
  onIsOpenChange: (isOpen: boolean) => void
}

const EMAIL_INPUT_ID = "settings-add-member-email"

export function DialogAddMember(props: DialogAddMemberProps): JSX.Element {
  const { isOpen, onAdd, onIsOpenChange } = props

  const [email, setEmail] = useState("")
  const [role, setRole] = useState<MemberRole>("Member")
  const [errorMessage, setErrorMessage] = useState<string>()

  function onOpenChange(nextOpen: boolean): void {
    onIsOpenChange(nextOpen)

    if (!nextOpen) {
      setEmail("")
      setRole("Member")
      setErrorMessage(undefined)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()

    if (trimmedEmail.length === 0) {
      return
    }

    try {
      await onAdd({
        email: trimmedEmail,
        role,
      })
      onOpenChange(false)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not add this member.")
    }
  }

  return (
    <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <form onSubmit={onSubmit}>
          <Column>
            <h2 className="text-24 tracking-[-0.02em]">Add a member</h2>
            <Spacer height={8} />

            <p className="text-14 text-text-secondary">
              Invite someone to this workspace by email.
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

            <Label htmlFor={EMAIL_INPUT_ID}>Email</Label>
            <Spacer height={8} />

            <Input
              autoComplete="email"
              autoFocus
              id={EMAIL_INPUT_ID}
              onChange={(event) => {
                setEmail(event.target.value)
                setErrorMessage(undefined)
              }}
              placeholder="jordan@example.com"
              type="email"
              value={email}
            />
            <Spacer height={16} />

            <Label>Role</Label>
            <Spacer height={8} />

            <Select
              onValueChange={(nextRole) => {
                if (nextRole !== null) {
                  setRole(nextRole)
                }
              }}
              value={role}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Member">{memberRoleLabel("Member")}</SelectItem>
                <SelectItem value="Admin">{memberRoleLabel("Admin")}</SelectItem>
              </SelectContent>
            </Select>
            <Spacer height={24} />

            <Row className="justify-end gap-8">
              <Button label="Cancel" onClick={() => onOpenChange(false)} variant="ghost" />
              <Button
                disabled={email.trim().length === 0}
                label="Add a member"
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
