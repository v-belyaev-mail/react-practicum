import {ApiUrl} from "../constants/api.ts";
import {
    TIngredientResponse,
    TLoginUser, TLoginUserResponse,
    TOrderCreateRequest, TOrderCreateResponse,
    TRegisterUser,
    TResetPasswordUser, TResponse,
    TTokenResponse, TUserEditForm, TUserResponse
} from "../utils/types.ts";
import {getAccessToken, getRefreshToken, setTokens} from "../utils/token-storage.ts";

const checkResponse = <T>(res:Response):Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const checkSuccess = <T extends TResponse>(res:T):Promise<T> => {
    if (res && res.success) {
        return Promise.resolve(res);
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(res);
};

const request = <T extends TResponse>(endpoint:string, options?:RequestInit):Promise<T> => {
    return fetch(`${ApiUrl}${endpoint}`, options)
        .then(checkResponse<T>)
        .then(checkSuccess<T>);
}

export const refreshToken = () => {
    return request<TTokenResponse>('/auth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getRefreshToken(),
        }),
    })
        .then((refreshData) => {
            setTokens(refreshData.accessToken, refreshData.refreshToken);
            return refreshData;
        })
};

export const fetchWithRefresh = async <T extends TResponse>(url: string, options?:RequestInit) => {
    try {
        return await request<T>(url, options)
    } catch (err:Error|any) {
        if (!!err.message) {
            if (err.message === "jwt expired") {
                const refreshData = await refreshToken(); //обновляем токен
                if(!options) options = {}
                !(options.headers instanceof Headers) ?
                    options.headers = new Headers() :
                    options.headers.set('authorization', refreshData.accessToken);
                return await request<T>(url, options)
            } else {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(err);
        }
    }
};

export const forgotPassworApi = (email:string) => {
    return request<TResponse>('/password-reset', {
        method: 'POST',
        body: JSON.stringify({
            email
        }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
}

export const resetPassworApi = (form: TResetPasswordUser) => {
    return request('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form)
    })
}

export const registerApi = (form : TRegisterUser) => {
    return request<TLoginUserResponse>('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form)
    })
}

export const loginApi = (form: TLoginUser) => {
    return request<TLoginUserResponse>('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form)
    })
}

export const logoutApi = () => {
    return request<TResponse>('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: getRefreshToken()
        })
    })
}

export const getUserApi = () => {
    const headers = new Headers();
    headers.append('Authorization', getAccessToken() ?? '');

    return fetchWithRefresh<TUserResponse>('/auth/user', {
        method: 'PATCH',
        headers: headers
    })
}

export const updateUser = (form:TUserEditForm) => {
    const headers = new Headers();
    headers.append('Authorization', getAccessToken() ?? '');
    headers.append('Content-Type', 'application/json;charset=utf-8');

    return fetchWithRefresh<TUserResponse>('/auth/user', {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(form)
    })
}

export const getIngredientsApi = () => {
    return request<TIngredientResponse>('/ingredients/')
};

export const sendOrderApi = (data:TOrderCreateRequest) => {
    const headers = new Headers();
    headers.append('Authorization', getAccessToken() ?? '');
    headers.append('Content-Type', 'application/json;charset=utf-8');

    return fetchWithRefresh<TOrderCreateResponse>('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers,
    })
}