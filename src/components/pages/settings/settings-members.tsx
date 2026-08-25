import { Column, Spacer } from "@nattstack/ui"
import type { JSX } from "react"
import { AvatarUser } from "#/components/avatar-user"
import type { Member } from "#/data/members"
import { useCurrentUser } from "#/data/user"

interface SettingsMembersProps {
  members: Member[]
}

export function SettingsMembers(props: SettingsMembersProps): JSX.Element {
  const { members } = props
  const user = useCurrentUser()

  return (
    <Column
      as="section"
      className="
        rounded-16 border border-border bg-bg-shell-inner p-24 shadow-2
      "
    >
      <h2 className="text-24">Members</h2>
      <Spacer height={8} />

      <p className="text-14 text-text-secondary">People who can access this workspace.</p>
      <Spacer height={16} />

      <Column as="ul" className="gap-y-4">
        {members.map((member) => (
          <SettingsMemberRow
            isCurrentUser={member.email === user.email}
            key={member.id}
            member={member}
          />
        ))}
      </Column>
    </Column>
  )
}

function AvatarMemberFallback(props: { name: string }): JSX.Element {
  const { name } = props

  return (
    <span
      aria-hidden
      className="
        flex size-32 shrink-0 items-center justify-center rounded-full bg-gray-4
        text-12 font-500 text-text-secondary
      "
    >
      {memberInitials(name)}
    </span>
  )
}

function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/u).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""

  return `${first}${last}`.toUpperCase()
}

function SettingsMemberRow(props: { isCurrentUser: boolean; member: Member }): JSX.Element {
  const { isCurrentUser, member } = props

  return (
    <li className="flex min-h-56 items-center rounded-12 px-12">
      {member.avatar === undefined ? (
        <AvatarMemberFallback name={member.name} />
      ) : (
        <AvatarUser alt={member.name} src={member.avatar} />
      )}
      <Spacer width={8} />

      <Column className="min-w-0 flex-1">
        <span className="truncate text-14 font-500 text-text-primary">
          {member.name}
          {isCurrentUser ? " (you)" : ""}
        </span>
        <span className="truncate text-13 text-text-secondary">{member.email}</span>
      </Column>
      <Spacer width={8} />

      <span className="shrink-0 text-13 text-text-secondary">{member.role}</span>
    </li>
  )
}
