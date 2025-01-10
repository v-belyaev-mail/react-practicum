import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {TConstructorIngredient} from "../../utils/types.ts";

type TBurgerConstructorInitialState = {
    selectedBun: string | null,
    selectedIngredients: TConstructorIngredient[],
}

type TBurgerConstructorAction = {
    payload: string;
    type: string;
}

const burgerConstructorInitialState: TBurgerConstructorInitialState = {
    selectedBun: null,
    selectedIngredients: []
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    reducerPath: 'burgerConstructor',
    initialState: burgerConstructorInitialState,
    reducers: {
        addBun: (state, action:TBurgerConstructorAction) => {
            state.selectedBun = action.payload;
        },
        addIngredient: {
            reducer: (state, action:PayloadAction<TConstructorIngredient>) => {
                state.selectedIngredients.push(action.payload);
            },
            prepare: (ingredient:string) => {
                const key = nanoid(16);
                return { payload: { key, ingredient } }
            }
        },
        removeIngredientByKey: (state, action) => {
            state.selectedIngredients = state.selectedIngredients.filter(ingredient => ingredient.key !== action.payload);
        },
        removeBun: (state) => {
            state.selectedBun = null;
        },
        clear: state => {
            state.selectedBun = null;
            state.selectedIngredients = [];
        },
        sortIngredients: (state, {payload}) => {
            const dragValue = state.selectedIngredients[payload.dragIndex];
            state.selectedIngredients.splice(payload.dragIndex, 1);
            state.selectedIngredients.splice(payload.hoverIndex, 0, dragValue);
        }
    }
})