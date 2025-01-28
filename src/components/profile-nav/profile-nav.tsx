import styles from './profile-nav.module.css';
import {NavLink, NavLinkRenderProps, useLocation} from "react-router-dom";
import {useMemo} from "react";

export const ProfileNav = () => {

    const location = useLocation();

    const description = useMemo(() => {
        if(location.pathname === "/profile") {
            return (
                <span className={styles.desc}>В этом разделе вы можете изменить свои персональные данные</span>
            )
        } else if(location.pathname === "/profile/orders") {
            return (
                <span className={styles.desc}>В этом разделе вы можете просмотреть свою историю заказов</span>
            )
        }

        return null;
    }, [location])

    const linkClassName = ({isActive}: NavLinkRenderProps):string => {
        let className = styles.link

        if(isActive) className += ` ${styles.link_active}`;

        return className;
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.profile_nav}>
                <li className={styles.profile_nav_li}>
                    <NavLink to={{pathname:'/profile'}} className={linkClassName} end>
                        Профиль
                    </NavLink>
                </li>
                <li className={styles.profile_nav_li}>
                    <NavLink to={{pathname:'/profile/orders'}} className={linkClassName}>
                        История заказов
                    </NavLink>
                </li>
                <li className={styles.profile_nav_li}>
                    <NavLink to={{pathname:'/log-out'}} className={linkClassName}>
                        Выход
                    </NavLink>
                </li>
            </ul>
            {
                description
            }
        </nav>
    )
}