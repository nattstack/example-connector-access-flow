import { Column, IconButton, Row, Spacer, Textarea } from "@nattstack/ui"
import { useState, type JSX, type KeyboardEvent } from "react"

const ICON_SIZE = 16
const ICON_STROKE_WIDTH = 1.6

interface AgentComposerProps {
  defaultValue?: string
  onSend: (text: string) => void
}

export function AgentComposer(props: AgentComposerProps): JSX.Element {
  const { onSend } = props
  const [value, setValue] = useState(props.defaultValue ?? "")
  const trimmedValue = value.trim()
  const isSendDisabled = trimmedValue.length === 0

  function send(): void {
    if (isSendDisabled) {
      return
    }

    onSend(trimmedValue)
    setValue("")
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key !== "Enter" || event.shiftKey) {
      return
    }

    event.preventDefault()
    send()
  }

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
            min-h-48 resize-none rounded-none border-0 bg-transparent p-0
            shadow-none! outline-none
            placeholder:text-text-secondary
          "
          onKeyDown={onKeyDown}
          placeholder="Send a message to your agent"
          readOnly
          rows={2}
          value={value}
        />

        <Spacer height={12} />

        <Row className="items-end justify-end">
          <IconButton
            aria-label="Send message"
            className="shrink-0 bg-primary text-gray-1"
            disabled={isSendDisabled}
            icon={<IconArrowUp />}
            onClick={send}
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
