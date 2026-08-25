import {
  IconArrowLeftOutline18,
  IconGearOutline18,
  IconGridLayoutOutline18,
  IconShieldOutline18,
  IconUserGroupOutline18,
  IconUserOutline18,
  IconUsersOutline18,
} from "@nattstack/icons"
import { Column, Spacer } from "@nattstack/ui"
import { motion } from "motion/react"
import type { ComponentProps, JSX } from "react"
import {
  ANIMATION,
  ANIMATION_DIRECTION_FORWARD,
  ICON_SIZE,
} from "#/components/pages/dashboard/sidebar/dashboard-sidebar-content-constants"
import { DashboardSidebarLabel } from "#/components/pages/dashboard/sidebar/dashboard-sidebar-label"
import { DashboardSidebarLink } from "#/components/pages/dashboard/sidebar/dashboard-sidebar-link"

interface DashboardSidebarContentSettingsProps extends Pick<ComponentProps<"div">, "ref"> {}

export function DashboardSidebarContentSettings(
  props: DashboardSidebarContentSettingsProps,
): JSX.Element {
  const { ref } = props

  return (
    <motion.div
      animate="animate"
      className="flex h-full min-h-0 flex-col overflow-y-auto px-8"
      custom={{ direction: ANIMATION_DIRECTION_FORWARD }}
      exit="exit"
      initial="initial"
      ref={ref}
      transition={ANIMATION.transition}
      variants={ANIMATION.variants}
    >
      <Column className="gap-y-2">
        <DashboardSidebarLink
          icon={<IconArrowLeftOutline18 size={ICON_SIZE} />}
          label="Back"
          to="/$workspaceSlug"
        />
        <Spacer height={8} />

        <DashboardSidebarLabel label="Personal" />

        <DashboardSidebarLink
          icon={<IconUserOutline18 size={ICON_SIZE} />}
          label="Profile"
          to="/$workspaceSlug/settings/profile"
        />
        <DashboardSidebarLink
          icon={<IconGearOutline18 size={ICON_SIZE} />}
          label="Account"
          to="/$workspaceSlug/settings/account"
        />
        <Spacer height={16} />

        <DashboardSidebarLabel label="Administration" />

        <DashboardSidebarLink
          icon={<IconGridLayoutOutline18 size={ICON_SIZE} />}
          label="Workspace"
          to="/$workspaceSlug/settings/workspace"
        />
        <DashboardSidebarLink
          exact={false}
          icon={<IconUsersOutline18 size={ICON_SIZE} />}
          label="Teams"
          to="/$workspaceSlug/settings/teams"
        />
        <DashboardSidebarLink
          icon={<IconUserGroupOutline18 size={ICON_SIZE} />}
          label="Members"
          to="/$workspaceSlug/settings/members"
        />
        <DashboardSidebarLink
          icon={<IconShieldOutline18 size={ICON_SIZE} />}
          label="Security"
          to="/$workspaceSlug/settings/security"
        />
      </Column>
    </motion.div>
  )
}
