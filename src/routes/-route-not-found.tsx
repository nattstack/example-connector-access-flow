import { Spacer } from "@nattstack/ui"
import type { JSX } from "react"

export function RouteNotFound(): JSX.Element {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-24">
      <h1 className="text-24 font-500 text-text-primary">Page not found</h1>

      <Spacer className="h-8" />

      <p className="text-14 text-text-secondary">That route does not exist.</p>
    </main>
  )
}
