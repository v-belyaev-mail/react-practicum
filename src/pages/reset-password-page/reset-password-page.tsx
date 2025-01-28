import styles from './reset-password-page.module.css'
import {ResetPasswordForm} from "../../components/reset-password-form/reset-password-form.tsx";

export const ResetPasswordPage = () => {
    return (
        <main className={styles.container}>
            <ResetPasswordForm />
        </main>
    )
}