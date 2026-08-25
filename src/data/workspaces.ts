export interface Workspace {
  id: number
  name: string
  slug: string
}

const workspaces: Workspace[] = [
  {
    id: 1,
    name: "Apple (Flow #1)",
    slug: "apple",
  },
  {
    id: 2,
    name: "Banana (Flow #2)",
    slug: "banana",
  },
  {
    id: 3,
    name: "Cherry (Flow #3)",
    slug: "cherry",
  },
  {
    id: 4,
    name: "Dragon fruit (Flow #4)",
    slug: "dragon-fruit",
  },
]

export function createWorkspace(name: string): Workspace {
  const slug = createWorkspaceSlug(name, workspaces)
  const workspace: Workspace = {
    id: nextWorkspaceId(workspaces),
    name,
    slug,
  }

  workspaces.push(workspace)

  return workspace
}

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

  workspace.name = name

  return workspace
}

function createWorkspaceSlug(name: string, existing: Workspace[]): string {
  const base =
    name
      .toLowerCase()
      .normalize("NFKD")
      .replaceAll(/[\u0300-\u036F]/gu, "")
      .replaceAll(/[^a-z0-9]+/gu, "-")
      .replaceAll(/^-+|-+$/gu, "") || "workspace"

  const taken = new Set(existing.map((workspace) => workspace.slug))

  if (!taken.has(base)) {
    return base
  }

  let suffix = 2

  while (taken.has(`${base}-${suffix}`)) {
    suffix += 1
  }

  return `${base}-${suffix}`
}

function nextWorkspaceId(existing: Workspace[]): number {
  return Math.max(0, ...existing.map((workspace) => workspace.id)) + 1
}
