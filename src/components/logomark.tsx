import type { JSX, SVGProps } from "react"

export function Logomark(props: SVGProps<SVGSVGElement>): JSX.Element {
  const { className = "text-text-primary", ...rest } = props

  return (
    <svg
      className={`fill-current ${className}`.trim()}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M15.2256 0C22.4513 0 24 1.5487 24 8.77441V15.2256C24 22.4513 22.4513 24 15.2256 24H8.77441C1.5487 24 0 22.4513 0 15.2256V8.77441C0 1.5487 1.5487 0 8.77441 0H15.2256ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
    </svg>
  )
}
