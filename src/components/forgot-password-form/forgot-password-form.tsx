import styles from './forgot-password-form.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
            >
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <EmailInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Укажите e-mail"
                />
                <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
            </form>
            <div className={styles.bottom_block}>
                <span className={styles.link_label}>Вспомнили пароль?</span>
                <Link to={{pathname: '/login'}} className={styles.link}>Войти</Link>
            </div>
        </section>
    )
}