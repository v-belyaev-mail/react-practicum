import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOrderCreateRequest, TOrder, TOrderSimple} from "../../utils/types.ts";
import {fetchOrderByNumberApi, sendOrderApi} from "../api.ts";

type TOrdersInitialState = {
    lastOrder: TOrder | null,
    beingSent: boolean,
    orders: TOrderSimple[],
}

const ordersInitialState: TOrdersInitialState = {
    lastOrder: null,
    beingSent: false,
    orders: [],
}

export const sendOrder = createAsyncThunk(
    'orders/send',
    async (data:TOrderCreateRequest, {rejectWithValue}) => {
        const response = await sendOrderApi(data);
        if(!response.success)
            return rejectWithValue(response)

        return response.order;
    }
)

export const fetchOrderByNumber = createAsyncThunk(
    'orders/fetchByNumber',
    async (number: string | number, {rejectWithValue})=> {
        const response = await fetchOrderByNumberApi(number)
        if(!response.success)
            return rejectWithValue(response)

        if(typeof response.orders[0] !== 'object')
            return rejectWithValue(response)

        return response.orders[0];
    }
)

export const ordersSlice = createSlice({
    name: 'orders',
    reducerPath: 'orders',
    initialState: ordersInitialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(sendOrder.fulfilled, (state, {payload}) => {
                state.lastOrder = payload;
                state.beingSent = false;
            })
            .addCase(sendOrder.pending, (state) => {
                state.lastOrder = null;
                state.beingSent = true;
            })
            .addCase(sendOrder.rejected, (state) => {
                state.beingSent = false;
            })
            .addCase(fetchOrderByNumber.fulfilled, (state, {payload}) => {
                state.orders = [...state.orders, payload]
            })
    },
    selectors: {
        getOrders: state => state.orders,
    }
})

export const {getOrders} = ordersSlice.selectors