import {profileFeedOrderSlice, initialState} from "../../../services/slices/profile-feed-order.ts";
import {TOrderWsResponse, WebsocketStatus} from "../../../utils/types.ts";
import {UnknownAction} from "redux";

const profileOrderFeedMock:TOrderWsResponse = {
    orders: [
        {
            "_id":"a1",
            "ingredients":[
                "ai1",
                "ai2",
                "ai3"
            ],
            "status":"done",
            "name":"Space флюоресцентный бургер",
            "createdAt":"2025-03-18T16:40:02.274Z",
            "updatedAt":"2025-03-18T16:40:02.940Z",
            "number":1
        }
    ],
    success: true,
    total: 1,
    totalToday: 1
}

describe('Тестирование стора ProfileFeedOrder', () => {
    it('Начальное состояние инициировано', () => {
        expect(profileFeedOrderSlice.reducer(undefined, {} as UnknownAction)).toEqual(initialState)
    })

    it('Проверка редьюсера wsConnect', () => {
        expect(profileFeedOrderSlice.reducer(undefined, {type: 'ProfileFeedOrder/wsConnecting'}))
            .toEqual({...initialState, status: WebsocketStatus.CONNECTING});
    })

    it('Проверка редьюсера wsOpen', () => {
        expect(profileFeedOrderSlice.reducer(undefined, {type: 'ProfileFeedOrder/wsOpen'}))
            .toEqual({...initialState, status: WebsocketStatus.ONLINE});
    })

    it('Проверка редьюсера wsClose', () => {
        expect(profileFeedOrderSlice.reducer(undefined, {type: 'ProfileFeedOrder/wsClose'}))
            .toEqual({...initialState, status: WebsocketStatus.OFFLINE});
    })

    it('Проверка редьюсера wsError', () => {
        expect(profileFeedOrderSlice.reducer(undefined, {type: 'ProfileFeedOrder/wsError', payload: "some error"}))
            .toEqual({...initialState, error: "some error"});
    })

    it('Проверка редьюсера wsMessage', () => {
        expect(profileFeedOrderSlice.reducer(undefined, {type: 'ProfileFeedOrder/wsMessage', payload: profileOrderFeedMock}))
            .toEqual({
                ...initialState,
                orders: profileOrderFeedMock.orders,
                total: profileOrderFeedMock.total,
                totalToday: profileOrderFeedMock.totalToday
            });
    })
})