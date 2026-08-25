import { Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import { SettingsMembers } from "#/components/pages/settings/settings-members"
import { listMembersByWorkspaceId } from "#/data/members"

export const Route = createFileRoute("/$workspaceSlug/settings/members")({
  component: function SettingsMembersPage(): JSX.Element {
    const { members } = Route.useLoaderData()

    return (
      <>
        <h1 className="text-30">Members</h1>
        <Spacer height={24} />

        <SettingsMembers members={members} />
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
  loader: ({ context }) => ({
    members: listMembersByWorkspaceId(context.workspace.id),
  }),
})
