import styles from './forgot-password-page.module.css'
import {ForgotPasswordForm} from "../../components/forgot-password-form/forgot-password-form.tsx";

export const ForgotPasswordPage = () => {
    return (
        <main className={styles.container}>
            <ForgotPasswordForm />
        </main>
    );
}