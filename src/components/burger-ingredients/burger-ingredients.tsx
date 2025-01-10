import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IBurgerConstructorCategory, IBurgerConstructorIngredient} from "../../utils/types.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css'
import {Ingredient} from "../ingredient/ingredient.tsx";
import {Modal} from "../modal/modal.tsx";
import {IngredientDetails} from "../ingredient-details/ingredient-details.tsx";
import {useModal} from "../../hooks/useModal.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {ingredientsSlice} from "../../services/slices/ingredients.ts";

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
    const [height, setHeight] = useState<number>(0);
    const {isModalOpen, openModal, closeModal} = useModal();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const {ingredients, currentIngredient} = useAppSelector(store => store.ingredients);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        wrapperRef.current?.addEventListener('scroll', onScroll);
        onResize()
        return () => {
            window.removeEventListener('resize', onResize);
            wrapperRef.current?.removeEventListener('scroll', onScroll);
        }
    }, [])

    const onResize = () => {
        if(wrapperRef.current) {
            setHeight(window.innerHeight - wrapperRef.current.offsetTop)
        }
    }

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

    const onClosePopup:() => void = useCallback(() => {
        dispatch(ingredientsSlice.actions.setCurrentIngredient(null));
        closeModal();
    }, [dispatch, closeModal]);

    const onShowPopup:(ingredient: IBurgerConstructorIngredient) => void = useCallback((ingredient) => {
        dispatch(ingredientsSlice.actions.setCurrentIngredient(ingredient));
        openModal();
    }, [dispatch, openModal]);

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
            <div className={styles.wrapper} ref={wrapperRef} style={{'maxHeight': height > 0 ? height + 'px' : 'auto'}}>
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
                                            onDetail={() => onShowPopup(ingredient)}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {isModalOpen && currentIngredient && <Modal title="Детали ингредиента" onClose={onClosePopup}>
                <IngredientDetails ingredient={currentIngredient}/>
            </Modal>}
        </>
    )
}