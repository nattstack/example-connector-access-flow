import { Column, Label, Row, Spacer } from "@nattstack/ui"
import { Link } from "@tanstack/react-router"
import type { JSX, ReactNode } from "react"

interface SettingsLinkRowProps {
  children?: ReactNode
  description: string
  label: string
  leading?: ReactNode
  link:
    | {
        params: { agentId: string; workspaceSlug: string }
        to: "/$workspaceSlug/agents/$agentId"
      }
    | {
        params: { connectorId: string; workspaceSlug: string }
        to: "/$workspaceSlug/settings/connectors/$connectorId"
      }
    | {
        params: { teamSlug: string; workspaceSlug: string }
        to: "/$workspaceSlug/settings/teams/$teamSlug"
      }
}

interface SettingsRowProps {
  children?: ReactNode
  description: string
  htmlFor?: string
  label: string
  leading?: ReactNode
}

interface SettingsSectionProps {
  children: ReactNode
  title?: string
}

const ROW_CLASS_NAME = `
  items-center justify-between gap-24 border-b border-border px-20 py-16
  last:border-b-0
`

export function SettingsLinkRow(props: SettingsLinkRowProps): JSX.Element {
  const { children, description, label, leading, link } = props

  return (
    <Link
      className={`
        ${ROW_CLASS_NAME}
        flex select-none
        hover:bg-gray-3
      `}
      params={link.params}
      to={link.to}
    >
      <SettingsRowContent description={description} label={label} leading={leading}>
        {children}
      </SettingsRowContent>
    </Link>
  )
}

export function SettingsRow(props: SettingsRowProps): JSX.Element {
  const { children, description, htmlFor, label, leading } = props

  return (
    <Row className={ROW_CLASS_NAME}>
      <SettingsRowContent
        description={description}
        htmlFor={htmlFor}
        label={label}
        leading={leading}
      >
        {children}
      </SettingsRowContent>
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

function SettingsRowContent(
  props: Pick<SettingsRowProps, "children" | "description" | "htmlFor" | "label" | "leading">,
): JSX.Element {
  const { children, description, htmlFor, label, leading } = props

  return (
    <>
      <Row className="min-w-0 flex-1 items-center">
        {leading !== undefined && (
          <>
            {leading}
            <Spacer width={12} />
          </>
        )}
        <Column className="min-w-0 flex-1">
          {htmlFor === undefined ? (
            <span className="truncate text-14 font-500">{label}</span>
          ) : (
            <Label className="text-14 font-500" htmlFor={htmlFor}>
              {label}
            </Label>
          )}
          <Spacer height={4} />

          <p className="text-13 text-text-secondary">{description}</p>
        </Column>
      </Row>
      {children !== undefined && <div className="shrink-0">{children}</div>}
    </>
  )
}
