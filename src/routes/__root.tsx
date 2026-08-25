import { createRootRoute } from "@tanstack/react-router"
import { RouteNotFound } from "#/routes/-route-not-found"
import { RouteRoot } from "#/routes/-route-root"
import { RouteRootHead } from "#/routes/-route-root-head"

export const Route = createRootRoute({
  component: RouteRoot,
  head: RouteRootHead,
  notFoundComponent: RouteNotFound,
})
