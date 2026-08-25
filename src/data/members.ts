import { getCurrentUser, type User } from "#/data/user"

export interface Member {
  avatar?: string
  email: string
  id: string
  name: string
  role: MemberRole
  teamId?: string
  workspaceId: number
}

export type MemberRole = "Admin" | "Member"

const CURRENT_USER_MEMBER_ID = "current-user"

const CURRENT_USER_ROLE_BY_WORKSPACE_ID: Record<number, MemberRole> = {
  1: "Admin",
  2: "Member",
}

const CURRENT_USER_TEAM_ID_BY_WORKSPACE_ID: Partial<Record<number, string>> = {
  1: "a3f1c8e2-4b7d-4e91-9c2a-1f6b8d0e3a11",
}

const MOCK_MEMBERS: Member[] = [
  {
    email: "jordan@example.com",
    id: "6c2d1a8e-3f90-4b17-8d4e-2a9c7f1b5e20",
    name: "Jordan Hale",
    role: "Member",
    teamId: "a3f1c8e2-4b7d-4e91-9c2a-1f6b8d0e3a11",
    workspaceId: 1,
  },
  {
    email: "riley@example.com",
    id: "8e4f3c0a-5b12-4d39-9f6a-4c1e8a3d7b44",
    name: "Riley Chen",
    role: "Member",
    teamId: "7955dd9a-c8f4-4faf-9103-a054ed33789e",
    workspaceId: 1,
  },
  {
    email: "casey@example.com",
    id: "1a9b7d4c-2e56-4f80-b3c1-7d5e2a8f0c63",
    name: "Casey Novak",
    role: "Member",
    teamId: "a3f1c8e2-4b7d-4e91-9c2a-1f6b8d0e3a11",
    workspaceId: 1,
  },
  {
    email: "alex@example.com",
    id: "a38460d5-b7ef-4819-4c5a-6041b37c95fc",
    name: "Alex Bell",
    role: "Member",
    teamId: "7955dd9a-c8f4-4faf-9103-a054ed33789e",
    workspaceId: 1,
  },
  {
    email: "cameron@example.com",
    id: "81624eb3-95cd-46f7-2a38-4e2f915a73da",
    name: "Cameron Walsh",
    role: "Member",
    teamId: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    workspaceId: 2,
  },
  {
    email: "jules@example.com",
    id: "92735fc4-a6de-4708-3b49-5f30a26b84eb",
    name: "Jules Moreau",
    role: "Member",
    teamId: "e7b5a2c6-8f1b-4235-da6e-5b0f2b4c7e55",
    workspaceId: 2,
  },
  {
    email: "alex@example.com",
    id: "d6b79308-ea12-4b4c-7f8d-9374e6afc82f",
    name: "Alex Bell",
    role: "Admin",
    teamId: "d6a4f1b5-7e0a-4124-cf5d-4a9e1a3b6d44",
    workspaceId: 2,
  },
]

export function getCurrentUserRole(workspaceId: number): MemberRole {
  return CURRENT_USER_ROLE_BY_WORKSPACE_ID[workspaceId] ?? "Member"
}

export function inviteMember(input: {
  email: string
  role: MemberRole
  workspaceId: number
}): Member {
  const email = input.email.trim().toLowerCase()

  if (!isMemberEmail(email)) {
    throw new Error("Expected a valid member email")
  }

  const alreadyInvited = listMembersByWorkspaceId(input.workspaceId).some(
    (member) => member.email === email,
  )

  if (alreadyInvited) {
    throw new Error("A member with this email is already in the workspace")
  }

  const member: Member = {
    email,
    id: crypto.randomUUID(),
    name: nameFromEmail(email),
    role: input.role,
    workspaceId: input.workspaceId,
  }

  MOCK_MEMBERS.push(member)

  return member
}

export function isCurrentUserWorkspaceAdmin(workspaceId: number): boolean {
  return getCurrentUserRole(workspaceId) === "Admin"
}

export function listMembersByWorkspaceId(workspaceId: number): Member[] {
  const workspaceMembers = MOCK_MEMBERS.filter((member) => member.workspaceId === workspaceId)

  return [memberFromCurrentUser(getCurrentUser(), workspaceId), ...workspaceMembers]
}

export function memberHandle(member: Member): string {
  const [localPart] = member.email.split("@")

  return localPart ?? member.name.toLowerCase()
}

export function memberRoleLabel(role: MemberRole): string {
  return role === "Admin" ? "Workspace admin" : "Member"
}

export function setMemberTeam(input: {
  memberId: string
  teamId: string | undefined
  workspaceId: number
}): Member {
  if (!isCurrentUserWorkspaceAdmin(input.workspaceId)) {
    throw new Error("Only workspace admins can edit teams")
  }

  if (input.memberId === CURRENT_USER_MEMBER_ID) {
    CURRENT_USER_TEAM_ID_BY_WORKSPACE_ID[input.workspaceId] = input.teamId

    return memberFromCurrentUser(getCurrentUser(), input.workspaceId)
  }

  const member = MOCK_MEMBERS.find(
    (item) => item.workspaceId === input.workspaceId && item.id === input.memberId,
  )

  if (member === undefined) {
    throw new Error("Expected a member in this workspace")
  }

  if (input.teamId === undefined) {
    delete member.teamId
    return member
  }

  member.teamId = input.teamId

  return member
}

function isMemberEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+$/u.test(email)
}

function memberFromCurrentUser(user: User, workspaceId: number): Member {
  const teamId = CURRENT_USER_TEAM_ID_BY_WORKSPACE_ID[workspaceId]

  return {
    avatar: user.avatar,
    email: user.email,
    id: CURRENT_USER_MEMBER_ID,
    name: user.name,
    role: getCurrentUserRole(workspaceId),
    workspaceId,
    ...(teamId === undefined ? {} : { teamId }),
  }
}

function nameFromEmail(email: string): string {
  const [localPart] = email.split("@")
  const parts = (localPart ?? email).split(/[._-]+/u).filter(Boolean)

  if (parts.length === 0) {
    return email
  }

  return parts.map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" ")
}
