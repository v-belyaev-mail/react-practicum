import {IBurgerConstructorIngredient} from "../burger-constructor/burger-constructor-types.ts";
import styles from './ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";

interface IIngredientProps {
    item: IBurgerConstructorIngredient,
    onDetail: (ingredient:IBurgerConstructorIngredient) => void,
}
export const Ingredient:FC<IIngredientProps> = (props) => {
    return (
        <div className={styles.ingredient} onClick={() => props.onDetail(props.item)}>
            <div className={styles.image}>
                <img src={props.item.image} alt={props.item.name}/>
                {
                    props.item.__v > 0 && <Counter count={props.item.__v} size="default" extraClass={styles.counter} />
                }
            </div>
            <span className={styles.price}>
                {props.item.price}
                <CurrencyIcon type="primary"/>
            </span>
            <span className={styles.title}>{props.item.name}</span>
        </div>
    )
}