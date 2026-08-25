import { Column } from "@nattstack/ui"
import type { JSX, PropsWithChildren } from "react"

export function LayoutMain(props: PropsWithChildren): JSX.Element {
  const { children } = props

  return (
    <Column className="min-h-0 flex-1 overflow-y-auto px-16">
      <Column
        className="
          mx-auto w-full max-w-640 pt-48 pb-64
          max-768:pt-24 max-768:pb-48
        "
      >
        {children}
      </Column>
    </Column>
  )
}
