import styles from './app-header.module.css';
import MenuItem from "./menu/menu-item.tsx";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, NavLinkRenderProps} from "react-router-dom";

const Profile = () => (
    <div className={styles.profile}>
        <NavLink to={{pathname: '/profile'}}>
            {
                ({isActive}:NavLinkRenderProps) => (
                    <MenuItem title="Личный кабинет" icon={ProfileIcon} selected={isActive}/>
                )
            }
        </NavLink>
    </div>
);

export default Profile;