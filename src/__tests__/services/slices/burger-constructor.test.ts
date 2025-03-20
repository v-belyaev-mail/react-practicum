import {burgerConstructorSlice, burgerConstructorInitialState} from "../../../services/slices/burger-constructor.ts";
import {UnknownAction} from "redux";

const constructorIngredientMock = [
    {
        key: 'k1',
        ingredient: 'i1'
    },
    {
        key: 'k2',
        ingredient: 'i2'
    },
]

describe('Тестирование стора burgerConstructor', () => {
    it('Начальное состояние инициировано', () => {
        expect(burgerConstructorSlice.reducer(undefined, {} as UnknownAction)).toEqual(burgerConstructorInitialState)
    })

    it('Тестирование редьюсера burgerConstructor/addBun', () => {
        expect(burgerConstructorSlice.reducer(undefined, {type: 'burgerConstructor/addBun', payload: "bun1"})).toEqual({
            ...burgerConstructorInitialState,
            selectedBun: "bun1"
        })
    })

    it('Тестирование редьюсера burgerConstructor/addIngredient', () => {
        expect(burgerConstructorSlice.reducer(undefined, {type: 'burgerConstructor/addIngredient', payload: "ingredient1"})).toEqual({
            ...burgerConstructorInitialState,
            selectedIngredients: [
                "ingredient1"
            ]
        })
    })

    it('Тестирование редьюсера burgerConstructor/removeIngredientByKey', () => {
        expect(burgerConstructorSlice
            .reducer(
                {
                    ...burgerConstructorInitialState,
                    selectedIngredients: constructorIngredientMock
                },
                {
                    type: 'burgerConstructor/removeIngredientByKey',
                    payload: 'k1'
                }
            )
        ).toEqual({
                ...burgerConstructorInitialState,
                selectedIngredients: constructorIngredientMock.filter(ingredient => ingredient.key !== 'k1')
            })
    })

    it('Тестирование редьюсера burgerConstructor/removeBun', () => {
        expect(burgerConstructorSlice
            .reducer(
                {
                    ...burgerConstructorInitialState,
                    selectedBun: "bun1"
                },
                {
                    type: 'burgerConstructor/removeBun',
                    payload: "ingredient1"
                }
            )
        ).toEqual(burgerConstructorInitialState)
    })

    it('Тестирование редьюсера burgerConstructor/clear', () => {
        expect(burgerConstructorSlice
            .reducer(
                {
                    ...burgerConstructorInitialState,
                    selectedIngredients: constructorIngredientMock,
                    selectedBun: "bun1"
                },
                {
                    type: 'burgerConstructor/clear',
                }
            )
        ).toEqual(burgerConstructorInitialState)
    })

    it('Тестирование редьюсера burgerConstructor/sortIngredients', () => {
        expect(burgerConstructorSlice
            .reducer(
                {
                    ...burgerConstructorInitialState,
                    selectedIngredients: constructorIngredientMock
                },
                {
                    type: 'burgerConstructor/sortIngredients',
                    payload: {hoverIndex: 1, dragIndex: 0}
                }
            )
        ).toEqual({...burgerConstructorInitialState, selectedIngredients: [...constructorIngredientMock].reverse()})
    })


})