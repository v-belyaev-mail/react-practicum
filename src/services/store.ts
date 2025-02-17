import {combineSlices, configureStore} from '@reduxjs/toolkit';
import {ingredientsSlice} from "./slices/ingredients.ts";
import {burgerConstructorSlice} from "./slices/burger-constructor.ts";
import {ordersSlice} from "./slices/orders.ts";
import {userSlice} from "./slices/user.ts";

const rootReducer = combineSlices(
    ingredientsSlice,
    burgerConstructorSlice,
    ordersSlice,
    userSlice,
)

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export default store;