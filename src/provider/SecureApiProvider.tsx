import { ReactNode } from "react";
import Cookies from "js-cookie";
import { SecureApiContext } from "./utils/secureApiContext";
import appConfig from "../config/env";
import { checkAuthStatus } from "../helpers/auth";

export function SecureApiProvider({ children }: { children: ReactNode }) {
    async function secureApi(url: string, options?: { method: string, options: RequestInit }) {
        const response = await fetch(`${appConfig.apiUrl}${url}`, {
            method: options?.method || 'GET',
            ...options?.options,
            headers: {
                ...options?.options.headers,
                'Authorization': `Bearer ${Cookies.get('auth')}`
            }
        })
        if (!checkAuthStatus(response)) {
            window.location.href = '/login'
            throw new Error('Unauthorized')
        }

        return response
    }

    return (
        <SecureApiContext.Provider value={{ secureApi }}>
            {children}
        </SecureApiContext.Provider>
    )
}