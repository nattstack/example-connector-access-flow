import { createRootRoute } from "@tanstack/react-router"
import { RouteNotFound } from "#/routes/-route-not-found"
import { RouteRoot } from "#/routes/-route-root"

export const Route = createRootRoute({
  component: RouteRoot,
  notFoundComponent: RouteNotFound,
})
