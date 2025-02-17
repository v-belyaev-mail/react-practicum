import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IBurgerConstructorCategory} from "../../utils/types.ts";
import {useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css'
import {Ingredient} from "../ingredient/ingredient.tsx";
import {useAppSelector} from "../../hooks/redux.ts";
import {useLocation, useNavigate} from "react-router-dom";

const categories:IBurgerConstructorCategory[] = [
    {
        id: "bun",
        name: "Булки"
    },
    {
        id: "sauce",
        name: "Соусы"
    },
    {
        id: "main",
        name: "Начинки"
    }
];

export const BurgerIngredients = () => {
    const [category, setCategory] = useState<string>("bun");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const ingredients = useAppSelector(store => store.ingredients.ingredients);

    useEffect(() => {
        wrapperRef.current?.addEventListener('scroll', onScroll);
        return () => {
            wrapperRef.current?.removeEventListener('scroll', onScroll);
        }
    }, [])

    const onScroll = () => {
        if(wrapperRef.current) {
            const scrollTop = wrapperRef.current.scrollTop;
            wrapperRef.current.querySelectorAll<HTMLElement>('[data-category]').forEach((el) => {
                if (el.offsetTop <= scrollTop && el.offsetTop + el.scrollHeight > scrollTop) {
                    if(el.dataset.category) setCategory(el.dataset.category);
                }
            })
        }
    }

    const onSelectIngredient = (ingredientId: string) => {
        navigate(
            `/ingredients/${ingredientId}`,
            {state: {background: location}}
       )
    };

    return (
        <>
            <ul className={styles.tabs}>
                {
                    categories.map(({id, name}) => (
                        <li key={id}>
                            <Tab active={id === category} value={id} onClick={setCategory} data-category={id}>{name}</Tab>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.wrapper} ref={wrapperRef}>
                {
                    categories.map(({id, name}) => (
                        <div key={id} data-category={id}>
                            <h2 className={styles.category_name}>{name}</h2>
                            <div className={styles.items}>
                                {
                                    ingredients.map(ingredient => (
                                        ingredient.type === id && <Ingredient
                                            item={ingredient}
                                            key={ingredient._id}
                                            onDetail={() => onSelectIngredient(ingredient._id)}
                                        />
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