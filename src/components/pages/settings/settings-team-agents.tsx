import { IconChevronRightOutline18 } from "@nattstack/icons"
import {
  Button,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
  Row,
} from "@nattstack/ui"
import { useParams, useRouter } from "@tanstack/react-router"
import { useMemo, useState, type JSX } from "react"
import { AvatarAgent } from "#/components/avatar-agent"
import {
  SettingsLinkRow,
  SettingsRow,
  SettingsSection,
} from "#/components/pages/settings/settings-section"
import { setAgentTeam, type Agent } from "#/data/agents"
import { isCurrentUserWorkspaceAdmin } from "#/data/members"
import { listAgentsAvailableForTeam, type Team } from "#/data/teams"

interface AgentOption {
  label: string
  value: string
}

interface SettingsTeamAgentRowProps {
  agent: Agent
  canRemove: boolean
  onRemove: () => Promise<void> | void
}

interface SettingsTeamAgentsProps {
  agents: Agent[]
  team: Team
}

export function SettingsTeamAgents(props: SettingsTeamAgentsProps): JSX.Element {
  const { agents, team } = props
  const router = useRouter()
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)
  const isAdmin = isCurrentUserWorkspaceAdmin(team.workspaceId)
  const availableAgents = listAgentsAvailableForTeam(team.workspaceId, team.name)
  const items: AgentOption[] = useMemo(
    () =>
      availableAgents.map((agent) => ({
        label: agent.name,
        value: agent.id,
      })),
    [availableAgents],
  )

  // oxlint-disable-next-line unicorn/no-null -- Base UI Combobox treats undefined as uncontrolled; null means "no selection".
  const selectedValue: AgentOption | null = null

  async function onAdd(agentId: string): Promise<void> {
    setAgentTeam({
      agentId,
      teamName: team.name,
      workspaceId: team.workspaceId,
    })
    setIsComboboxOpen(false)
    await router.invalidate()
  }

  async function onRemove(agent: Agent): Promise<void> {
    setAgentTeam({
      agentId: agent.id,
      teamName: undefined,
      workspaceId: team.workspaceId,
    })
    await router.invalidate()
  }

  return (
    <SettingsSection title="Agents">
      {isAdmin && (
        <SettingsRow
          description="Agents can only be on one team. Adding an agent moves it here."
          label="Add an agent"
        >
          <Combobox<AgentOption>
            items={items}
            onOpenChange={setIsComboboxOpen}
            onValueChange={async (nextValue) => {
              if (nextValue !== null) {
                await onAdd(nextValue.value)
              }
            }}
            open={isComboboxOpen}
            value={selectedValue}
          >
            <ComboboxTrigger
              className="
                w-240
                max-768:w-full
              "
              size={36}
            >
              <ComboboxValue placeholder="Search an agent to add" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxSearch placeholder="Search agents" />
              <ComboboxEmpty>
                {items.length === 0 ? "Every agent is already on this team." : "No agents found."}
              </ComboboxEmpty>
              <ComboboxList>
                {(item: AgentOption) => {
                  const agent = availableAgents.find((entry) => entry.id === item.value)

                  if (agent === undefined) {
                    return <></>
                  }

                  return (
                    <ComboboxItem key={item.value} value={item}>
                      <Row className="items-center gap-8">
                        <AvatarAgent alt={agent.name} src={agent.avatar} />
                        <span className="truncate">
                          {item.label} · {agent.team ?? "No team"}
                        </span>
                      </Row>
                    </ComboboxItem>
                  )
                }}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </SettingsRow>
      )}
      {agents.length === 0 ? (
        <SettingsRow description="No agents have joined this team yet." label="Agents">
          <span className="text-14 text-text-secondary">None</span>
        </SettingsRow>
      ) : (
        agents.map((agent) => (
          <SettingsTeamAgentRow
            agent={agent}
            canRemove={isAdmin}
            key={agent.id}
            onRemove={() => onRemove(agent)}
          />
        ))
      )}
    </SettingsSection>
  )
}

function SettingsTeamAgentRow(props: SettingsTeamAgentRowProps): JSX.Element {
  const { agent, canRemove, onRemove } = props
  const { workspaceSlug } = useParams({ from: "/$workspaceSlug" })

  if (canRemove) {
    return (
      <SettingsRow
        description={agent.chat}
        label={agent.name}
        leading={<AvatarAgent alt={agent.name} src={agent.avatar} />}
      >
        <Button label="Remove" onClick={onRemove} size={32} variant="ghost" />
      </SettingsRow>
    )
  }

  return (
    <SettingsLinkRow
      description={agent.chat}
      label={agent.name}
      leading={<AvatarAgent alt={agent.name} src={agent.avatar} />}
      link={{
        params: { agentId: agent.id, workspaceSlug },
        to: "/$workspaceSlug/agents/$agentId",
      }}
    >
      <IconChevronRightOutline18 className="text-gray-9" />
    </SettingsLinkRow>
  )
}
