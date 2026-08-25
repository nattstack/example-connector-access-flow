import { useSyncExternalStore } from "react"

export interface User {
  avatar: string
  email: string
  name: string
}

let currentUser: User = {
  avatar: "/avatars/user.png",
  email: "sam@example.com",
  name: "Sam Waters",
}

const listeners = new Set<() => void>()

export function getCurrentUser(): User {
  return currentUser
}

export function subscribeCurrentUser(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange)

  return () => {
    listeners.delete(onStoreChange)
  }
}

export function updateCurrentUser(patch: Partial<User>): User {
  currentUser = {
    ...currentUser,
    ...patch,
  }

  emitCurrentUserChange()

  return currentUser
}

export function useCurrentUser(): User {
  return useSyncExternalStore(subscribeCurrentUser, getCurrentUser, getCurrentUser)
}

function emitCurrentUserChange(): void {
  for (const listener of listeners) {
    listener()
  }
}
