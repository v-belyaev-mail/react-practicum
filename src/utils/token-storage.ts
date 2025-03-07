export const setTokens = (accessToken: string, refreshToken:string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const getAccessToken = (onlyToken: boolean = false) => {
    if(onlyToken) {
        return localStorage.getItem('accessToken')?.replace('Bearer ', '');
    }
    return localStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}