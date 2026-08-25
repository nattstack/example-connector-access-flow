export interface User {
  avatar: string
  email: string
  name: string
}

const currentUser: User = {
  avatar: "/avatars/user.png",
  email: "sam@example.com",
  name: "Sam Waters",
}

export function getCurrentUser(): User {
  return currentUser
}
