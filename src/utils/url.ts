import { ENVIRONMENT } from "#/utils/environment"

const BASE_URL_MAP = {
  DEVELOPMENT: "https://connector.localhost",
  PRODUCTION: "https://connector-access-flow.vercel.app",
}

export const BASE_URL = ENVIRONMENT.IS_PRODUCTION
  ? BASE_URL_MAP.PRODUCTION
  : BASE_URL_MAP.DEVELOPMENT
