import { Column, IconButton, Row, Spacer, Textarea } from "@nattstack/ui"
import type { JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { formatConnectorTitle, type Connector } from "#/data/connectors"

interface AgentComposerProps {
  connectors: Connector[]
}

const CHIP_AVATAR_SIZE = 14
const ICON_SIZE = 16
const ICON_STROKE_WIDTH = 1.6

export function AgentComposer(props: AgentComposerProps): JSX.Element {
  const { connectors } = props

  return (
    <Column className="shrink-0 px-16 pb-16">
      <Column
        className="
          mx-auto w-full max-w-768 rounded-20 border border-border bg-bg-primary
          p-16
        "
      >
        <Textarea
          aria-label="Send a message to your agent"
          className="
            min-h-48 resize-none border-0 bg-transparent p-0 shadow-none
            outline-none
            placeholder:text-text-secondary
          "
          placeholder="Send a message to your agent"
          rows={2}
        />

        <Spacer height={12} />

        <Row className="items-end justify-end">
          {connectors.length > 0 && (
            <>
              <Row className="min-w-0 flex-1 flex-wrap items-center" gap={6}>
                {connectors.map((connector) => (
                  <span
                    className="
                      inline-flex h-24 max-w-full items-center rounded-6
                      bg-gray-3 px-8 text-12 font-500 text-text-secondary
                    "
                    key={connector.id}
                  >
                    <AvatarConnector appId={connector.appId} size={CHIP_AVATAR_SIZE} />
                    <Spacer width={6} />

                    <span className="truncate">{formatConnectorTitle(connector)}</span>
                  </span>
                ))}
              </Row>
              <Spacer width={8} />
            </>
          )}

          <IconButton
            aria-label="Send message"
            className="shrink-0 bg-primary text-gray-1"
            icon={<IconArrowUp />}
            rounded
            size={32}
            type="button"
            variant="ghost"
          />
        </Row>
      </Column>
    </Column>
  )
}

function IconArrowUp(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="size-16"
      fill="none"
      viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12.5V3.5M8 3.5 4 7.5M8 3.5 12 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={ICON_STROKE_WIDTH}
      />
    </svg>
  )
}
