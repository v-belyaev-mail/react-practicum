import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrderSimple, TOrderWsResponse, WebsocketStatus} from "../../utils/types.ts";

export const wsProfileFeedOrderConnect =
    createAction<string, "PROFILE_FEED_CONNECT">("PROFILE_FEED_CONNECT");
export const wsProfileFeedOrderDisconnect = createAction("PROFILE_FEED_DISCONNECT");

export type ProfileFeedOrderStore = {
    status: WebsocketStatus;
    orders: TOrderSimple[];
    error: string | null;
    total: number;
    totalToday: number;
}

export const initialState: ProfileFeedOrderStore = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    error: null,
    total: 0,
    totalToday: 0
};

export const profileFeedOrderSlice = createSlice({
    name: "ProfileFeedOrder",
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

export const { wsConnecting, wsClose, wsError, wsMessage, wsOpen } = profileFeedOrderSlice.actions;
export const { getError, getStatus, getOrders } = profileFeedOrderSlice.selectors;