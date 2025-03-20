import {
    userSlice,
    userInitialState,
    register,
    login,
    logout,
    fetchUser, editUser
} from "../../../services/slices/user.ts";
import {UnknownAction} from "redux";
import {TUser} from "../../../utils/types.ts";

const userMock:TUser = {
    email: 'harry@email.su',
    name: 'Harry',
}

describe('Тестирование слайса User', () => {
    it('Начальное состояние инициировано', () => {
        expect(userSlice.reducer(undefined, {} as UnknownAction)).toEqual(userInitialState)
    })

    it('Тестирование редьюсера user/register.fulfilled', () => {
        expect(userSlice.reducer(undefined, {type: register.fulfilled.type, payload: userMock})).toEqual({
            ...userInitialState,
            user: userMock,
            isAuthenticated: true
        })
    })

    it('Тестирование редьюсера ingredients/login.fulfilled', () => {
        expect(userSlice.reducer(undefined, {type: login.fulfilled.type, payload: userMock}))
            .toEqual({
                ...userInitialState,
                user: userMock,
                isAuthenticated: true
            })
    })

    it('Тестирование редьюсера ingredients/logout.fulfilled', () => {
        expect(userSlice.reducer({...userInitialState, isAuthenticated: true}, {type: logout.fulfilled.type}))
            .toEqual({
                ...userInitialState,
                isAuthenticated: false
            })
    })

    it('Тестирование редьюсера ingredients/fetchUser.fulfilled', () => {
        expect(userSlice.reducer(undefined, {type: fetchUser.fulfilled.type, payload: userMock}))
            .toEqual({
                ...userInitialState,
                user: userMock,
                isAuthenticated: true,
                isAuthChecked: true
            })
    })

    it('Тестирование редьюсера ingredients/fetchUser.rejected', () => {
        expect(userSlice.reducer(undefined, {type: fetchUser.rejected.type}))
            .toEqual({
                ...userInitialState,
                isAuthChecked: true
            })
    })

    it('Тестирование редьюсера ingredients/fetchUser.pending', () => {
        expect(userSlice.reducer(undefined, {type: fetchUser.pending.type}))
            .toEqual(userInitialState)
    })

    it('Тестирование редьюсера ingredients/editUser.pending', () => {
        expect(userSlice.reducer(undefined, {type: editUser.fulfilled.type, payload: userMock}))
            .toEqual({...userInitialState, user: userMock})
    })
})