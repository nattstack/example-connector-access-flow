import { getCurrentUser, type User } from "#/data/user"

export interface Member {
  avatar?: string
  email: string
  id: string
  name: string
  role: MemberRole
}

export type MemberRole = "Admin" | "Member"

const CURRENT_USER_MEMBER_ID = "current-user"

const MOCK_MEMBERS: Member[] = [
  {
    email: "jordan@example.com",
    id: "6c2d1a8e-3f90-4b17-8d4e-2a9c7f1b5e20",
    name: "Jordan Hale",
    role: "Member",
  },
  {
    email: "riley@example.com",
    id: "8e4f3c0a-5b12-4d39-9f6a-4c1e8a3d7b44",
    name: "Riley Chen",
    role: "Member",
  },
  {
    email: "casey@example.com",
    id: "1a9b7d4c-2e56-4f80-b3c1-7d5e2a8f0c63",
    name: "Casey Novak",
    role: "Admin",
  },
]

export function listMembers(): Member[] {
  return [memberFromCurrentUser(getCurrentUser()), ...MOCK_MEMBERS]
}

function memberFromCurrentUser(user: User): Member {
  return {
    avatar: user.avatar,
    email: user.email,
    id: CURRENT_USER_MEMBER_ID,
    name: user.name,
    role: "Admin",
  }
}
