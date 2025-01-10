import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IBurgerConstructorIngredient, TRequestState} from "../../utils/types.ts";
import {getIngredientsApi} from "../api.ts";

type TIngredientInitialState = {
    currentIngredient: IBurgerConstructorIngredient | null,
    ingredients: IBurgerConstructorIngredient[],
} & TRequestState

const ingredientsInitialState: TIngredientInitialState = {
    ingredients: [],
    currentIngredient: null,
    loading: false,
    error: null
}

export const loadIngredients = createAsyncThunk(
    'ingredients/load',
    async () => {
        return await getIngredientsApi()
    }
)

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: ingredientsInitialState,
    reducerPath: 'ingredients',
    reducers: {
        setCurrentIngredient: (state, action) => {
            state.currentIngredient = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadIngredients.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loadIngredients.fulfilled, (state, { payload }) => {
            state.ingredients = payload
            state.loading = false
        })
        builder.addCase(loadIngredients.rejected, (state, action) => {
            state.error = action.error.message ?? null
            state.loading = false
        })
    }
})