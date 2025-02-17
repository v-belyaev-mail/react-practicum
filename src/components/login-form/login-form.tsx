import styles from './login-form.module.css';
import {FormEvent, useState} from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux.ts";
import {TLoginUser} from "../../utils/types.ts";
import {login} from "../../services/slices/user.ts";
import {SerializedError} from "@reduxjs/toolkit";
import {useForm} from "../../hooks/useForm.ts";

export const LoginForm = () => {
    const {values, handleChange} = useForm<TLoginUser>({
        email: '',
        password: '',
    })

    const [error, setError] = useState<string | undefined>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { from } = location.state ?? { from: { pathname: "/"} };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(undefined)
        dispatch(login(values)).unwrap()
            .then(() => {
                navigate(from);
            })
            .catch((err:SerializedError) => {
                setError(err.message)
            })
    }

    return (
        <section className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2 className="text text_type_main-medium">Вход</h2>
                {!!error && (<h3 className={styles.error}>{error}</h3>)}
                <EmailInput
                    value={values.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    name="email"
                />
                <PasswordInput
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    name="password"
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