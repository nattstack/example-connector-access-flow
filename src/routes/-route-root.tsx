import { HeadContent, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import type { JSX } from "react"
import { createPortal } from "react-dom"
import { Providers } from "#/components/providers"
import { ENVIRONMENT } from "#/utils/environment"

export function RouteRoot(): JSX.Element {
  return (
    <Providers>
      {createPortal(<HeadContent />, document.head)}

      <Outlet />

      {ENVIRONMENT.IS_DEVELOPMENT && <TanStackRouterDevtools position="bottom-right" />}
    </Providers>
  )
}
