import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IBurgerConstructorCategory, IBurgerConstructorItem} from "../burger-constructor/burger-constructor-types.ts";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css'
import {Ingredient} from "./ingredient.tsx";

interface IBurgerIngredientsProps {
    categories: IBurgerConstructorCategory[],
    items: IBurgerConstructorItem[]
}

export const BurgerIngredients = (props: IBurgerIngredientsProps) => {
    const [category, setCategory]:[string, Dispatch<SetStateAction<string>>] = useState("bun");
    const [height, setHeight]:[number, Dispatch<SetStateAction<number>>] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize()
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    const onResize = () => {
        if(wrapperRef.current) {
            setHeight(window.innerHeight - wrapperRef.current.offsetTop)
        }
    }

    return (
        <>
            <ul className={styles.tabs}>
                {
                    props.categories.map(({id, name}) => (
                        <li key={id}>
                            <Tab active={id === category} value={id} onClick={setCategory}>{name}</Tab>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.wrapper} ref={wrapperRef} style={{'maxHeight': height > 0 ? height + 'px' : 'auto'}}>
                {
                    props.categories.map(({id, name}) => (
                        <div key={id} data-category={id}>
                            <h2 className={styles.category_name}>{name}</h2>
                            <div className={styles.items}>
                                {
                                    props.items.map(item => (
                                        item.type === id && <Ingredient item={item} key={item._id}/>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}