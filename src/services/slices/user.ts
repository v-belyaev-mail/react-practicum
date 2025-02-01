import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserApi, loginApi, logoutApi, registerApi, updateUser} from "../api.ts";
import {TLoginUser, TRegisterUser, TResponse, TUser, TUserEditForm} from "../../utils/types.ts";
import {clearTokens, setTokens} from "../../utils/token-storage.ts";

type TUserInitialState = {
    isAuthenticated: boolean,
    isAuthChecked: boolean,
    user: TUser
}

const userInitialState:TUserInitialState = {
    isAuthenticated: false,
    isAuthChecked: false,
    user: {
        email: '',
        name: ''
    }
}

export const login = createAsyncThunk<TUser, TLoginUser>(
    'user/login',
    async (authData, {rejectWithValue}) => {
        const response = await loginApi(authData);
        if(!response.success)
            return rejectWithValue(response)

        setTokens(response.accessToken, response.refreshToken)

        return response.user
    }
)

export const register = createAsyncThunk<TUser, TRegisterUser>(
    'user/register',
    async (registerData, {rejectWithValue})=> {
        const response = await registerApi(registerData);

        if(!response.success)
            return rejectWithValue(response)

        setTokens(response.accessToken, response.refreshToken)

        return response.user;
    }
)

export const logout = createAsyncThunk<TResponse>(
    'user/logout',
    async (_p, {rejectWithValue}) => {
        const response = await logoutApi();
        if(!response.success)
            return rejectWithValue(response)

        clearTokens()

        return response;
    }
)

export const fetchUser = createAsyncThunk<TUser>(
    'user/fetch',
    async (_p, {rejectWithValue}) => {
        const response = await getUserApi();
        if(!response.success)
            return rejectWithValue(response)

        return response.user;
    }
)

export const editUser = createAsyncThunk<TUser, TUserEditForm>(
    'user/edit',
    async (form, {rejectWithValue}) => {
        const response = await updateUser(form);
        if(!response.success)
            return rejectWithValue(response);

        return response.user;
    }
)

export const userSlice = createSlice({
    name: 'user',
    reducerPath: 'user',
    initialState: userInitialState,
    reducers: {},
    selectors: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getIsAuthChecked: (state) => state.isAuthChecked,
        getUser: (state) => state.user,
    },
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.isAuthenticated = true;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.isAuthenticated = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(fetchUser.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.isAuthenticated = true;
                state.isAuthChecked = true;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.isAuthChecked = true
            })
            .addCase(fetchUser.pending, (state) => {
                state.isAuthenticated = false
                state.isAuthChecked = false
            })
            .addCase(editUser.fulfilled, (state, {payload}) => {
                state.user = payload;
            })
    }
})

export const { getIsAuthenticated, getIsAuthChecked, getUser } = userSlice.selectors;