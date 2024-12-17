import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IBurgerConstructorItem} from "./burger-constructor-types.ts";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {ConstructorIngredient} from "./constructor-ingredient.tsx";

interface IBurgerConstructorProps {
    items: IBurgerConstructorItem[];
}

export const BurgerConstructor = (props: IBurgerConstructorProps) => {
    const bun: string = "60666c42cc7b410027a1a9b1";
    const ingredients: string[] = [
        "60666c42cc7b410027a1a9b5",
        "60666c42cc7b410027a1a9b6",
        "60666c42cc7b410027a1a9b7",
        "60666c42cc7b410027a1a9b9",
    ];
    const wrapperRef = useRef<HTMLUListElement>(null);
    const totalRef = useRef<HTMLDivElement>(null);
    const [height, setHeight]:[number, Dispatch<SetStateAction<number>>] = useState(0);

    const getElement:(id:string) => IBurgerConstructorItem | undefined = (id) => {
        return props.items.find(item => item._id === id)
    }

    const bunItem = getElement(bun)

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize()
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    const onResize = () => {
        if(wrapperRef.current && totalRef.current) {
            const bunHeight:number = bun ? 96 : 0;
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
                    ingredients.map((ingredient, index) => {
                        const item:IBurgerConstructorItem | undefined = getElement(ingredient);
                        return item && (
                            <li key={index}>
                                <ConstructorIngredient
                                    item={item}
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
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}