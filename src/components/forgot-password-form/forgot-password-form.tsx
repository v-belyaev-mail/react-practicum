import styles from './forgot-password-form.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent} from "react";
import {forgotPassworApi} from "../../services/api.ts";
import {TResponse} from "../../utils/types.ts";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isSent, setSent] = useState(false);
    const [error, setError] = useState<string|undefined>();
    const navigate = useNavigate();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || isSent)
            return;

        setError(undefined);
        setSent(true);

        forgotPassworApi(email)
            .then(() => {
                setSent(false)
                localStorage.setItem('forgot_password', 'Y');
                navigate({pathname: '/reset-password'});
            })
            .catch((res:TResponse) => {
                setSent(false);
                setError(res.message)
            })
    }

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                {!!error && <h3 className={styles.error}>{error}</h3>}
                <EmailInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Укажите e-mail"
                    required
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