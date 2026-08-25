import { ENVIRONMENT } from "#/utils/environment"

const BASE_URLS = {
  DEVELOPMENT: "https://connector.localhost",
  PRODUCTION: "https://connector-access-flow.vercel.app",
}

export const BASE_URL = ENVIRONMENT.IS_PRODUCTION ? BASE_URLS.PRODUCTION : BASE_URLS.DEVELOPMENT
