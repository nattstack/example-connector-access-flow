import { Column, Row } from "@nattstack/ui"
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router"
import { useEffect, useRef, useState, type JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import { BadgeTeam } from "#/components/badge-team"
import { AgentChat } from "#/components/pages/dashboard/agent-chat"
import { AgentComposer } from "#/components/pages/dashboard/agent-composer"
import {
  getAgentAuthorizeDeniedReply,
  getAgentAuthorizeReply,
  getAgentChatById,
  getAgentSendReply,
  type ChatItem,
} from "#/data/agent-chat.ts"
import { getAgentById } from "#/data/agents.ts"
import { addConnector, grantConnectorScopes } from "#/data/connectors.ts"
import { RouteAgentHead } from "#/routes/-route-agent-head"

export const Route = createFileRoute("/$workspaceSlug/agents/$agentId")({
  component: function AgentDetailPage(): JSX.Element {
    const { agent, chat } = Route.useLoaderData()
    const router = useRouter()
    const [items, setItems] = useState(chat)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const node = scrollRef.current

      if (node === null) {
        return
      }

      node.scrollTo({ top: node.scrollHeight })
    }, [items])

    async function onAuthorize(itemId: string, scopeIds: string[]): Promise<void> {
      if (items.some((item) => item.type === "connect" && item.status === "added")) {
        return
      }

      if (agent.id === "d28c5b88-901f-4df0-b5b1-c6b9cab1b420") {
        addConnector({
          appId: "gmail",
          label: "Connected inbox",
          scopeIds,
          workspaceId: agent.workspaceId,
        })
      } else if (agent.id === "c8e4a1b0-3d72-4f19-8a56-2b9c0e7d4f31") {
        if (!scopeIds.includes("delete")) {
          setItems((current) => [...current, ...getAgentAuthorizeDeniedReply(agent.id)])
          return
        }

        grantConnectorScopes({
          connectorId: "682b4e5c-07a9-441d-38bf-c57f81a3d4cb",
          scopeIds,
          workspaceId: agent.workspaceId,
        })
      } else {
        return
      }

      await router.invalidate()

      setItems((current) => {
        const next = current.map((item) => {
          if (item.id !== itemId || item.type !== "connect") {
            return item
          }

          return {
            ...item,
            actionLabel: "Added",
            status: "added" as const,
            toolCount: 30,
          }
        })

        return [...next, ...getAgentAuthorizeReply(agent.id)]
      })
    }

    function onSend(text: string): void {
      const userMessage: ChatItem = {
        content: [text],
        id: crypto.randomUUID(),
        role: "user",
        type: "message",
      }

      setItems((current) => {
        if (current.some((item) => item.type === "connect")) {
          return [...current, userMessage]
        }

        return [...current, userMessage, ...getAgentSendReply(agent.id)]
      })
    }

    return (
      <>
        {/* Header */}
        <Row
          as="header"
          className="
            sticky top-0 left-0 isolate z-30 h-44 items-center gap-x-8
            bg-bg-shell-outer px-16
            shadow-[inset_0_-1px_0_0_var(--color-border)]
          "
        >
          <AvatarAgent alt={agent.name} size={20} src={agent.avatar} />
          <span className="text-14 font-500 text-text-primary">{agent.name}</span>
          {agent.team && <BadgeTeam team={agent.team} />}
        </Row>

        {/* Content */}
        <Column className="min-h-0 flex-1 overflow-y-auto" ref={scrollRef}>
          <AgentChat items={items} key={agent.id} onAuthorize={onAuthorize} />
        </Column>

        {/* Composer */}
        <AgentComposer defaultValue={agent.draft} key={agent.id} onSend={onSend} />
      </>
    )
  },
  head: RouteAgentHead,
  loader: ({ context, params }) => {
    const agent = getAgentById(context.workspace.id, params.agentId)

    if (agent === undefined) {
      throw notFound()
    }

    return {
      agent,
      chat: getAgentChatById(agent.id),
    }
  },
})
