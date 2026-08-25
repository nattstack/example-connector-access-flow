import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppRouter } from "#/router.tsx"
import "#/styles/global.css"

const root = document.querySelector("#root")

if (!root) {
  throw new Error("Root element not found")
}

createRoot(root).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
