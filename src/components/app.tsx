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
            .then(res => res.json())
            .then(json => json.data && setIngredients(json.data))
            .catch(err => console.error(err));
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