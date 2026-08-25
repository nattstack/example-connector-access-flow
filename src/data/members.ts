import { getCurrentUser, type User } from "#/data/user"

export interface Member {
  avatar?: string
  email: string
  id: string
  name: string
  role: MemberRole
  workspaceId: number
}

export type MemberRole = "Admin" | "Member"

const CURRENT_USER_MEMBER_ID = "current-user"

const MOCK_MEMBERS: Member[] = [
  {
    email: "jordan@example.com",
    id: "6c2d1a8e-3f90-4b17-8d4e-2a9c7f1b5e20",
    name: "Jordan Hale",
    role: "Member",
    workspaceId: 1,
  },
  {
    email: "riley@example.com",
    id: "8e4f3c0a-5b12-4d39-9f6a-4c1e8a3d7b44",
    name: "Riley Chen",
    role: "Member",
    workspaceId: 1,
  },
  {
    email: "casey@example.com",
    id: "1a9b7d4c-2e56-4f80-b3c1-7d5e2a8f0c63",
    name: "Casey Novak",
    role: "Admin",
    workspaceId: 1,
  },
  {
    email: "avery@example.com",
    id: "2b0c8e5d-3f67-4091-c4d2-8e6f3b9a1d74",
    name: "Avery Kim",
    role: "Member",
    workspaceId: 2,
  },
  {
    email: "morgan@example.com",
    id: "3c1d9f6e-4078-41a2-d5e3-9f7a4c0b2e85",
    name: "Morgan Ellis",
    role: "Admin",
    workspaceId: 2,
  },
  {
    email: "harper@example.com",
    id: "4d2e0a7f-5189-42b3-e6f4-0a8b5d1c3f96",
    name: "Harper Diaz",
    role: "Member",
    workspaceId: 3,
  },
  {
    email: "sage@example.com",
    id: "5e3f1b80-629a-43c4-f705-1b9c6e2d40a7",
    name: "Sage Okonkwo",
    role: "Member",
    workspaceId: 3,
  },
  {
    email: "rowan@example.com",
    id: "6f402c91-73ab-44d5-0816-2c0d7f3e51b8",
    name: "Rowan Blake",
    role: "Admin",
    workspaceId: 3,
  },
  {
    email: "quinn@example.com",
    id: "70513da2-84bc-45e6-1927-3d1e804f62c9",
    name: "Quinn Patel",
    role: "Member",
    workspaceId: 3,
  },
  {
    email: "cameron@example.com",
    id: "81624eb3-95cd-46f7-2a38-4e2f915a73da",
    name: "Cameron Walsh",
    role: "Member",
    workspaceId: 4,
  },
  {
    email: "jules@example.com",
    id: "92735fc4-a6de-4708-3b49-5f30a26b84eb",
    name: "Jules Moreau",
    role: "Admin",
    workspaceId: 4,
  },
]

export function listMembersByWorkspaceId(workspaceId: number): Member[] {
  const workspaceMembers = MOCK_MEMBERS.filter((member) => member.workspaceId === workspaceId)

  return [memberFromCurrentUser(getCurrentUser(), workspaceId), ...workspaceMembers]
}

function memberFromCurrentUser(user: User, workspaceId: number): Member {
  return {
    avatar: user.avatar,
    email: user.email,
    id: CURRENT_USER_MEMBER_ID,
    name: user.name,
    role: "Admin",
    workspaceId,
  }
}
