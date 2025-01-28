import styles from './login-form.module.css';
import {useState} from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section className={styles.wrapper}>
            <form className={styles.form}>
                <h2 className="text text_type_main-medium">Вход</h2>
                <EmailInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    Войти
                </Button>
            </form>
            <div className={styles.bottom_block}>
                <p className={styles.links}>
                    <span className={styles.link_label}>Вы — новый пользователь?</span>
                    <Link to={{pathname: '/register'}} className={styles.link}>Зарегистрироваться</Link>
                </p>
                <p className={styles.links}>
                    <span className={styles.link_label}>Забыли пароль?</span>
                    <Link to={{pathname: '/forgot-password'}} className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </section>
    )
}