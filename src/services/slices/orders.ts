import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOrderCreateResponse, TOrderCreateRequest} from "../../utils/types.ts";
import {sendOrderApi} from "../api.ts";

type TOrdersInitialState = {
    lastOrder: TOrderCreateResponse | null,
    beingSent: boolean,
}

const ordersInitialState: TOrdersInitialState = {
    lastOrder: null,
    beingSent: false,
}

export const sendOrder = createAsyncThunk(
    'orders/send',
    async (data:TOrderCreateRequest) => {
        return await sendOrderApi(data)
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
            .addCase(sendOrder.fulfilled, (state, action) => {
                state.lastOrder = action.payload;
                state.beingSent = false;
            })
            .addCase(sendOrder.pending, (state) => {
                state.lastOrder = null;
                state.beingSent = true;
            })
            .addCase(sendOrder.rejected, (state) => {
                state.beingSent = false;
            })
    }
})