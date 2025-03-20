import {IBurgerConstructorIngredient} from "../../utils/types.ts";
import styles from './ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, useMemo, useRef} from "react";
import {useDrag} from "react-dnd";
import {useAppSelector} from "../../hooks/redux.ts";

interface IIngredientProps {
    item: IBurgerConstructorIngredient,
    onDetail: (ingredient:IBurgerConstructorIngredient) => void,
}
export const Ingredient:FC<IIngredientProps> = (props) => {
    const {selectedIngredients, selectedBun} = useAppSelector(store => store.burgerConstructor);
    const ref = useRef<HTMLDivElement>(null)
    const count:number = useMemo(
        () => props.item.type === "bun"
            ? props.item._id === selectedBun ? 2 : 0
            : selectedIngredients.reduce(
            (accumulator, {ingredient}) => ingredient === props.item._id ? accumulator + 1 : accumulator,
            0
        ),
        [selectedIngredients, selectedBun]
    );
    const [, dragConnector] = useDrag({
        type: "ingredients",
        item: {
            id: props.item._id,
            type: props.item.type
        },
        canDrag: () =>
            !(props.item.type === "bun" && props.item._id === selectedBun)
    });

    dragConnector(ref)

    return (
        <div className={styles.ingredient} onClick={() => props.onDetail(props.item)} ref={ref} data-cy="ingredient">
            <div className={styles.image}>
                <img src={props.item.image} alt={props.item.name}/>
                {
                    count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />
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