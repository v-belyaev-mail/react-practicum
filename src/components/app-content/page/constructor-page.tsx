import {BurgerIngredients} from "../../burger-ingredients/burger-ingredients.tsx";
import {BurgerConstructor} from "../../burger-constructor/burger-constructor.tsx";
import styles from './constructor-page.module.css'
import {burgerData} from '../../../utils/data.ts'
import {IBurgerConstructorCategory} from "../../burger-constructor/burger-constructor-types.ts";

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
]

export const ConstructorPage = () => {
    return (
        <main className={styles.page}>
            <section className={styles.ingredients_section}>
                <h1 className={styles.title}>Соберите бургер</h1>
                <BurgerIngredients items={burgerData} categories={categories}/>
            </section>
            <section className={styles.constructor_section}>
                <BurgerConstructor items={burgerData}></BurgerConstructor>
            </section>
        </main>
    )
}