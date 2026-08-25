/** Curated apps for this connector-access demo. */
export const CONNECTOR_APP_CATALOG = [
  { id: "figma", name: "Figma" },
  { id: "github", name: "GitHub" },
  { id: "gmail", name: "Gmail" },
  { id: "gcalendar", name: "Google Calendar" },
  { id: "gdrive", name: "Google Drive" },
  { id: "linear", name: "Linear" },
  { id: "notion", name: "Notion" },
  { id: "slack", name: "Slack" },
] as const

export type ConnectorAppId = (typeof CONNECTOR_APP_CATALOG)[number]["id"]
