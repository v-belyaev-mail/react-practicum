import {combineSlices, configureStore} from '@reduxjs/toolkit';
import {ingredientsSlice} from "./slices/ingredients.ts";
import {burgerConstructorSlice} from "./slices/burger-constructor.ts";
import {ordersSlice} from "./slices/orders.ts";
import {userSlice} from "./slices/user.ts";
import {feedOrderSlice} from "./slices/feed-order.ts";
import {socketMiddleware} from "./middleware/socketMiddleware.ts";
import * as FeedOrder from './slices/feed-order.ts'
import * as ProfileFeedOrder from './slices/profile-feed-order.ts'
import {profileFeedOrderSlice} from "./slices/profile-feed-order.ts";

const rootReducer = combineSlices(
    ingredientsSlice,
    burgerConstructorSlice,
    ordersSlice,
    userSlice,
    feedOrderSlice,
    profileFeedOrderSlice,
)

const feedOrderMiddleware = socketMiddleware({
    connect: FeedOrder.wsFeedOrderConnect,
    disconnect: FeedOrder.wsFeedOrderDisconnect,
    onConnecting: FeedOrder.wsConnecting,
    onOpen: FeedOrder.wsOpen,
    onClose: FeedOrder.wsClose,
    onError: FeedOrder.wsError,
    onMessage: FeedOrder.wsMessage,
});

const profileFeedOrderMiddleware = socketMiddleware({
    connect: ProfileFeedOrder.wsProfileFeedOrderConnect,
    disconnect: ProfileFeedOrder.wsProfileFeedOrderDisconnect,
    onConnecting: ProfileFeedOrder.wsConnecting,
    onOpen: ProfileFeedOrder.wsOpen,
    onClose: ProfileFeedOrder.wsClose,
    onError: ProfileFeedOrder.wsError,
    onMessage: ProfileFeedOrder.wsMessage,
}, true);

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(feedOrderMiddleware, profileFeedOrderMiddleware);
    }
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export default store;