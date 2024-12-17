import {IBurgerConstructorItem} from "../burger-constructor/burger-constructor-types.ts";
import styles from './ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IIngredientProps {
    item: IBurgerConstructorItem
}
export const Ingredient = (props:IIngredientProps) => {
    return (
        <div className={styles.ingredient}>
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