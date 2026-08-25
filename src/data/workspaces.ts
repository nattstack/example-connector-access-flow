import { isCurrentUserWorkspaceAdmin } from "#/data/members"

export interface Workspace {
  id: number
  logo?: WorkspaceLogo
  name: string
  slug: string
}

export type WorkspaceLogo = "figma" | "vercel"

const workspaces: Workspace[] = [
  {
    id: 1,
    logo: "figma",
    name: "Figma (Flow #1)",
    slug: "figma",
  },
  {
    id: 2,
    logo: "vercel",
    name: "Vercel (Flow #2)",
    slug: "vercel",
  },
]

export function getDefaultWorkspace(): Workspace {
  const [workspace] = workspaces

  if (workspace === undefined) {
    throw new Error("Expected at least one mock workspace")
  }

  return workspace
}

export function getWorkspaceBySlug(workspaceSlug: string): undefined | Workspace {
  return workspaces.find((workspace) => workspace.slug === workspaceSlug)
}

export function listWorkspaces(): Workspace[] {
  return workspaces
}

export function renameWorkspace(workspaceSlug: string, name: string): Workspace {
  const workspace = getWorkspaceBySlug(workspaceSlug)

  if (workspace === undefined) {
    throw new Error(`Expected workspace ${workspaceSlug}`)
  }

  if (!isCurrentUserWorkspaceAdmin(workspace.id)) {
    throw new Error("Only workspace admins can edit this workspace")
  }

  workspace.name = name

  return workspace
}
