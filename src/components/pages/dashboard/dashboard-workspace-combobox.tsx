import { IconPencilOutline18, IconPlusOutline18 } from "@nattstack/icons"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Row,
} from "@nattstack/ui"
import { useMemo, useState, type JSX } from "react"
import { Logomark } from "#/components/logomark"
import { DialogCreateWorkspace } from "#/components/pages/dashboard/dialog-create-workspace"
import { DialogRenameWorkspace } from "#/components/pages/dashboard/dialog-rename-workspace"
import {
  createWorkspaceId,
  getDefaultWorkspace,
  MOCK_WORKSPACES,
  type Workspace,
} from "#/data/workspaces"

interface WorkspaceOption {
  label: string
  value: string
}

export function DashboardWorkspaceCombobox(): JSX.Element {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(MOCK_WORKSPACES)
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(getDefaultWorkspace().id)

  const [isComboboxOpen, setIsComboboxOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isRenameOpen, setIsRenameOpen] = useState(false)

  const items: WorkspaceOption[] = useMemo(
    () =>
      workspaces.map((workspace) => ({
        label: workspace.name,
        value: workspace.id,
      })),
    [workspaces],
  )

  const selectedWorkspace = workspaces.find((workspace) => workspace.id === selectedWorkspaceId)

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue = items.find((item) => item.value === selectedWorkspaceId) ?? null

  function onCreateWorkspace(name: string): void {
    const workspace: Workspace = {
      id: createWorkspaceId(name, workspaces),
      name,
    }

    setWorkspaces((current) => [...current, workspace])
    setSelectedWorkspaceId(workspace.id)
  }

  function onRenameWorkspace(name: string): void {
    setWorkspaces((current) =>
      current.map((workspace) =>
        workspace.id === selectedWorkspaceId ? { ...workspace, name } : workspace,
      ),
    )
  }

  return (
    <>
      <Combobox
        items={items}
        onOpenChange={setIsComboboxOpen}
        onValueChange={(nextValue) => {
          if (nextValue !== null) {
            setSelectedWorkspaceId(nextValue.value)
          }
        }}
        open={isComboboxOpen}
        value={selectedValue}
      >
        <ComboboxTrigger className="w-full">
          <ComboboxValue placeholder="Select a workspace">
            {(item: WorkspaceOption) => (
              <Row className="items-center gap-8">
                <Logomark height={16} width={16} />
                <span className="truncate">{item.label}</span>
              </Row>
            )}
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSearch placeholder="Search workspaces" />
          <ComboboxEmpty>No workspaces found.</ComboboxEmpty>
          <ComboboxList>
            {(item: WorkspaceOption) => (
              <ComboboxItem key={item.value} value={item}>
                <Row className="items-center gap-8">
                  <Logomark height={16} width={16} />
                  <span className="truncate">{item.label}</span>
                </Row>
              </ComboboxItem>
            )}
          </ComboboxList>
          <ComboboxSeparator className="shrink-0" />
          {/* Outside ComboboxList: pinned while scrolling; still visible when list is empty. */}
          <div className="flex shrink-0 flex-col gap-y-2 overflow-y-auto p-4">
            <button
              className="
                flex h-36 w-full shrink-0 cursor-pointer items-center gap-8
                rounded-8 px-12 outline-none select-none
                hover:bg-gray-3
                focus-visible:bg-gray-3
              "
              onClick={() => {
                setIsComboboxOpen(false)
                setIsRenameOpen(true)
              }}
              type="button"
            >
              <IconPencilOutline18 className="text-gray-9" />
              <span className="truncate text-14 font-500 text-text-primary">Rename workspace</span>
            </button>
            <button
              className="
                flex h-36 w-full shrink-0 cursor-pointer items-center gap-8
                rounded-8 px-12 outline-none select-none
                hover:bg-gray-3
                focus-visible:bg-gray-3
              "
              onClick={() => {
                setIsComboboxOpen(false)
                setIsCreateOpen(true)
              }}
              type="button"
            >
              <IconPlusOutline18 className="text-gray-9" />
              <span className="truncate text-14 font-500 text-text-primary">Create workspace</span>
            </button>
          </div>
        </ComboboxContent>
      </Combobox>

      <DialogCreateWorkspace
        isOpen={isCreateOpen}
        onCreate={onCreateWorkspace}
        onIsOpenChange={setIsCreateOpen}
      />
      {selectedWorkspace === undefined ? undefined : (
        <DialogRenameWorkspace
          isOpen={isRenameOpen}
          onIsOpenChange={setIsRenameOpen}
          onRename={onRenameWorkspace}
          workspace={selectedWorkspace}
        />
      )}
    </>
  )
}
