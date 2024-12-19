import {BurgerIngredients} from "../../burger-ingredients/burger-ingredients.tsx";
import {BurgerConstructor} from "../../burger-constructor/burger-constructor.tsx";
import styles from './constructor-page.module.css'
import {IBurgerConstructorCategory, IBurgerConstructorIngredient} from "../../burger-constructor/burger-constructor-types.ts";
import {FC} from "react";

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

type ConstructorPageProps = {
    ingredients?: IBurgerConstructorIngredient[]
}

export const ConstructorPage:FC<ConstructorPageProps> = ({ingredients}) => {
    return (
        <main className={styles.page}>
            {
                ingredients &&
                <>
                    <section className={styles.ingredients_section}>
                        <h1 className={styles.title}>Соберите бургер</h1>
                        <BurgerIngredients ingredients={ingredients} categories={categories}/>
                    </section>
                    <section className={styles.constructor_section}>
                        <BurgerConstructor ingredients={ingredients}></BurgerConstructor>
                    </section>
                </>
            }
        </main>
    )
}