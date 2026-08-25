import { Avatar, Style } from "@dicebear/core"
import voxelBot from "@dicebear/styles/voxel-bot.json" with { type: "json" }
import { useMemo, type JSX } from "react"

const voxelBotStyle = new Style(voxelBot)

interface AgentAvatarProps {
  alt?: string
  seed: string
}

export function AgentAvatar(props: AgentAvatarProps): JSX.Element {
  const { alt = "", seed } = props

  const src = useMemo(
    () =>
      new Avatar(voxelBotStyle, {
        seed,
        size: 40,
      }).toDataUri(),
    [seed],
  )

  return (
    <img
      alt={alt}
      className="aspect-1-1 h-40 shrink-0 rounded-full bg-gray-4"
      height={40}
      src={src}
      width={40}
    />
  )
}
