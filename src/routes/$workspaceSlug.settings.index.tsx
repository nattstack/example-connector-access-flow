import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/$workspaceSlug/settings/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      params: { workspaceSlug: params.workspaceSlug },
      to: "/$workspaceSlug/settings/members",
    })
  },
})
