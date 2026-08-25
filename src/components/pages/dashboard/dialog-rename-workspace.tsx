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
import type { Workspace } from "#/data/workspaces"

interface DialogRenameWorkspaceProps {
  isOpen: boolean
  onIsOpenChange: (isOpen: boolean) => void
  onRename: (name: string) => void
  workspace: Workspace
}

export function DialogRenameWorkspace(props: DialogRenameWorkspaceProps): JSX.Element {
  const { isOpen, onIsOpenChange, onRename, workspace } = props

  const [name, setName] = useState(workspace.name)

  const [syncedIsOpen, setSyncedIsOpen] = useState(isOpen)

  if (syncedIsOpen !== isOpen) {
    setSyncedIsOpen(isOpen)
    setName(workspace.name)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const trimmedName = name.trim()

    if (trimmedName.length === 0) {
      return
    }

    onRename(trimmedName)
    onIsOpenChange(false)
  }

  return (
    <DialogResponsive onOpenChange={onIsOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <form onSubmit={onSubmit}>
          <Column>
            <h2 className="text-24 tracking-[-0.02em]">Rename workspace</h2>
            <Spacer height={24} />

            <Label htmlFor="workspace-rename-name">Name</Label>
            <Spacer height={8} />

            <Input
              autoFocus
              id="workspace-rename-name"
              onChange={(event) => setName(event.target.value)}
              placeholder={workspace.name}
              value={name}
            />
            <Spacer height={24} />

            <Row className="justify-end gap-8">
              <Button label="Cancel" onClick={() => onIsOpenChange(false)} variant="ghost" />
              <Button
                disabled={name.trim().length === 0}
                label="Rename"
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
