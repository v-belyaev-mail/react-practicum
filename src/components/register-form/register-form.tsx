import styles from './register-form.module.css';
import {Link, useNavigate} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, FormEvent} from "react";

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate({pathname: '/'});
    }

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
                onSubmit={e => onSubmit(e)}
            >
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                />
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
                <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <div className={styles.bottom_block}>
                <span className={styles.link_label}>Уже зарегистрированы?</span>
                <Link to={{pathname: '/login'}} className={styles.link}>Войти</Link>
            </div>
        </section>
    )
}