import { ENVIRONMENT } from "#/utils/environment"

const BASE_URLS = {
  DEVELOPMENT: "https://connector.localhost/dashboard",
  PRODUCTION: "https://kale.so",
}

export const BASE_URL = ENVIRONMENT.IS_PRODUCTION ? BASE_URLS.PRODUCTION : BASE_URLS.DEVELOPMENT
