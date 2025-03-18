import {ordersInitialState, ordersSlice, sendOrder, fetchOrderByNumber} from "../../../services/slices/orders.ts";
import {UnknownAction} from "redux";
import {TOrder, TOrderSimple} from "../../../utils/types.ts";

const orderMock:TOrder = {
    "ingredients": [
        {
            "_id": "b1",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
            "__v": 0
        },
        {
            "_id": "i1",
            "name": "Соус фирменный Space Sauce",
            "type": "sauce",
            "proteins": 50,
            "fat": 22,
            "carbohydrates": 11,
            "calories": 14,
            "price": 80,
            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            "__v": 0
        },
        {
            "_id": "b1",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
            "__v": 0
        }
    ],
    "_id": "67d9b2de6fce7d001db5af23",
    "owner": {
        "name": "Volodya",
        "email": "volodya@gmail.com",
    },
    "status": "done",
    "name": "Space флюоресцентный бургер",
    "createdAt": "2025-03-18T17:52:30.496Z",
    "updatedAt": "2025-03-18T17:52:31.187Z",
    "number": 71554,
    "price": 2056
}

const fetchOrderMock:TOrderSimple =  {
    "_id": "1",
    "ingredients": [
        "b1",
        "i1",
        "b1"
    ],
    "owner": "679d25a0133acd001be4dc93",
    "status": "done",
    "name": "Space флюоресцентный бургер",
    "createdAt": "2025-03-18T17:52:30.496Z",
    "updatedAt": "2025-03-18T17:52:31.187Z",
    "number": 71554,
}

describe('Тестирование стора Orders', () => {
    it('Начальное состояние инициировано', () => {
        expect(ordersSlice.reducer(undefined, {} as UnknownAction)).toEqual(ordersInitialState)
    })

    it('Тестирование редьюсера orders/sendOrder.pending', () => {
        expect(ordersSlice.reducer(undefined, {type: sendOrder.pending.type})).toEqual({
            ...ordersInitialState,
            beingSent: true
        })
    })

    it('Тестирование редьюсера orders/sendOrder.rejected', () => {
        expect(ordersSlice.reducer(undefined, {type: sendOrder.rejected.type}))
            .toEqual(ordersInitialState)
    })

    it('Тестирование редьюсера orders/sendOrder.fulfilled', () => {
        expect(ordersSlice.reducer(undefined, {type: sendOrder.fulfilled.type, payload: orderMock})).toEqual({
            ...ordersInitialState,
            lastOrder: orderMock
        })
    })

    it('Тестирование редьюсера orders/fetchOrderByNumber.fulfilled', () => {
        expect(ordersSlice.reducer(undefined, {type: fetchOrderByNumber.fulfilled.type, payload: fetchOrderMock})).toEqual({
            ...ordersInitialState,
            orders: [fetchOrderMock]
        })
    })
})