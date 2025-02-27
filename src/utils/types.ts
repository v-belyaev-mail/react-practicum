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

export type TOrderCreateResponseData = {
    _id: string;
    number: string;
    name: string;
    createdAt: string;
    ingredients: IBurgerConstructorIngredient[],
    owner: TUser,
    price: number;
    status: string;
    updatedAt: string;
}

export type TOrderCreateResponse = TResponse & {
    name: string;
    order: TOrderCreateResponseData;
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

export type TUser = {
    email: string;
    name: string;
}

export type TLoginUser = {
    email: string;
    password: string;
}

export type TRegisterUser = TLoginUser & {
    name: string;
}

export type TResetPasswordUser = {
    password: string;
    token: string;
}

export type TResponse = {
    success: boolean;
    message?: string;
}

export type TTokenResponse = TResponse & {
    accessToken: string;
    refreshToken: string;
}

export type TUserResponse = TResponse & {
    user: TUser
}

export type TLoginUserResponse = TTokenResponse & {
    user: TUser;
}

export type TUserEditForm = {
    email: string;
    password?: string;
    name: string;
}

export type TIngredientResponse = TResponse & {
    data: IBurgerConstructorIngredient[]
}