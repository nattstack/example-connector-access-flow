import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsWorkspaceName } from "#/components/pages/settings/settings-workspace-name"

export const Route = createFileRoute("/$workspaceSlug/settings/workspace")({
  component: function SettingsWorkspacePage(): JSX.Element {
    return (
      <>
        <h1 className="text-30">Workspace</h1>
        <Spacer height={16} />

        <SettingsWorkspaceName />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Workspace · Settings",
      },
    ],
  }),
})
