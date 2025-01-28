import styles from './login-page.module.css';
import {LoginForm} from "../../components/login-form/login-form.tsx";

export const LoginPage = () => {
    return (
        <main className={styles.container}>
            <LoginForm />
        </main>
    )
}