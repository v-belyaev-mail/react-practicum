import styles from './register-page.module.css';
import {RegisterForm} from "../../components/register-form/register-form.tsx";

export const RegisterPage = () => {
    return (
        <main className={styles.container}>
            <RegisterForm />
        </main>
    )
}