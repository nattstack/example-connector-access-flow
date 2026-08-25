import { Button, Column, Row, Spacer } from "@nattstack/ui"
import { Fragment, useState, type JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { DialogAuthorizeConnector } from "#/components/pages/dashboard/dialog-authorize-connector"
import type { ChatInline, ChatItem, ChatText } from "#/data/agent-chat"

const GAP_CLUSTER = 8
const GAP_TURN = 20
const ICON_SIZE = 16
const ICON_STROKE_WIDTH = 1.6

interface AgentChatProps {
  items: ChatItem[]
}

type ChatSide = "agent" | "meta" | "user"

export function AgentChat(props: AgentChatProps): JSX.Element {
  const { items } = props

  return (
    <Column className="px-16">
      <Column className="mx-auto w-full max-w-768">
        <Spacer height={32} />

        {items.map((item, index) => {
          const previous = index === 0 ? undefined : items[index - 1]
          const gap = getItemGap(previous, item)

          return (
            <Fragment key={item.id}>
              {gap > 0 && <Spacer height={gap} />}

              <ChatEntry item={item} />
            </Fragment>
          )
        })}

        <Spacer height={32} />
      </Column>
    </Column>
  )
}

function ChatBubble(props: { children: JSX.Element; role: "agent" | "user" }): JSX.Element {
  const { children, role } = props

  if (role === "user") {
    return (
      <div
        className="
          w-fit max-w-640 self-end rounded-16 bg-gray-12 px-12 py-8 text-14
          leading-1-5 wrap-break-word text-gray-1
        "
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className="
        w-fit max-w-640 self-start rounded-16 bg-gray-3 px-12 py-8 text-14
        leading-1-5 wrap-break-word text-text-primary
      "
    >
      {children}
    </div>
  )
}

function ChatChoice(props: { item: Extract<ChatItem, { type: "choice" }> }): JSX.Element {
  const { item } = props

  return (
    <Row
      alignItems="center"
      className="
        w-fit max-w-640 self-start rounded-16 border border-border bg-bg-primary
        px-12 py-10
      "
    >
      <span
        className="
          flex size-20 items-center justify-center rounded-6 bg-gray-3 text-12
          font-500 text-text-secondary
        "
      >
        A
      </span>

      <Spacer width={8} />

      <span className="text-14 font-500 text-text-primary">{item.label}</span>

      {item.selected === true && (
        <>
          <Spacer width={16} />

          <span className="text-text-secondary">
            <IconCheck />
          </span>
        </>
      )}
    </Row>
  )
}

function ChatConnect(props: { item: Extract<ChatItem, { type: "connect" }> }): JSX.Element {
  const { item } = props
  const [isAuthorizeOpen, setIsAuthorizeOpen] = useState(false)

  return (
    <>
      <Row
        alignItems="center"
        className="
          w-full max-w-640 justify-between rounded-16 bg-gray-3 px-12 py-10
        "
      >
        <Row alignItems="center" className="min-w-0">
          <AvatarConnector appId={item.appId} />

          <Spacer width={12} />

          <Column className="min-w-0">
            <p className="text-14 font-500 text-text-primary">{item.title}</p>
            <p className="text-12 text-text-secondary">{item.description}</p>
          </Column>
        </Row>

        <Button
          className="shrink-0"
          label={item.actionLabel}
          onClick={() => setIsAuthorizeOpen(true)}
          rounded
          size={32}
          type="button"
          variant="secondary"
        />
      </Row>

      <DialogAuthorizeConnector
        appId={item.appId}
        isOpen={isAuthorizeOpen}
        onIsOpenChange={setIsAuthorizeOpen}
      />
    </>
  )
}

function ChatContent(props: { content: ChatText[]; role: "agent" | "user" }): JSX.Element {
  const { content, role } = props

  return (
    <p className="whitespace-pre-wrap">
      {content.map((part, index) => (
        <ChatPart key={index} part={part} role={role} />
      ))}
    </p>
  )
}

function ChatEntry(props: { item: ChatItem }): JSX.Element {
  const { item } = props

  switch (item.type) {
    case "choice": {
      return <ChatChoice item={item} />
    }

    case "connect": {
      return <ChatConnect item={item} />
    }

    case "message": {
      return (
        <ChatBubble role={item.role}>
          <ChatContent content={item.content} role={item.role} />
        </ChatBubble>
      )
    }

    case "meta": {
      return <p className="self-center text-12 text-text-secondary">{item.text}</p>
    }

    case "secret": {
      return <ChatSecret item={item} />
    }

    default: {
      throw new Error("Unexpected chat item")
    }
  }
}

function ChatInlineCode(props: { text: string }): JSX.Element {
  const { text } = props

  return <code className="rounded-4 bg-code-bg px-4 font-code text-code">{text}</code>
}

function ChatInlinePart(props: { part: ChatInline; role: "agent" | "user" }): JSX.Element {
  const { part, role } = props

  switch (part.type) {
    case "bold": {
      return <strong className="font-600">{part.text}</strong>
    }

    case "code": {
      return <ChatInlineCode text={part.text} />
    }

    case "link": {
      return <ChatLink href={part.href} role={role} text={part.text} />
    }

    default: {
      throw new Error("Unexpected chat inline")
    }
  }
}

function ChatLink(props: { href: string; role: "agent" | "user"; text: string }): JSX.Element {
  const { href, role, text } = props

  return (
    <a
      className={role === "user" ? "text-primary-8" : "text-primary"}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {text}
    </a>
  )
}

function ChatPart(props: { part: ChatText; role: "agent" | "user" }): JSX.Element {
  const { part, role } = props

  if (typeof part === "string") {
    return <span>{part}</span>
  }

  return <ChatInlinePart part={part} role={role} />
}

function ChatSecret(props: { item: Extract<ChatItem, { type: "secret" }> }): JSX.Element {
  const { item } = props

  return (
    <Row
      alignItems="center"
      className="w-full max-w-640 self-start rounded-16 bg-gray-3 px-12 py-10"
    >
      <Column className="min-w-0">
        <p className="text-14 font-500 text-text-primary">{item.title}</p>
        <p className="text-12 text-text-secondary">{item.description}</p>
      </Column>

      <Spacer width={12} />

      <Row alignItems="center" className="shrink-0 rounded-8 bg-success px-8 py-4 text-gray-1">
        <IconCheck />

        <Spacer width={4} />

        <span className="text-12 font-500">Saved</span>
      </Row>
    </Row>
  )
}

function getItemGap(previous: ChatItem | undefined, current: ChatItem): number {
  if (previous === undefined) {
    return 0
  }

  return getItemSide(previous) === getItemSide(current) ? GAP_CLUSTER : GAP_TURN
}

function getItemSide(item: ChatItem): ChatSide {
  if (item.type === "meta") {
    return "meta"
  }

  if (item.type === "message") {
    return item.role
  }

  return "agent"
}

function IconCheck(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="size-14"
      fill="none"
      viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.2 6.4 11l6.1-6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={ICON_STROKE_WIDTH}
      />
    </svg>
  )
}
