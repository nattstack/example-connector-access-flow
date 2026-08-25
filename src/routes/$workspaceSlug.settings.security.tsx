import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsPassword } from "#/components/pages/settings/settings-password"

export const Route = createFileRoute("/$workspaceSlug/settings/security")({
  component: function SettingsSecurityPage(): JSX.Element {
    return (
      <>
        <h1 className="text-30">Security</h1>
        <Spacer height={16} />

        <SettingsPassword />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Security · Settings",
      },
    ],
  }),
})
