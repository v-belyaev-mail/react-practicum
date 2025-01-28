import {useState} from "react";
import styles from "../forgot-password-form/forgot-password-form.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
            >
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <PasswordInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Введите новый пароль"
                />
                <Input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Введите код из письма"
                />
                <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </form>
            <div className={styles.bottom_block}>
                <span className={styles.link_label}>Вспомнили пароль?</span>
                <Link to={{pathname: '/login'}} className={styles.link}>Войти</Link>
            </div>
        </section>
    )
}