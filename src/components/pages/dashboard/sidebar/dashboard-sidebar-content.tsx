import { Column } from "@nattstack/ui"
import { useLocation } from "@tanstack/react-router"
import { AnimatePresence } from "motion/react"
import type { JSX } from "react"
import {
  ANIMATION_DIRECTION_BACK,
  ANIMATION_DIRECTION_FORWARD,
  type DashboardSidebarAnimationDirection,
} from "#/components/pages/dashboard/sidebar/dashboard-sidebar-content-constants"
import { DashboardSidebarContentHome } from "#/components/pages/dashboard/sidebar/dashboard-sidebar-content-home"
import { DashboardSidebarContentSettings } from "#/components/pages/dashboard/sidebar/dashboard-sidebar-content-settings"

type DashboardSidebarContentLinksType = "home" | "settings"

export function DashboardSidebarContent(): JSX.Element {
  const { pathname } = useLocation()

  const links = getDashboardSidebarContentLinksType(pathname)

  const animationDirection: DashboardSidebarAnimationDirection =
    links === "home" ? ANIMATION_DIRECTION_BACK : ANIMATION_DIRECTION_FORWARD

  return (
    <Column className="relative min-h-0 flex-1 overflow-hidden">
      <AnimatePresence custom={{ direction: animationDirection }} initial={false} mode="popLayout">
        {links === "home" && <DashboardSidebarContentHome key="home" />}
        {links === "settings" && <DashboardSidebarContentSettings key="settings" />}
      </AnimatePresence>
    </Column>
  )
}

function getDashboardSidebarContentLinksType(pathname: string): DashboardSidebarContentLinksType {
  if (/\/settings(?:\/|$)/u.test(pathname)) {
    return "settings"
  }

  return "home"
}
