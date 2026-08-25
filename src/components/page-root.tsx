import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import type { JSX } from "react"
import { ENVIRONMENT } from "#/utils/environment"

export function PageRoot(): JSX.Element {
  return (
    <>
      <Outlet />

      {ENVIRONMENT.IS_DEVELOPMENT && <TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}
