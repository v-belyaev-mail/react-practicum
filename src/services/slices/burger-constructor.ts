import { createSlice } from '@reduxjs/toolkit';

type TBurgerConstructorInitialState = {
    selectedBun: string | null,
    selectedIngredients: string[],
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
        addIngredient: (state, action:TBurgerConstructorAction) => {
            state.selectedIngredients.push(action.payload);
        },
        removeIngredientByIndex: (state, action) => {
            state.selectedIngredients.splice(action.payload, 1);
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