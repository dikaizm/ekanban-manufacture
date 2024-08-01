const appEnv: 'development' | 'production' = import.meta.env.VITE_NODE_ENV // 'development' | 'production'

let apiUrl: string
if (appEnv === 'production') {
    apiUrl = import.meta.env.VITE_API_PROD_URL as string
} else {
    apiUrl = import.meta.env.VITE_API_DEV_URL as string
}

const appConfig = {
    apiUrl: apiUrl,
}

export default appConfig