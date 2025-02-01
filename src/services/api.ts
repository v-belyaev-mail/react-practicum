import {ApiGetIngredients, ApiOrder, ApiUrl} from "../constants/api.ts";
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

export const refreshToken = () => {
    return fetch(`${ApiUrl}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getRefreshToken(),
        }),
    })
        .then(checkResponse<TTokenResponse>)
        // !! Важно для обновления токена в мидлваре, чтобы запись токенов
        // была тут, а не в fetchWithRefresh
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData) as Promise<TTokenResponse>;
            }
            setTokens(refreshData.accessToken, refreshData.refreshToken);
            return refreshData;
        });
};

export const fetchWithRefresh = async <T>(url: RequestInfo, options:RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err:Error|any) {
        if (!!err.message) {
            if (err.message === "jwt expired") {
                const refreshData = await refreshToken(); //обновляем токен
                if (!(options.headers instanceof Headers))
                    options.headers = new Headers();
                options.headers.set('authorization', refreshData.accessToken);
                const res = await fetch(url, options); //повторяем запрос
                return await checkResponse<T>(res);
            } else {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(err);
        }
    }
};

export const forgotPassworApi = (email:string) => {
    return fetch(`${ApiUrl}/password-reset`, {
        method: 'POST',
        body: JSON.stringify({
            email
        }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
        .then(checkResponse<TResponse>)
        .then(res => {
            if(res.success)
                return res;

            return Promise.reject(res);
        })
}

export const resetPassworApi = (form: TResetPasswordUser) => {
    return fetch(`${ApiUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse<TResponse>)
        .then(res => {
            if(res.success)
                return res;

            return Promise.reject(res)
        })
}

export const registerApi = (form : TRegisterUser) => {
    return fetch(`${ApiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse<TLoginUserResponse>)
        .then(res => {
            if(res.success)
                return res;

            return Promise.reject(res)
        })
}

export const loginApi = (form: TLoginUser) => {
    return fetch(`${ApiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse<TLoginUserResponse>)
        .then(res => {
            if(res.success)
                return res;

            return Promise.reject(res)
        })
}

export const logoutApi = () => {
    return fetch(`${ApiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: getRefreshToken()
        })
    })
        .then(checkResponse<TResponse>)
}

export const getUserApi = () => {
    const headers = new Headers();
    headers.append('Authorization', getAccessToken() ?? '');

    return fetchWithRefresh<TUserResponse>(`${ApiUrl}/auth/user`, {
        method: 'PATCH',
        headers: headers
    })
        .then(res => {
            if(res.success)
                return res;

            return Promise.reject(res)
        })
}

export const updateUser = (form:TUserEditForm) => {
    const headers = new Headers();
    headers.append('Authorization', getAccessToken() ?? '');
    headers.append('Content-Type', 'application/json;charset=utf-8');

    return fetchWithRefresh<TUserResponse>(`${ApiUrl}/auth/user`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(form)
    })
        .then(res => {
            if(res.success)
                return res;

            return Promise.reject(res)
        })
}

export const getIngredientsApi = () => {
    return fetch(ApiGetIngredients)
        .then(checkResponse<TIngredientResponse>)
        .then(res => {
            if(res.success)
                return res.data;

            return Promise.reject(res)
        })
};

export const sendOrderApi = (data:TOrderCreateRequest) => {
    const headers = new Headers();
    headers.append('Authorization', getAccessToken() ?? '');
    headers.append('Content-Type', 'application/json;charset=utf-8');

    return fetchWithRefresh<TOrderCreateResponse>(ApiOrder, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers,
    })
        .then(res => {
            if(res.success) {
                return res;
            }
            return Promise.reject(res)
        })
}