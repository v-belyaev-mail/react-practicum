import {ApiGetIngredients, ApiOrder} from "../constants/api.ts";
import {TOrderCreateRequest} from "../utils/types.ts";

const checkResponse = (res:Response) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: статус ${res.status}`);
}

export const getIngredientsApi = () => {
    return fetch(ApiGetIngredients)
        .then(checkResponse)
        .then(res => {
            if(res.success) {
                return res.data;
            }
            return Promise.reject(res)
        })
        .catch(console.error);
};

export const sendOrderApi = (data:TOrderCreateRequest) => {
    return fetch(ApiOrder, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    })
        .then(checkResponse)
        .then(res => {
            if(res.success) {
                return res.order;
            }
            return Promise.reject(res)
        })
        .catch(console.error);
}