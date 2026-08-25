import { IconShieldSlashOutline18 } from "@nattstack/icons"
import { Button, Column, DialogResponsive, DialogResponsivePopup, Row, Spacer } from "@nattstack/ui"
import type { JSX } from "react"
import { AvatarConnector } from "#/components/avatar-connector"
import { getConnectorApp, type ConnectorAppId } from "#/data/connectors"
import { useCurrentUser } from "#/data/user"

interface DialogBlockedConnectorProps {
  appId: ConnectorAppId
  connectorLabel: string
  isOpen: boolean
  onIsOpenChange: (isOpen: boolean) => void
  onRequest?: () => void
}

const ICON_SIZE = 24

export function DialogBlockedConnector(props: DialogBlockedConnectorProps): JSX.Element {
  const { appId, connectorLabel, isOpen, onIsOpenChange, onRequest } = props
  const app = getConnectorApp(appId)
  const user = useCurrentUser()
  const appName = app?.name ?? "this app"

  function onSendRequest(): void {
    onRequest?.()
    onIsOpenChange(false)
  }

  return (
    <DialogResponsive onOpenChange={onIsOpenChange} open={isOpen}>
      <DialogResponsivePopup className="max-w-[420px]">
        <Column>
          <Column className="items-center">
            <IconShieldSlashOutline18 className="text-text-primary" size={ICON_SIZE} />
            <Spacer height={16} />

            <h2 className="text-24 tracking-[-0.02em]">Connection blocked</h2>
          </Column>
          <Spacer height={24} />

          <p className="text-14 text-text-primary">Hi {user.name},</p>
          <Spacer height={12} />

          <p className="text-14 leading-1-5 text-text-primary">
            You can&apos;t use <strong className="font-600">{appName}</strong> on{" "}
            <strong className="font-600">{connectorLabel}</strong>. This connector is blocked by
            workspace policy.
          </p>
          <Spacer height={20} />

          <Column className="gap-y-10">
            <BlockedDetail label="Name" value={user.name} />
            <BlockedDetail
              label="Connector"
              value={
                <Row alignItems="center">
                  <AvatarConnector appId={appId} size={20} />
                  <Spacer width={8} />

                  <span>
                    {appName} · {connectorLabel}
                  </span>
                </Row>
              }
            />
            <BlockedDetail label="Reason" value="Blocked by workspace policy" />
          </Column>
          <Spacer height={20} />

          <p className="text-14 text-text-secondary">
            Contact a workspace admin to update the policy.
          </p>
          <Spacer height={24} />

          <Button
            fullWidth
            label="Send request"
            onClick={onSendRequest}
            type="button"
            variant="primary"
          />
        </Column>
      </DialogResponsivePopup>
    </DialogResponsive>
  )
}

function BlockedDetail(props: { label: string; value: JSX.Element | string }): JSX.Element {
  const { label, value } = props

  return (
    <Column>
      <p className="text-12 text-text-secondary">{label}</p>
      <Spacer height={4} />

      <div className="text-14 font-500 text-text-primary">{value}</div>
    </Column>
  )
}
