import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "#/app.tsx"
import "#/styles/global.css"

const themeQuery = matchMedia("(prefers-color-scheme: dark)")

function syncTheme(): void {
  document.documentElement.classList.toggle("dark", themeQuery.matches)
}

syncTheme()
themeQuery.addEventListener("change", syncTheme)

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
