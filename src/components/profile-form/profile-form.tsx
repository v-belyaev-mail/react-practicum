import styles from "../profile-form/profile-form.module.css";
import {FormEvent, useEffect, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {editUser, getUser} from "../../services/slices/user.ts";
import {TUserEditForm} from "../../utils/types.ts";

export const ProfileForm = () => {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPassword('');
    }, [user])

    const hasChanges = email !== user.email || name !== user.name || !!password;

    const onCancel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmail(user.email);
        setName(user.name);
        setPassword('');
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const editData:TUserEditForm = {
            email,
            name,
        }

        if(!!password)
            editData.password = password;

        dispatch(editUser(editData)).unwrap()
    }

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
                onReset={onCancel}
                onSubmit={onSubmit}
            >
                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Имя"
                    name="name"
                    icon={'EditIcon'}
                />
                <EmailInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    isIcon={true}
                    placeholder="Email"
                    name="email"
                />
                <PasswordInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    icon={'EditIcon'}
                    placeholder="Пароль"
                />
                {
                    hasChanges && (
                        <div className={styles.buttonContainer}>
                            <Button htmlType="reset" type="secondary">
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary">
                                Сохранить
                            </Button>
                        </div>
                    )
                }
            </form>
        </section>
)
}