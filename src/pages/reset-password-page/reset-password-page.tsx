import styles from './reset-password-page.module.css'
import {ResetPasswordForm} from "../../components/reset-password-form/reset-password-form.tsx";
import {Navigate} from "react-router-dom";

export const ResetPasswordPage = () => {

    const fromForgotPage = localStorage.getItem('forgot_password') === 'Y';

    if(!fromForgotPage) {
        return (<Navigate to={'/'}/>)
    }

    return (
        <main className={styles.container}>
            <ResetPasswordForm />
        </main>
    )
}