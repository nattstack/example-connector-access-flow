import { Column } from "@nattstack/ui"
import type { JSX, PropsWithChildren, ReactNode } from "react"

interface LayoutMainProps extends PropsWithChildren {
  leading?: ReactNode
}

export function LayoutMain(props: LayoutMainProps): JSX.Element {
  const { children, leading } = props

  return (
    <Column className="min-h-0 flex-1 overflow-y-auto px-16">
      {leading !== undefined && (
        <div className="
          sticky top-16 z-10 mt-16 -mb-48 h-32 w-fit bg-bg-shell-outer
        ">
          {leading}
        </div>
      )}
      <Column
        className={`
          mx-auto w-full max-w-640 pt-48 pb-64
          ${leading === undefined ? "max-768:pt-24" : ""}
          max-768:pb-48
        `}
      >
        {children}
      </Column>
    </Column>
  )
}
