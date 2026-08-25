import { IconChevronDownOutline18, IconMagnifierOutline18 } from "@nattstack/icons"
import {
  Button,
  Column,
  Input,
  Row,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
} from "@nattstack/ui"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarUser } from "#/components/avatar-user"
import { DialogAddMember } from "#/components/pages/settings/dialog-add-member"
import {
  inviteMember,
  memberHandle,
  memberRoleLabel,
  type Member,
  type MemberRole,
} from "#/data/members"

type RoleFilter = "All" | MemberRole

interface SettingsMemberRowProps {
  member: Member
}

interface SettingsMembersProps {
  members: Member[]
}
type SortDirection = "asc" | "desc"

export function SettingsMembers(props: SettingsMembersProps): JSX.Element {
  const { members } = props
  const { workspace } = useRouteContext({ from: "/$workspaceSlug" })
  const router = useRouter()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All")
  const [search, setSearch] = useState("")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const visibleMembers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return members
      .filter((member) => {
        if (roleFilter !== "All" && member.role !== roleFilter) {
          return false
        }

        if (query.length === 0) {
          return true
        }

        return (
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          memberHandle(member).toLowerCase().includes(query)
        )
      })
      .toSorted((left, right) => {
        const result = left.name.localeCompare(right.name)

        return sortDirection === "asc" ? result : -result
      })
  }, [members, roleFilter, search, sortDirection])

  return (
    <Column as="section">
      <Row className="items-center" flexWrap="wrap" gap={8}>
        <Row className="min-w-0 flex-1 items-center" gap={8}>
          <div className="relative min-w-0 flex-1">
            <IconMagnifierOutline18
              className="
                pointer-events-none absolute top-1/2 left-12 -translate-y-1/2
                text-gray-9
              "
            />
            <Input
              aria-label="Search members"
              className="w-full pl-36"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email"
              size={36}
              value={search}
            />
          </div>
          <Select
            onValueChange={(nextFilter) => {
              if (nextFilter !== null) {
                setRoleFilter(nextFilter)
              }
            }}
            value={roleFilter}
          >
            <SelectTrigger className="w-auto shrink-0" size={36}>
              <SelectValue>{roleFilterLabel(roleFilter)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Admin">{memberRoleLabel("Admin")}</SelectItem>
              <SelectItem value="Member">{memberRoleLabel("Member")}</SelectItem>
            </SelectContent>
          </Select>
        </Row>
        <Button
          label="Add a member"
          onClick={() => setIsAddOpen(true)}
          size={36}
          variant="primary"
        />
      </Row>
      <Spacer height={24} />

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th
              aria-sort={sortDirection === "asc" ? "ascending" : "descending"}
              className="w-[40%] py-12 text-left"
            >
              <button
                aria-label={
                  sortDirection === "asc" ? "Sort by name descending" : "Sort by name ascending"
                }
                className="
                  inline-flex cursor-pointer items-center border-0
                  bg-transparent p-0 text-12 font-500 text-text-secondary
                "
                onClick={() =>
                  setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"))
                }
                type="button"
              >
                Name
                <Spacer width={4} />
                <IconChevronDownOutline18
                  className={sortDirection === "desc" ? "rotate-180" : undefined}
                  size={12}
                  strokeWidth={2}
                />
              </button>
            </th>
            <th
              className="
                w-[38%] py-12 text-left text-12 font-500 text-text-secondary
              "
            >
              Email
            </th>
            <th
              className="
                w-[22%] py-12 text-left text-12 font-500 text-text-secondary
              "
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleMembers.length === 0 ? (
            <tr>
              <td className="py-24 text-14 text-text-secondary" colSpan={3}>
                No members match your search.
              </td>
            </tr>
          ) : (
            visibleMembers.map((member) => <SettingsMemberRow key={member.id} member={member} />)
          )}
        </tbody>
      </table>

      <DialogAddMember
        isOpen={isAddOpen}
        onAdd={async (input) => {
          inviteMember({
            ...input,
            workspaceId: workspace.id,
          })
          await router.invalidate()
        }}
        onIsOpenChange={setIsAddOpen}
      />
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

function BadgeMemberRole(props: { role: MemberRole }): JSX.Element {
  const { role } = props

  return (
    <span
      className={
        role === "Admin"
          ? `
            inline-flex h-24 shrink-0 items-center rounded-6 bg-primary-3 px-8
            text-12 font-500 text-primary-11
          `
          : `
            inline-flex h-24 shrink-0 items-center rounded-6 bg-gray-4 px-8
            text-12 font-500 text-text-secondary
          `
      }
    >
      {memberRoleLabel(role)}
    </span>
  )
}

function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/u).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""

  return `${first}${last}`.toUpperCase()
}

function roleFilterLabel(filter: RoleFilter): string {
  return filter === "All" ? "All" : memberRoleLabel(filter)
}

function SettingsMemberRow(props: SettingsMemberRowProps): JSX.Element {
  const { member } = props

  return (
    <tr
      className="
        border-b border-border
        last:border-b-0
      "
    >
      <td className="py-12">
        <Row className="min-w-0 items-center">
          {member.avatar === undefined ? (
            <AvatarMemberFallback name={member.name} />
          ) : (
            <AvatarUser alt={member.name} src={member.avatar} />
          )}
          <Spacer width={12} />

          <Column className="min-w-0">
            <span className="truncate text-14 font-500 text-text-primary">{member.name}</span>
            <span className="truncate text-13 text-text-secondary">{memberHandle(member)}</span>
          </Column>
        </Row>
      </td>
      <td className="truncate py-12 text-14 text-text-secondary">{member.email}</td>
      <td className="py-12">
        <BadgeMemberRole role={member.role} />
      </td>
    </tr>
  )
}
