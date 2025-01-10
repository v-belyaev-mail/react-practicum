import {BurgerIngredients} from "../../burger-ingredients/burger-ingredients.tsx";
import {BurgerConstructor} from "../../burger-constructor/burger-constructor.tsx";
import styles from './constructor-page.module.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const ConstructorPage = () => {
    return (
        <main className={styles.page}>
            <DndProvider backend={HTML5Backend}>
                <section className={styles.ingredients_section}>
                    <h1 className={styles.title}>Соберите бургер</h1>
                    <BurgerIngredients/>
                </section>
                <section className={styles.constructor_section}>
                    <BurgerConstructor/>
                </section>
            </DndProvider>
        </main>
    )
}