import { IconPlusOutline18 } from "@nattstack/icons"
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

interface DialogCreateWorkspaceProps {
  isOpen: boolean
  onCreate: (name: string) => Promise<void> | void
  onIsOpenChange: (isOpen: boolean) => void
}

export function DialogCreateWorkspace(props: DialogCreateWorkspaceProps): JSX.Element {
  const { isOpen, onCreate, onIsOpenChange } = props

  const [name, setName] = useState("")

  function onOpenChange(nextOpen: boolean): void {
    onIsOpenChange(nextOpen)

    if (!nextOpen) {
      setName("")
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const trimmedName = name.trim()

    if (trimmedName.length === 0) {
      return
    }

    onCreate(trimmedName)
    onOpenChange(false)
  }

  return (
    <DialogResponsive onOpenChange={onOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <form onSubmit={onSubmit}>
          <Column>
            <h2 className="text-24 tracking-[-0.02em]">Create workspace</h2>
            <Spacer height={8} />

            <p className="text-14 text-gray-11">
              Workspaces keep agents and conversations separate.
            </p>
            <Spacer height={24} />

            <Label htmlFor="workspace-name">Name</Label>
            <Spacer height={8} />

            <Input
              autoFocus
              id="workspace-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Acme Inc"
              value={name}
            />
            <Spacer height={24} />

            <Row className="justify-end">
              <Button
                disabled={name.trim().length === 0}
                iconStart={<IconPlusOutline18 />}
                label="Create workspace"
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
