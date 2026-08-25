import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsMembers } from "#/components/pages/settings/settings-members"

export const Route = createFileRoute("/$workspaceSlug/settings/members")({
  component: function SettingsMembersPage(): JSX.Element {
    return (
      <>
        <h1 className="text-30">Members</h1>
        <Spacer height={16} />

        <SettingsMembers />
      </>
    )
  },
  head: () => ({
    meta: [
      {
        title: "Members · Settings",
      },
    ],
  }),
})
