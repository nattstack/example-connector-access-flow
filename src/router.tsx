import { createRouter, RouterProvider } from "@tanstack/react-router"
import type { JSX } from "react"
import { routeTree } from "#/routeTree.gen.ts"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  defaultPreload: "intent",
  routeTree,
  scrollRestoration: true,
})

export function AppRouter(): JSX.Element {
  return <RouterProvider router={router} />
}
