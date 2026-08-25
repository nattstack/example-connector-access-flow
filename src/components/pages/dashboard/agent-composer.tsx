import { IconArrowUpOutline18 } from "@nattstack/icons"
import { Column, IconButton, Row, Spacer, Textarea } from "@nattstack/ui"
import { useState, type JSX, type KeyboardEvent } from "react"

const ICON_SIZE = 20
const ICON_STROKE_WIDTH = 2

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
            className="
              shrink-0 bg-primary text-gray-1 transition-opacity
              hover:opacity-75
            "
            disabled={isSendDisabled}
            icon={<IconArrowUpOutline18 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />}
            onClick={send}
            rounded
            size={40}
            type="button"
            variant="ghost"
          />
        </Row>
      </Column>
    </Column>
  )
}
