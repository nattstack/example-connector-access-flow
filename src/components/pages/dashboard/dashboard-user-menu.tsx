import { IconArrowDoorOutOutline18, IconGearOutline18 } from "@nattstack/icons"
import {
  Column,
  Menu,
  MenuContent,
  MenuItem,
  MenuLinkItem,
  MenuSeparator,
  MenuTrigger,
} from "@nattstack/ui"
import { Link, useParams } from "@tanstack/react-router"
import type { JSX } from "react"
import { AvatarUser } from "#/components/avatar-user"
import { useCurrentUser } from "#/data/user"

export function DashboardUserMenu(): JSX.Element {
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })
  const user = useCurrentUser()

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
        <MenuLinkItem
          className="h-auto py-8"
          closeOnClick
          render={<Link params={{ workspaceSlug }} to="/$workspaceSlug/settings/members" />}
        >
          <Column className="min-w-0">
            <span className="truncate text-14 font-500 text-text-primary">{user.name}</span>
            <span className="truncate text-12 text-text-secondary">{user.email}</span>
          </Column>
        </MenuLinkItem>
        <MenuSeparator />
        <MenuLinkItem
          closeOnClick
          render={<Link params={{ workspaceSlug }} to="/$workspaceSlug/settings/members" />}
        >
          <IconGearOutline18 className="text-gray-9" />
          Settings
        </MenuLinkItem>
        <MenuItem disabled>
          <IconArrowDoorOutOutline18 className="text-gray-9" />
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
