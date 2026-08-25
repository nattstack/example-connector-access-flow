import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsEmail } from "#/components/pages/settings/settings-email"
import { SettingsName } from "#/components/pages/settings/settings-name"
import { SettingsProfileImage } from "#/components/pages/settings/settings-profile-image"

export const Route = createFileRoute("/$workspaceSlug/settings/profile")({
  component: function SettingsProfilePage(): JSX.Element {
    return (
      <>
        <h1 className="text-30">Profile</h1>
        <Spacer height={16} />

        <SettingsProfileImage />
        <Spacer height={16} />

        <SettingsName />
        <Spacer height={16} />

        <SettingsEmail />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Profile · Settings",
      },
    ],
  }),
})
