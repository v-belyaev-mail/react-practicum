import AppHeader from "./app-header/app-header.tsx";
import {ConstructorPage} from "./app-content/page/constructor-page.tsx";
import {useEffect, useState} from "react";
import {IBurgerConstructorIngredient} from "./burger-constructor/burger-constructor-types.ts";
import {ApiGetIngredients} from "../constants/api.ts";

export default function App()
{
    const [ingredients, setIngredients] = useState<IBurgerConstructorIngredient[] | undefined>();

    useEffect(() => {
        fetch(ApiGetIngredients)
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: статус ${res.status}`);
            })
            .then(json => json.data && setIngredients(json.data))
            .catch(console.error);
    }, [])

    return (
        <div className="burger-app">
            {
                ingredients && (
                    <>
                    <AppHeader/>
                    <ConstructorPage ingredients={ingredients} />
                    </>
                )
            }
        </div>
    )
}