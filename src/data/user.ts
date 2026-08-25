export interface User {
  email: string
  name: string
}

const currentUser: User = {
  email: "sam@example.com",
  name: "Sam Waters",
}

export function getCurrentUser(): User {
  return currentUser
}
