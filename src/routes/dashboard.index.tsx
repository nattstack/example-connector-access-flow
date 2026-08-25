import { Column, Spacer } from "@nattstack/ui"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"

export const Route = createFileRoute("/dashboard/")({
  component: function DashboardPage(): JSX.Element {
    return (
      <Column className="px-32 py-32">
        <h1 className="text-24 font-500 text-text-primary">Dashboard</h1>

        <Spacer height={8} />

        <p className="text-14 text-text-secondary">
          Choose an agent from the sidebar to open a chat.
        </p>
      </Column>
    )
  },
})
