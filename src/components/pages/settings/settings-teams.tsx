import { IconChevronRightOutline18 } from "@nattstack/icons"
import { Button, Row, Spacer } from "@nattstack/ui"
import { useNavigate, useParams, useRouteContext, useRouter } from "@tanstack/react-router"
import { useState, type JSX } from "react"
import { DialogAddTeam } from "#/components/pages/settings/dialog-add-team"
import {
  SettingsLinkRow,
  SettingsRow,
  SettingsSection,
} from "#/components/pages/settings/settings-section"
import { isCurrentUserWorkspaceAdmin } from "#/data/members"
import { createTeam, type TeamWithAgents } from "#/data/teams"

interface SettingsTeamRowProps {
  item: TeamWithAgents
}

interface SettingsTeamsProps {
  items: TeamWithAgents[]
}

export function SettingsTeams(props: SettingsTeamsProps): JSX.Element {
  const { items } = props
  const { workspace } = useRouteContext({ from: "/$workspaceSlug" })
  const navigate = useNavigate()
  const router = useRouter()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const isAdmin = isCurrentUserWorkspaceAdmin(workspace.id)

  async function onAdd(input: { description: string; name: string }): Promise<void> {
    const team = createTeam({
      description: input.description,
      name: input.name,
      workspaceId: workspace.id,
    })

    await navigate({
      params: { teamSlug: team.slug, workspaceSlug: workspace.slug },
      to: "/$workspaceSlug/settings/teams/$teamSlug",
    })
    await router.invalidate()
  }

  return (
    <>
      <Row className="items-center justify-between gap-12">
        <h1 className="text-30">Teams</h1>
        {isAdmin && (
          <Button
            label="Add a team"
            onClick={() => setIsAddOpen(true)}
            size={36}
            variant="primary"
          />
        )}
      </Row>
      <Spacer height={24} />

      <SettingsSection>
        {items.length === 0 ? (
          <SettingsRow description="No teams in this workspace yet." label="Teams">
            <span className="text-14 text-text-secondary">None</span>
          </SettingsRow>
        ) : (
          items.map((item) => <SettingsTeamRow item={item} key={item.team.id} />)
        )}
      </SettingsSection>

      {isAdmin && <DialogAddTeam isOpen={isAddOpen} onAdd={onAdd} onIsOpenChange={setIsAddOpen} />}
    </>
  )
}

function formatCountLabel(count: number, singular: string, plural: string): string {
  return count === 1 ? `1 ${singular}` : `${String(count)} ${plural}`
}

function formatTeamRosterLabel(memberCount: number, agentCount: number): string {
  return `${formatCountLabel(memberCount, "member", "members")} · ${formatCountLabel(agentCount, "agent", "agents")}`
}

function SettingsTeamRow(props: SettingsTeamRowProps): JSX.Element {
  const { item } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  return (
    <SettingsLinkRow
      description={formatTeamRosterLabel(item.members.length, item.agents.length)}
      label={item.team.name}
      link={{
        params: { teamSlug: item.team.slug, workspaceSlug },
        to: "/$workspaceSlug/settings/teams/$teamSlug",
      }}
    >
      <IconChevronRightOutline18 className="text-gray-9" />
    </SettingsLinkRow>
  )
}
