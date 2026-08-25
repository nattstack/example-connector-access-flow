import { isProduction } from "#/utils/environment"

const BASE_URL_PRODUCTION = "https://kale.so"
const BASE_URL_DEVELOPMENT = "https://connector.localhost/dashboard"

export const BASE_URL = isProduction ? BASE_URL_PRODUCTION : BASE_URL_DEVELOPMENT
