import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOrderCreateResponse, TOrderCreateRequest} from "../../utils/types.ts";
import {sendOrderApi} from "../api.ts";
import {loadIngredients} from "./ingredients.ts";

type TOrdersInitialState = {
    lastOrder: TOrderCreateResponse | null,
}

const ordersInitialState: TOrdersInitialState = {
    lastOrder: null,
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
            })
            .addCase(loadIngredients.pending, (state) => {
                state.lastOrder = null;
            })
    }
})