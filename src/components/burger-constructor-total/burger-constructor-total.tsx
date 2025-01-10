import {FC, SyntheticEvent, useMemo} from "react";
import styles from "./burger-constructor-total.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks/redux.ts";

type TBurgerConstructorTotalProps = {
    onSubmit: (e: SyntheticEvent<Element, Event>) => void;
}

export const BurgerConstructorTotal:FC<TBurgerConstructorTotalProps> = ({onSubmit}) => {
    const {selectedBun, selectedIngredients} = useAppSelector(store => store.burgerConstructor)
    const {ingredients} = useAppSelector(store => store.ingredients)

    const totalPrice:number = useMemo(
        () => {
            let totalPrice = 0;
            if(selectedBun) {
                const bunIngredient = ingredients.find(
                    (ingredient) => ingredient._id === selectedBun
                )
                if(bunIngredient) totalPrice = bunIngredient.price * 2
            }

            totalPrice += selectedIngredients.reduce((accumulator, {ingredient}) => {
                const ingredientItem =  ingredients.find(
                    (item) => item._id === ingredient
                )
                return accumulator + (ingredientItem ? ingredientItem?.price : 0);
            }, 0)

            return totalPrice
        },
        [selectedBun, selectedIngredients, ingredients]
    )

    return (
        <>
            <span className={styles.price}>
                {totalPrice}
                <CurrencyIcon type="primary"/>
            </span>
            <Button htmlType="submit" size="large" onClick={onSubmit}>
                Оформить заказ
            </Button>
        </>
    )
}