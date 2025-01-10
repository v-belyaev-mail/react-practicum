export interface IBurgerConstructorCategory {
    id: string;
    name: string;
}

export interface IBurgerConstructorIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type TRequestState = {
    loading: boolean;
    error: string | null;
}

export type TOrderCreateRequest = {
    ingredients: string[];
}

export type TOrderCreateResponse = {
    number: string;
}

export type TIngredientDropData = {
    id: string;
    type: string;
}

export type TConstructorIngredientsSortObject = {

    dragIndex:number;
    hoverIndex:number;
}

export type TConstructorIngredient = {
    ingredient: string;
    key: string;
}