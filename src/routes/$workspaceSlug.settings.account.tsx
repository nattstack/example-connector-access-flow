import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsDeleteAccount } from "#/components/pages/settings/settings-delete-account"

export const Route = createFileRoute("/$workspaceSlug/settings/account")({
  component: function SettingsAccountPage(): JSX.Element {
    return (
      <>
        <h1 className="text-30">Account</h1>
        <Spacer height={16} />

        <SettingsDeleteAccount />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Account · Settings",
      },
    ],
  }),
})
