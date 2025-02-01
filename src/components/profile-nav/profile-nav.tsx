import styles from './profile-nav.module.css';
import {NavLink, NavLinkRenderProps, useLocation, useNavigate} from "react-router-dom";
import {MouseEvent, useMemo} from "react";
import {useAppDispatch} from "../../hooks/redux.ts";
import {logout} from "../../services/slices/user.ts";

export const ProfileNav = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

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

    const onLogout = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        dispatch(logout()).unwrap().then(() => {
            navigate({pathname: '/login'});
        })
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
                    <a href="#" className={styles.link} onClick={onLogout}>
                        Выход
                    </a>
                </li>
            </ul>
            {
                description
            }
        </nav>
    )
}