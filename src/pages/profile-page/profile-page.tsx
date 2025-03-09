import {ProfileNav} from "../../components/profile-nav/profile-nav.tsx";
import styles from './profile-page.module.css'
import {Outlet, useLocation} from "react-router-dom";

export const ProfilePage = () => {
    const location = useLocation();

    const isDetailOrder = new RegExp(/^\/profile\/orders\/(\d+)\/?$/).test(location.pathname);

    return (
        <>
            {
                isDetailOrder ? (
                    <Outlet/>
                ) : (
                    <main className={styles.container}>
                        <ProfileNav/>
                        <Outlet/>
                    </main>
                )
            }
        </>
    )
}