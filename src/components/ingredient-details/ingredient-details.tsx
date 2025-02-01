import styles from './ingredient-details.module.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.ts";


export const IngredientDetails = () => {
    const {id} = useParams();

    const ingredient = useAppSelector(
        store => {
            return store.ingredients.ingredients.find((ingredient) => ingredient._id === id);
        });

    if(!ingredient)
        return null;


    return (
        <section className={styles.box}>
            <img src={ingredient.image_large} alt={ingredient.name} className={styles.image}/>
            <h2 className={styles.title}>{ingredient.name}</h2>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <p className={styles.item_title}>Калории,ккал</p>
                    <p className={styles.item_digit}>{ingredient.calories}</p>
                </li>
                <li className={styles.item}>
                    <p className={styles.item_title}>Белки, г</p>
                    <p className={styles.item_digit}>{ingredient.proteins}</p>
                </li>
                <li className={styles.item}>
                    <p className={styles.item_title}>Жиры, г</p>
                    <p className={styles.item_digit}>{ingredient.fat}</p>
                </li>
                <li className={styles.item}>
                    <p className={styles.item_title}>Углеводы, г</p>
                    <p className={styles.item_digit}>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </section>
    )
}