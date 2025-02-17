import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOrderCreateRequest, TOrderCreateResponseData} from "../../utils/types.ts";
import {sendOrderApi} from "../api.ts";

type TOrdersInitialState = {
    lastOrder: TOrderCreateResponseData | null,
    beingSent: boolean,
}

const ordersInitialState: TOrdersInitialState = {
    lastOrder: null,
    beingSent: false,
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
    }
})