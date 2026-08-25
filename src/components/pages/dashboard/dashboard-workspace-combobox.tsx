import {
  IconChevronExpandYOutline18,
  IconPencilOutline18,
  IconPlusOutline18,
} from "@nattstack/icons"
import {
  Column,
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
import { useNavigate, useRouteContext, useRouter } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarWorkspace } from "#/components/avatar-workspace"
import { DialogCreateWorkspace } from "#/components/pages/dashboard/dialog-create-workspace"
import { DialogRenameWorkspace } from "#/components/pages/dashboard/dialog-rename-workspace"
import { listAgentsByWorkspaceId } from "#/data/agents"
import {
  createWorkspace,
  listWorkspaces,
  renameWorkspace,
  type WorkspaceLogo,
} from "#/data/workspaces"

interface WorkspaceOption {
  agentCount: number
  label: string
  logo?: WorkspaceLogo
  value: string
}

export function DashboardWorkspaceCombobox(): JSX.Element {
  const { workspace } = useRouteContext({ from: "/$workspaceSlug" })

  const navigate = useNavigate()
  const router = useRouter()

  const [workspaces, setWorkspaces] = useState(() => [...listWorkspaces()])

  const [isComboboxOpen, setIsComboboxOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isRenameOpen, setIsRenameOpen] = useState(false)

  const items: WorkspaceOption[] = useMemo(
    () =>
      workspaces.map((candidate) => ({
        agentCount: listAgentsByWorkspaceId(candidate.id).length,
        label: candidate.name,
        logo: candidate.logo,
        value: candidate.slug,
      })),
    [workspaces],
  )

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue = items.find((item) => item.value === workspace.slug) ?? null

  function syncWorkspaces(): void {
    setWorkspaces([...listWorkspaces()])
  }

  async function onCreateWorkspace(name: string): Promise<void> {
    const created = createWorkspace(name)

    syncWorkspaces()
    await navigate({
      params: { workspaceSlug: created.slug },
      to: "/$workspaceSlug",
    })
  }

  async function onRenameWorkspace(name: string): Promise<void> {
    renameWorkspace(workspace.slug, name)
    syncWorkspaces()
    await router.invalidate()
  }

  return (
    <>
      <Combobox
        items={items}
        onOpenChange={setIsComboboxOpen}
        onValueChange={async (nextValue) => {
          if (nextValue !== null && nextValue.value !== workspace.slug) {
            await navigate({
              params: { workspaceSlug: nextValue.value },
              to: "/$workspaceSlug",
            })
          }
        }}
        open={isComboboxOpen}
        value={selectedValue}
      >
        <ComboboxTrigger
          className="
            h-56! w-full rounded-12 bg-transparent! px-8 shadow-none!
            hover:bg-gray-3! hover:shadow-none!
            data-popup-open:bg-gray-3 data-popup-open:shadow-none!
            **:data-[component=combobox-icon]:hidden
          "
          size={48}
        >
          <ComboboxValue className="flex min-w-0 flex-1" placeholder="Select a workspace">
            {(item: WorkspaceOption) => (
              <Row alignItems="center" className="w-full min-w-0" gap={10}>
                <AvatarWorkspace logo={item.logo} name={item.label} size={32} />
                <Column className="min-w-0">
                  <span className="truncate text-14 font-500 text-text-primary">{item.label}</span>
                  <span className="truncate text-12 text-text-secondary">
                    {formatAgentCountLabel(item.agentCount)}
                  </span>
                </Column>
              </Row>
            )}
          </ComboboxValue>
          <IconChevronExpandYOutline18 className="shrink-0 text-gray-9" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSearch placeholder="Search workspaces" />
          <ComboboxEmpty>No workspaces found.</ComboboxEmpty>
          <ComboboxList>
            {(item: WorkspaceOption) => (
              <ComboboxItem key={item.value} value={item}>
                <Row className="items-center gap-8">
                  <AvatarWorkspace logo={item.logo} name={item.label} />
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
      <DialogRenameWorkspace
        isOpen={isRenameOpen}
        onIsOpenChange={setIsRenameOpen}
        onRename={onRenameWorkspace}
        workspace={workspace}
      />
    </>
  )
}

function formatAgentCountLabel(count: number): string {
  return count === 1 ? "1 agent" : `${count} agents`
}
