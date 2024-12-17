import {FC} from "react";
import {IBurgerConstructorItem} from "./burger-constructor-types.ts";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-ingredient.module.css'

type ConstructorIngredientProps = {
    item: IBurgerConstructorItem,
    type?: "top" | "bottom"
}

export const ConstructorIngredient:FC<ConstructorIngredientProps> = ({item, type}) => {
    let itemName:string = item.name;
    let className:string = styles.element;

    switch (type) {
        case "bottom":
            itemName += ' (низ)';
            className += ' pl-8';
            break;
        case "top":
            itemName += ' (верх)';
            className += ' pl-8';
            break;
    }

    return (
        <div className={className}>
            {
                !type && <span className={styles.drag_icon}>
                <DragIcon type="primary"/>
                </span>
            }
            <ConstructorElement
                type={type}
                isLocked={type !== undefined}
                text={itemName}
                price={item.price}
                thumbnail={item.image_mobile}
            />
        </div>
    )
}