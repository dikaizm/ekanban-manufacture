import { createContext, useContext } from "react";

interface OptionsType {
    method: string
    options: RequestInit
}

interface SecureApiContextType {
    secureApi: (url: string, options?: OptionsType) => Promise<Response>
}

export const SecureApiContext = createContext<SecureApiContextType | undefined>(undefined)

export function useSecureApi() {
    const context = useContext(SecureApiContext)
    if (!context) {
        throw new Error('useSecureApi must be used within SecureApiProvider')
    }

    return context
}