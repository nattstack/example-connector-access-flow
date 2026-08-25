import { createRootRoute } from "@tanstack/react-router"
import { PageNotFound } from "#/components/page-not-found"
import { PageRoot } from "#/components/page-root"

export const Route = createRootRoute({
  component: PageRoot,
  notFoundComponent: PageNotFound,
})
