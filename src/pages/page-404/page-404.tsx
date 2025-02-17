import {Link} from "react-router-dom";
import styles from "./page-404.module.css";

export const Page404 = () => {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Страница не найдена!</h1>
            <Link to={{pathname: '/'}} className={styles.link}>На главную</Link>
        </main>
    )
}