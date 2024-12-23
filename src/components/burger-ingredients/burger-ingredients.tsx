import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IBurgerConstructorCategory, IBurgerConstructorIngredient} from "../burger-constructor/burger-constructor-types.ts";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css'
import {Ingredient} from "../ingredient/ingredient.tsx";
import {Modal} from "../modal/modal.tsx";
import {IngredientDetails} from "../ingredient-details/ingredient-details.tsx";
import {useModal} from "../../hooks/useModal.ts";

interface IBurgerIngredientsProps {
    categories: IBurgerConstructorCategory[],
    ingredients: IBurgerConstructorIngredient[]
}

export const BurgerIngredients:FC<IBurgerIngredientsProps> = (props) => {
    const [category, setCategory] = useState<string>("bun");
    const [height, setHeight] = useState<number>(0);
    const [selectedIngredient, setSelectedIngredient] = useState<IBurgerConstructorIngredient|null>(null);
    const {isModalOpen, openModal, closeModal} = useModal();
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

    const onClosePopup:() => void = useCallback(() => {
        setSelectedIngredient(null);
        closeModal();
    }, [setSelectedIngredient, closeModal]);

    const onShowPopup:(ingredient: IBurgerConstructorIngredient) => void = useCallback((ingredient) => {
        setSelectedIngredient(ingredient);
        openModal();
    }, [setSelectedIngredient, openModal]);

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
                                    props.ingredients.map(ingredient => (
                                        ingredient.type === id && <Ingredient item={ingredient} key={ingredient._id} onDetail={() => onShowPopup(ingredient)}/>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {isModalOpen && selectedIngredient && <Modal title="Детали ингредиента" onClose={onClosePopup}>
                <IngredientDetails ingredient={selectedIngredient}/>
            </Modal>}
        </>
    )
}