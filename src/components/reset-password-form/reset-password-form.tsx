import {FormEvent, useState} from "react";
import styles from "./reset-password-form.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {resetPassworApi} from "../../services/api.ts";
import {TResetPasswordUser, TResponse} from "../../utils/types.ts";
import {useForm} from "../../hooks/useForm.ts";

export const ResetPasswordForm = () => {
    const {handleChange, values} = useForm<TResetPasswordUser>({
        password: '',
        token: '',
    })
    const [isSent, setSent] = useState(false);
    const [error, setError] = useState<string|undefined>();

    const navigate = useNavigate();

    const onSubmit =  (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!values.password || !values.token || isSent)
            return;

        setError(undefined);
        setSent(true);
        resetPassworApi(values)
            .then(() => {
                setSent(false)
                localStorage.removeItem('forgot_password');
                navigate({pathname: '/login'})
            })
            .catch((err:TResponse) => {
                setError(err.message);
                setSent(false)
            });
    }

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                {!!error && (<h3 className={styles.error}>{error}</h3>)}
                <PasswordInput
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Введите новый пароль"
                    required
                />
                <Input
                    name="token"
                    value={values.token}
                    onChange={handleChange}
                    placeholder="Введите код из письма"
                    required
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