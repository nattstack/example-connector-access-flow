export const ICON_SIZE = 18

export const ANIMATION_DIRECTION_BACK = -1
export const ANIMATION_DIRECTION_FORWARD = 1

export type DashboardSidebarAnimationDirection =
  | typeof ANIMATION_DIRECTION_BACK
  | typeof ANIMATION_DIRECTION_FORWARD

export const SIDEBAR_WIDTH = 288

export const ANIMATION = {
  transition: {
    duration: 0.15,
    ease: "linear",
  },
  variants: {
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      x: 0,
    },
    exit: ({ direction }: { direction: DashboardSidebarAnimationDirection }) => ({
      filter: "blur(8px)",
      opacity: 0,
      x: -SIDEBAR_WIDTH * direction,
    }),
    initial: ({ direction }: { direction: DashboardSidebarAnimationDirection }) => ({
      filter: "blur(8px)",
      opacity: 0,
      x: SIDEBAR_WIDTH * direction,
    }),
  },
} as const
