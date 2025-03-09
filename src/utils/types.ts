export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

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

export interface IBurgerOrderIngredient extends IBurgerConstructorIngredient {
    count: number;
}

export type TRequestState = {
    loading: boolean;
    error: string | null;
}

export type TOrderCreateRequest = {
    ingredients: string[];
}

export type TOrder = {
    _id: string;
    number: number;
    name: string;
    createdAt: string;
    ingredients: IBurgerConstructorIngredient[],
    owner: TUser,
    price: number;
    status: string;
    updatedAt: string;
}

export type TOrderSimple = Omit<TOrder, 'owner' | 'price' | 'ingredients'> & {
    ingredients: string[];
    owner?: string;
}

export type TOrderSimpleUi = Omit<TOrderSimple, 'ingredients'> & {
    ingredients: IBurgerOrderIngredient[];
    total: number;
}

export type TOrderFetchResponse = TResponse & {
    orders: TOrderSimple[];
}

export type TOrderCreateResponse = TResponse & {
    name: string;
    order: TOrder;
}

export type TOrderWsResponse = TResponse & {
    orders: TOrderSimple[];
    total: number;
    totalToday: number;
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