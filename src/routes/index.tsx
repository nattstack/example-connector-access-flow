import { createFileRoute, redirect } from "@tanstack/react-router"
import { getDefaultWorkspace } from "#/data/workspaces"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      params: { workspaceSlug: getDefaultWorkspace().slug },
      to: "/$workspaceSlug",
    })
  },
})
