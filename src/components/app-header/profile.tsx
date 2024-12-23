import styles from './app-header.module.css';
import MenuItem from "./menu/menu-item.tsx";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => (
    <div className={styles.profile}>
        <MenuItem title="Личный кабинет" href="#" icon={ProfileIcon}/>
    </div>
);

export default Profile;