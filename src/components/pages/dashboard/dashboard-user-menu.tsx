import { IconArrowDoorOutOutline18, IconGearOutline18 } from "@nattstack/icons"
import { Column, Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@nattstack/ui"
import type { JSX } from "react"
import { AvatarUser } from "#/components/avatar-user"
import { getCurrentUser } from "#/data/user"

export function DashboardUserMenu(): JSX.Element {
  const user = getCurrentUser()

  return (
    <Menu>
      <MenuTrigger
        className="
          flex h-48 w-full shrink-0 cursor-pointer items-center gap-x-8
          rounded-12 border-0 bg-transparent px-8 text-left outline-none
          select-none
          hover:bg-gray-3
          focus-visible:bg-gray-3
          data-popup-open:bg-gray-3
        "
      >
        <AvatarUser alt={user.name} src={user.avatar} />
        <span className="min-w-0 truncate text-14 font-500 text-text-primary">{user.name}</span>
      </MenuTrigger>
      <MenuContent
        align="start"
        className="
          w-(--anchor-width)! max-w-(--anchor-width)! min-w-(--anchor-width)!
        "
        side="top"
      >
        <Column className="px-12 py-8">
          <span className="truncate text-14 font-500 text-text-primary">{user.name}</span>
          <span className="truncate text-12 text-text-secondary">{user.email}</span>
        </Column>
        <MenuSeparator />
        <MenuItem>
          <IconGearOutline18 className="text-gray-9" />
          Settings
        </MenuItem>
        <MenuItem>
          <IconArrowDoorOutOutline18 className="text-gray-9" />
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
