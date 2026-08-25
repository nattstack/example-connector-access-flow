import { Column, Label, Row, Spacer } from "@nattstack/ui"
import type { JSX, ReactNode } from "react"

interface SettingsRowProps {
  children: ReactNode
  description: string
  htmlFor?: string
  label: string
}

interface SettingsSectionProps {
  children: ReactNode
  title?: string
}

export function SettingsRow(props: SettingsRowProps): JSX.Element {
  const { children, description, htmlFor, label } = props

  return (
    <Row
      className="
        items-center justify-between gap-24 border-b border-border px-20 py-16
        last:border-b-0
      "
    >
      <Column className="min-w-0 flex-1">
        {htmlFor === undefined ? (
          <span className="text-14 font-500">{label}</span>
        ) : (
          <Label className="text-14 font-500" htmlFor={htmlFor}>
            {label}
          </Label>
        )}
        <Spacer height={4} />

        <p className="text-13 text-text-secondary">{description}</p>
      </Column>
      <div className="shrink-0">{children}</div>
    </Row>
  )
}

export function SettingsSection(props: SettingsSectionProps): JSX.Element {
  const { children, title } = props

  return (
    <Column as="section">
      {title !== undefined && (
        <>
          <h2 className="text-14 font-500">{title}</h2>
          <Spacer height={8} />
        </>
      )}
      <Column
        className="
          overflow-hidden rounded-16 border border-border bg-bg-shell-inner
          shadow-2
        "
      >
        {children}
      </Column>
    </Column>
  )
}
