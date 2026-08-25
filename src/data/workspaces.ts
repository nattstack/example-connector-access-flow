export interface Workspace {
  id: string
  name: string
}

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: "apple",
    name: "Apple (Flow #1)",
  },
  {
    id: "banana",
    name: "Banana (Flow #2)",
  },
  {
    id: "cherry",
    name: "Cherry (Flow #3)",
  },
  {
    id: "dragon-fruit",
    name: "Dragon fruit (Flow #4)",
  },
]

export function createWorkspaceId(name: string, existing: Workspace[]): string {
  const base =
    name
      .toLowerCase()
      .normalize("NFKD")
      .replaceAll(/[\u0300-\u036F]/gu, "")
      .replaceAll(/[^a-z0-9]+/gu, "-")
      .replaceAll(/^-+|-+$/gu, "") || "workspace"

  const taken = new Set(existing.map((workspace) => workspace.id))

  if (!taken.has(base)) {
    return base
  }

  let suffix = 2

  while (taken.has(`${base}-${suffix}`)) {
    suffix += 1
  }

  return `${base}-${suffix}`
}

export function getDefaultWorkspace(): Workspace {
  const [workspace] = MOCK_WORKSPACES

  if (workspace === undefined) {
    throw new Error("Expected at least one mock workspace")
  }

  return workspace
}
