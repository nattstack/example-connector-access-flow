export interface Project {
  connectorCount: number
  description: string
  id: string
  name: string
  owner: string
  status: ProjectStatus
  updatedAt: string
}

export type ProjectStatus = "active" | "paused" | "setup"

export const projects: Project[] = [
  {
    connectorCount: 4,
    description: "Warehouse sync and billing events for the core product.",
    id: "aurora",
    name: "Aurora",
    owner: "Maya Chen",
    status: "active",
    updatedAt: "2 hours ago",
  },
  {
    connectorCount: 2,
    description: "Support inbox, ticket routing, and customer identity.",
    id: "harbor",
    name: "Harbor",
    owner: "Jonah Hale",
    status: "setup",
    updatedAt: "Yesterday",
  },
  {
    connectorCount: 6,
    description: "Marketing attribution and campaign destination access.",
    id: "lumen",
    name: "Lumen",
    owner: "Priya Shah",
    status: "paused",
    updatedAt: "4 days ago",
  },
]

export function getProjectById(projectId: string): Project | undefined {
  return projects.find((project) => project.id === projectId)
}

export function getProjectStatusLabel(status: ProjectStatus): string {
  if (status === "active") {
    return "Active"
  }

  if (status === "paused") {
    return "Paused"
  }

  return "Setup"
}
