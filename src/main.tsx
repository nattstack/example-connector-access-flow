import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { routeTree } from "#/routeTree.gen.ts"
import "#/styles/global.css"

const router = createRouter({
  defaultPreload: "intent",
  routeTree,
  scrollRestoration: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const themeQuery = matchMedia("(prefers-color-scheme: dark)")

function syncTheme(): void {
  document.documentElement.classList.toggle("dark", themeQuery.matches)
}

syncTheme()
themeQuery.addEventListener("change", syncTheme)

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
