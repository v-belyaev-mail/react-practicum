import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuItem from "./menu-item.tsx";
import {MenuItemType} from "./menu-types.ts";
import styles from './menu.module.css';
import {NavLink} from "react-router-dom";

const menuItems:MenuItemType[] = [
    {
        title: "Конструктор",
        href: "/",
        icon: BurgerIcon,
        selected: true
    },
    {
        title: "Лента заказов",
        href: "/feed",
        icon: ListIcon
    }
];

const Menu = () =>
{
    return (
        <nav className={styles.nav}>
            <ul>
                {
                    menuItems.map((item:MenuItemType) => (
                        <li key={item.href}>
                            <NavLink to={{pathname: item.href}}>
                                {
                                    ({isActive}) => (
                                        <MenuItem {...item} selected={isActive}></MenuItem>
                                    )
                                }
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Menu;