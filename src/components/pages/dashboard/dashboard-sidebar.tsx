import { Column, Row, Spacer } from "@nattstack/ui"
import type { JSX } from "react"
import { LogoLink } from "#/components/logo-link"
import { DashboardUserMenu } from "#/components/pages/dashboard/dashboard-user-menu"
import { DashboardSidebarContent } from "#/components/pages/dashboard/sidebar/dashboard-sidebar-content"

export function DashboardSidebar(): JSX.Element {
  return (
    <Column
      as="aside"
      className="
        sticky top-0 left-0 isolate z-30 h-dvh w-288 shrink-0
        shadow-[inset_-1px_0_0_0_var(--color-border)]
      "
    >
      <Row as="header" className="mt-8 ml-8">
        <LogoLink />
      </Row>
      <Spacer height={8} />

      <DashboardSidebarContent />

      <Column className="px-8 pb-8">
        <DashboardUserMenu />
      </Column>
    </Column>
  )
}
