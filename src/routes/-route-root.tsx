import { HeadContent, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import type { JSX } from "react"
import { createPortal } from "react-dom"
import { ENVIRONMENT } from "#/utils/environment"

export function RouteRoot(): JSX.Element {
  return (
    <>
      {createPortal(<HeadContent />, document.head)}

      <Outlet />

      {ENVIRONMENT.IS_DEVELOPMENT && <TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}
