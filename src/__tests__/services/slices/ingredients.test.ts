import {ingredientsSlice, ingredientsInitialState, loadIngredients} from "../../../services/slices/ingredients.ts";
import {UnknownAction} from "redux";
import {IBurgerConstructorIngredient} from "../../../utils/types.ts";

const ingredientsMock:IBurgerConstructorIngredient[] = [
    {
        "_id": "1",
        "name": "Биокотлета",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "",
        "image_mobile": "",
        "image_large": "",
        "__v": 0
    }
]

describe('Тестирование стора Ingredients', () => {
    it('Начальное состояние инициировано', () => {
        expect(ingredientsSlice.reducer(undefined, {} as UnknownAction)).toEqual(ingredientsInitialState)
    })

    it('Тестирование редьюсера ingredients/pending', () => {
        expect(ingredientsSlice.reducer(undefined, {type: loadIngredients.pending.type})).toEqual({
            ...ingredientsInitialState,
            loading: true
        })
    })

    it('Тестирование редьюсера ingredients/rejected', () => {
        expect(ingredientsSlice.reducer(undefined, {type: loadIngredients.rejected.type, error: new Error("some error")}))
            .toEqual({
                ...ingredientsInitialState,
                error: "some error",
            })
    })

    it('Тестирование редьюсера ingredients/fulfilled', () => {
        expect(ingredientsSlice.reducer(undefined, {type: loadIngredients.fulfilled.type, payload: ingredientsMock})).toEqual({
            ...ingredientsInitialState,
            ingredients: ingredientsMock
        })
    })
})