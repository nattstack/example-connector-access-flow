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
import { useRouter } from "@tanstack/react-router"
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
import { getTeamById, listMembersAvailableForTeam, type Team } from "#/data/teams"

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
  members: Member[]
  team: Team
}

export function SettingsTeamMembers(props: SettingsTeamMembersProps): JSX.Element {
  const { members, team } = props
  const router = useRouter()
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)
  const isAdmin = isCurrentUserWorkspaceAdmin(team.workspaceId)
  const availableMembers = listMembersAvailableForTeam(team.workspaceId, team.id)
  const items: MemberOption[] = useMemo(
    () =>
      availableMembers.map((member) => ({
        label: member.name,
        value: member.id,
      })),
    [availableMembers],
  )

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue: MemberOption | null = null

  async function onAdd(memberId: string): Promise<void> {
    setMemberTeam({
      memberId,
      teamId: team.id,
      workspaceId: team.workspaceId,
    })
    setIsComboboxOpen(false)
    await router.invalidate()
  }

  async function onRemove(member: Member): Promise<void> {
    setMemberTeam({
      memberId: member.id,
      teamId: undefined,
      workspaceId: team.workspaceId,
    })
    await router.invalidate()
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
            onValueChange={async (nextValue) => {
              if (nextValue !== null) {
                await onAdd(nextValue.value)
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
                {(item: MemberOption) => {
                  const member = availableMembers.find((entry) => entry.id === item.value)

                  if (member === undefined) {
                    return <></>
                  }

                  return (
                    <ComboboxItem key={item.value} value={item}>
                      <Row className="items-center gap-8">
                        <MemberAvatar member={member} />
                        <span className="truncate">
                          {item.label} · {memberTeamLabel(member)}
                        </span>
                      </Row>
                    </ComboboxItem>
                  )
                }}
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

function memberTeamLabel(member: Member): string {
  if (member.teamId === undefined) {
    return "No team"
  }

  return getTeamById(member.workspaceId, member.teamId)?.name ?? "No team"
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
