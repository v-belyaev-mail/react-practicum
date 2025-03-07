import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrderSimple, TOrderWsResponse, WebsocketStatus} from "../../utils/types.ts";

export const wsFeedOrderConnect = createAction<string, "FEED_CONNECT">("FEED_CONNECT");
export const wsFeedOrderDisconnect = createAction("FEED_DISCONNECT");

export type FeedOrderStore = {
    status: WebsocketStatus;
    orders: TOrderSimple[];
    error: string | null;
    total: number;
    totalToday: number;
}

export const initialState: FeedOrderStore = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    error: null,
    total: 0,
    totalToday: 0
};

export const feedOrderSlice = createSlice({
    name: "feedOrder",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.error = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrderWsResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
    selectors: {
        getStatus: state => state.status,
        getError: state => state.error,
        getOrders: state => state.orders
    }
})

export const { wsConnecting, wsClose, wsError, wsMessage, wsOpen } = feedOrderSlice.actions;
export const { getError, getStatus, getOrders } = feedOrderSlice.selectors;