import type { JSX } from "react"

interface DashboardSidebarLabelProps {
  label: string
}

export function DashboardSidebarLabel(props: DashboardSidebarLabelProps): JSX.Element {
  const { label } = props

  return <span className="px-8 text-12 font-500">{label}</span>
}
