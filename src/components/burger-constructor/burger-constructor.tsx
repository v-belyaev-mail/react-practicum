import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IBurgerConstructorIngredient} from "./burger-constructor-types.ts";
import {FC, useEffect, useRef, useState} from "react";
import {ConstructorIngredient} from "../constructor-ingredient/constructor-ingredient.tsx";
import {Modal} from "../modal/modal.tsx";
import {OrderDetails} from "../order-details/order-details.tsx";

interface IBurgerConstructorProps {
    ingredients: IBurgerConstructorIngredient[];
}

export const BurgerConstructor:FC<IBurgerConstructorProps> = (props) => {
    const selectedBun: string = "643d69a5c3f7b9001cfa093c";
    const selectedIngredients: string[] = [
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0943",
    ];
    const wrapperRef = useRef<HTMLUListElement>(null);
    const totalRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);
    const [placed, setPlaced] = useState<boolean>(false);

    const getElement:(id:string) => IBurgerConstructorIngredient | undefined = (id) => {
        return props.ingredients.find(ingredient => ingredient._id === id)
    }

    const bunItem = getElement(selectedBun)

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize()
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    const onResize = () => {
        if(wrapperRef.current && totalRef.current) {
            const bunHeight:number = selectedBun ? 96 : 0;
            setHeight(window.innerHeight - wrapperRef.current.offsetTop - totalRef.current.offsetHeight - bunHeight);
        }
    }

    return (
        <div className={styles.box}>
            {
                bunItem && <ConstructorIngredient
                    type="top"
                    item={bunItem}
                />
            }
            <ul className={styles.wrapper} ref={wrapperRef} style={{'maxHeight': height > 0 ? height + 'px' : 'auto'}}>
                {
                    selectedIngredients.map((ingredientId, index) => {
                        const ingredient:IBurgerConstructorIngredient | undefined = getElement(ingredientId);
                        return ingredient && (
                            <li key={index}>
                                <ConstructorIngredient
                                    item={ingredient}
                                />
                            </li>
                        )
                    })
                }
            </ul>
            {
                bunItem && <ConstructorIngredient
                    type="bottom"
                    item={bunItem}
                />
            }
            <div className={styles.total} ref={totalRef}>
                <span className={styles.price}>
                    1337
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => setPlaced(true)}>
                    Оформить заказ
                </Button>
            </div>
            {
                placed && <Modal onClose={() => setPlaced(false)}>
                    <OrderDetails/>
                </Modal>
            }
        </div>
    )
}