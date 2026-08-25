import {
  Button,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
  Row,
} from "@nattstack/ui"
import { useMemo, useState, type JSX } from "react"
import { AvatarUser } from "#/components/avatar-user"
import { SettingsRow, SettingsSection } from "#/components/pages/settings/settings-section"
import {
  isCurrentUserWorkspaceAdmin,
  memberHandle,
  memberRoleLabel,
  setMemberTeam,
  type Member,
} from "#/data/members"
import { listMembersAvailableForTeam, listTeamMembers, type Team } from "#/data/teams"

interface MemberOption {
  label: string
  value: string
}

interface SettingsTeamMemberRowProps {
  canRemove: boolean
  member: Member
  onRemove: () => Promise<void> | void
}

interface SettingsTeamMembersProps {
  team: Team
}

export function SettingsTeamMembers(props: SettingsTeamMembersProps): JSX.Element {
  const { team } = props
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)
  const [members, setMembers] = useState(() => listTeamMembers(team.workspaceId, team.id))
  const isAdmin = isCurrentUserWorkspaceAdmin(team.workspaceId)
  const availableMembers = listMembersAvailableForTeam(team.workspaceId, team.id)
  const items: MemberOption[] = useMemo(
    () =>
      listMembersAvailableForTeam(team.workspaceId, team.id)
        .filter((member) => members.every((onTeam) => onTeam.id !== member.id))
        .map((member) => ({
          label: member.name,
          value: member.id,
        })),
    [members, team.id, team.workspaceId],
  )

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue: MemberOption | null = null

  function onAdd(memberId: string): void {
    setMemberTeam({
      memberId,
      teamId: team.id,
      workspaceId: team.workspaceId,
    })
    setIsComboboxOpen(false)
    setMembers(listTeamMembers(team.workspaceId, team.id))
  }

  function onRemove(member: Member): void {
    setMemberTeam({
      memberId: member.id,
      teamId: undefined,
      workspaceId: team.workspaceId,
    })
    setMembers(listTeamMembers(team.workspaceId, team.id))
  }

  return (
    <SettingsSection title="Members">
      {isAdmin && (
        <SettingsRow
          description="People can only be on one team. Adding someone moves them here."
          label="Add a member"
        >
          <Combobox<MemberOption>
            items={items}
            onOpenChange={setIsComboboxOpen}
            onValueChange={(nextValue) => {
              if (nextValue !== null) {
                onAdd(nextValue.value)
              }
            }}
            open={isComboboxOpen}
            value={selectedValue}
          >
            <ComboboxTrigger
              className="
                w-240
                max-768:w-full
              "
              size={36}
            >
              <ComboboxValue placeholder="Search a member to add" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxSearch placeholder="Search members" />
              <ComboboxEmpty>
                {items.length === 0 ? "Every member is already on this team." : "No members found."}
              </ComboboxEmpty>
              <ComboboxList>
                {(item: MemberOption) => (
                  <ComboboxItem key={item.value} value={item}>
                    <Row className="items-center gap-8">
                      <MemberOptionAvatar memberId={item.value} members={availableMembers} />
                      <span className="truncate">{item.label}</span>
                    </Row>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </SettingsRow>
      )}
      {members.length === 0 ? (
        <SettingsRow description="No members have joined this team yet." label="Members">
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        members.map((member) => (
          <SettingsTeamMemberRow
            canRemove={isAdmin}
            key={member.id}
            member={member}
            onRemove={() => onRemove(member)}
          />
        ))
      )}
    </SettingsSection>
  )
}

function MemberAvatar(props: { member: Member }): JSX.Element {
  const { member } = props

  if (member.avatar === undefined) {
    return (
      <span
        aria-hidden
        className="
          flex size-32 shrink-0 items-center justify-center rounded-full
          bg-gray-4 text-12 font-500 text-text-secondary
        "
      >
        {memberInitials(member.name)}
      </span>
    )
  }

  return <AvatarUser alt={member.name} src={member.avatar} />
}

function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/u).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""

  return `${first}${last}`.toUpperCase()
}

function MemberOptionAvatar(props: { memberId: string; members: Member[] }): JSX.Element {
  const member = props.members.find((entry) => entry.id === props.memberId)

  if (member === undefined) {
    return <></>
  }

  return <MemberAvatar member={member} />
}

function SettingsTeamMemberRow(props: SettingsTeamMemberRowProps): JSX.Element {
  const { canRemove, member, onRemove } = props

  return (
    <SettingsRow
      description={`${memberHandle(member)} · ${memberRoleLabel(member.role)}`}
      label={member.name}
      leading={<MemberAvatar member={member} />}
    >
      {canRemove ? (
        <Button label="Remove" onClick={onRemove} size={32} variant="ghost" />
      ) : undefined}
    </SettingsRow>
  )
}
