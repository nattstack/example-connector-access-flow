import { isProduction } from "#/utils/environment"

const BASE_URLS = {
  DEVELOPMENT: "https://connector.localhost/dashboard",
  PRODUCTION: "https://kale.so",
}

export const BASE_URL = isProduction ? BASE_URLS.PRODUCTION : BASE_URLS.DEVELOPMENT
