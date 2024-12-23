import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuItem from "./menu-item.tsx";
import {MenuItemType} from "./menu-types.ts";
import styles from './menu.module.css';

const menuItems:MenuItemType[] = [
    {
        title: "Конструктор",
        href: "#",
        icon: BurgerIcon,
        selected: true
    },
    {
        title: "Лента заказов",
        href: "#",
        icon: ListIcon
    }
];

const Menu = () =>
{
    return (
        <nav className={styles.nav}>
            <ul>
                {
                    menuItems.map((item:MenuItemType, index: number) => (
                        <li key={index}>
                            <MenuItem {...item}></MenuItem>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Menu;