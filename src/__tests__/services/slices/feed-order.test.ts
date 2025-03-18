import {feedOrderSlice, initialState} from "../../../services/slices/feed-order.ts";
import {TOrderWsResponse, WebsocketStatus} from "../../../utils/types.ts";
import {UnknownAction} from "redux";

const orderFeedMock:TOrderWsResponse = {
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

describe('Тестирование стора FeedOrder', () => {
    it('Начальное состояние инициировано', () => {
        expect(feedOrderSlice.reducer(undefined, {} as UnknownAction)).toEqual(initialState)
    })

    it('Проверка редьюсера wsConnect', () => {
        expect(feedOrderSlice.reducer(undefined, {type: 'feedOrder/wsConnecting'}))
            .toEqual({...initialState, status: WebsocketStatus.CONNECTING});
    })

    it('Проверка редьюсера wsOpen', () => {
        expect(feedOrderSlice.reducer(undefined, {type: 'feedOrder/wsOpen'}))
            .toEqual({...initialState, status: WebsocketStatus.ONLINE});
    })

    it('Проверка редьюсера wsClose', () => {
        expect(feedOrderSlice.reducer(undefined, {type: 'feedOrder/wsClose'}))
            .toEqual({...initialState, status: WebsocketStatus.OFFLINE});
    })

    it('Проверка редьюсера wsError', () => {
        expect(feedOrderSlice.reducer(undefined, {type: 'feedOrder/wsError', payload: "some error"}))
            .toEqual({...initialState, error: "some error"});
    })

    it('Проверка редьюсера wsMessage', () => {
        expect(feedOrderSlice.reducer(undefined, {type: 'feedOrder/wsMessage', payload: orderFeedMock}))
            .toEqual({
                ...initialState,
                orders: orderFeedMock.orders,
                total: orderFeedMock.total,
                totalToday: orderFeedMock.totalToday
            });
    })
})