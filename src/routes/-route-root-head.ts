import type { JSX } from "react"
import { ENVIRONMENT } from "#/utils/environment"

interface RouteRootHead {
  links?: JSX.IntrinsicElements["link"][]
  meta?: JSX.IntrinsicElements["meta"][]
}

const META = {
  DESCRIPTION: "Dashboard",
  TITLE: "Dashboard",
}

export function RouteRootHead(): RouteRootHead {
  return {
    links: [
      /*
          Preload critical fonts to avoid FOUT and reduce layout shift on first paint

          See:
          - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload
          - https://web.dev/articles/preload-critical-assets
      */
      {
        as: "font",
        crossOrigin: "anonymous",
        href: "/fonts/body.woff2",
        rel: "preload",
        type: "font/woff2",
      },
      {
        as: "font",
        crossOrigin: "anonymous",
        href: "/fonts/code.woff2",
        rel: "preload",
        type: "font/woff2",
      },
      {
        href: ENVIRONMENT.IS_PRODUCTION ? "/favicon/production.ico" : "/favicon/development.ico",
        rel: "icon",
        type: "image/x-icon",
      },
    ],
    meta: [
      {
        charSet: "utf8",
      },
      {
        content: META.DESCRIPTION,
        name: "description",
      },
      {
        content: "width=device-width, initial-scale=1.0",
        name: "viewport",
      },
      {
        title: META.TITLE,
      },
    ],
  }
}
