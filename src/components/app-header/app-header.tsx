import Menu from "./menu/menu.tsx";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import Profile from "./profile.tsx";
import styles from './app-header.module.css';

export default function AppHeader() {
    return (
        <header>
            <div className={styles.burgerHeader}>
                <Menu/>
                <span className={styles.logo}>
                    <Logo/>
                </span>
                <Profile/>
            </div>
        </header>
    )
}