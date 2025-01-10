import AppHeader from "./app-header/app-header.tsx";
import {ConstructorPage} from "./app-content/page/constructor-page.tsx";
import {useEffect} from "react";
import {loadIngredients} from "../services/slices/ingredients.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";

export default function App()
{
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(store => store.ingredients);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch])

    return (
        <div className="burger-app">
            {
                !loading && (
                    <>
                        <AppHeader/>
                        <ConstructorPage />
                    </>
                )
            }
        </div>
    )
}