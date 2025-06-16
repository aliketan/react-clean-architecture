export const Env = {
    isDevMode: process.env.NODE_ENV === 'development',
    pageTitle: import.meta.env.VITE_APP_WEBSITE_NAME || "",
    apiUrl: import.meta.env.VITE_APP_API_URL
}