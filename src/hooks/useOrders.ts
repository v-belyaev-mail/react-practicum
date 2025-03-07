import {IBurgerOrderIngredient, TOrderSimple, TOrderSimpleUi} from "../utils/types.ts";
import {useMemo} from "react";
import {useAppSelector} from "./redux.ts";

export function useOrder(order: TOrderSimple):TOrderSimpleUi {
    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    return useMemo(() => {
         const newIngredients = Object.values(order.ingredients.reduce(
             (acc: {[key:string]: IBurgerOrderIngredient }, current) => {
                 if(!acc[current]) {
                    const ingredient = ingredients.find(ingredientItem => ingredientItem._id === current);
                    if(ingredient)
                        acc[current] = {...ingredient, count: 1};
                 } else {
                     acc[current].count += 1;
                 }

                 return acc
         }, {}))


        return {
             ...order,
            total: newIngredients.reduce((acc, current) => acc + current.count * current.price, 0),
            ingredients: newIngredients
        }
    }, [ingredients, order])
}