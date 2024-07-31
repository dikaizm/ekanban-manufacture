import Cookies from 'js-cookie'

export function checkAuthStatus(response: Response): boolean {
    if (!response.ok) {
        if (response.status === 401) {
            Cookies.remove('auth')
            localStorage.removeItem('auth')
            return false;
        }
    }
    return true;
}