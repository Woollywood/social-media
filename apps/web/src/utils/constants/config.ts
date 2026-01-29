export const envConfig = {
  BASE_URL: import.meta.env.VITE_BASE_URL as string,
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT as string,
  SIGN_IN_URL: import.meta.env.VITE_SIGN_IN_URL as string,
  SIGN_UP_URL: import.meta.env.VITE_SIGN_UP_URL as string,
  AUTH_REDIRECT_URL: import.meta.env.VITE_AUTH_REDIRECT_URL as string,
  SESSION_KEY: import.meta.env.VITE_SESSION_KEY as string,
}
