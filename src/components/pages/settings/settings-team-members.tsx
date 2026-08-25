import type { JSX } from "react"
import { AvatarUser } from "#/components/avatar-user"
import { SettingsRow, SettingsSection } from "#/components/pages/settings/settings-section"
import { memberHandle, memberRoleLabel, type Member } from "#/data/members"

interface SettingsTeamMemberRowProps {
  member: Member
}

interface SettingsTeamMembersProps {
  members: Member[]
}

export function SettingsTeamMembers(props: SettingsTeamMembersProps): JSX.Element {
  const { members } = props

  return (
    <SettingsSection title="Members">
      {members.length === 0 ? (
        <SettingsRow description="No members have joined this team yet." label="Members">
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        members.map((member) => <SettingsTeamMemberRow key={member.id} member={member} />)
      )}
    </SettingsSection>
  )
}

function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/u).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""

  return `${first}${last}`.toUpperCase()
}

function SettingsTeamMemberRow(props: SettingsTeamMemberRowProps): JSX.Element {
  const { member } = props

  return (
    <SettingsRow
      description={`${memberHandle(member)} · ${memberRoleLabel(member.role)}`}
      label={member.name}
      leading={
        member.avatar === undefined ? (
          <span
            aria-hidden
            className="
              flex size-32 shrink-0 items-center justify-center rounded-full
              bg-gray-4 text-12 font-500 text-text-secondary
            "
          >
            {memberInitials(member.name)}
          </span>
        ) : (
          <AvatarUser alt={member.name} src={member.avatar} />
        )
      }
    />
  )
}
