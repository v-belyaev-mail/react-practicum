import {ProfileNav} from "../../components/profile-nav/profile-nav.tsx";
import styles from './profile-page.module.css'
import {Outlet} from "react-router-dom";

export const ProfilePage = () => {
    return (
        <main className={styles.container}>
            <ProfileNav/>
            <Outlet/>
        </main>
    )
}