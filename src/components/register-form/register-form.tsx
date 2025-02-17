import styles from './register-form.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, FormEvent} from "react";
import {register} from "../../services/slices/user.ts";
import {TRegisterUser} from "../../utils/types.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {SerializedError} from "@reduxjs/toolkit";
import {useForm} from "../../hooks/useForm.ts";

export const RegisterForm = () => {
    const {values, handleChange} = useForm<TRegisterUser>({
        email: '',
        password: '',
        name: '',
    })
    const [error, setError] = useState<string | undefined>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { from } = location.state ?? { from: { pathname: "/"} };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData:TRegisterUser = values;

        setError(undefined);
        dispatch(register(userData)).unwrap()
            .then(() => {
                navigate(from);
            })
            .catch((err:SerializedError) => {
                setError(err.message);
            })
    }

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h2 className="text text_type_main-medium">Регистрация</h2>
                {!!error && (<h3 className={styles.error}>{error}</h3>)}
                <Input
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Имя"
                    name="name"
                />
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
                <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <div className={styles.bottom_block}>
                <span className={styles.link_label}>Уже зарегистрированы?</span>
                <Link to={{pathname: '/login'}} className={styles.link}>Войти</Link>
            </div>
        </section>
    )
}