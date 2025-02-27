import styles from "../profile-form/profile-form.module.css";
import {FormEvent, useEffect} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {editUser, getUser} from "../../services/slices/user.ts";
import {TUserEditForm} from "../../utils/types.ts";
import {useForm} from "../../hooks/useForm.ts";

export const ProfileForm = () => {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();

    const initialFormValues:TUserEditForm = {
        email: user.email,
        name: user.name,
    }

    const {values, handleChange, setValues} = useForm<TUserEditForm>(initialFormValues)

    useEffect(() => {
        setValues(initialFormValues)
    }, [user])

    const hasChanges = values.email !== user.email || values.name !== user.name || !!values.password;

    const onCancel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValues(initialFormValues)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(editUser(values)).unwrap()
    }

    return (
        <section className={styles.wrapper}>
            <form
                className={styles.form}
                onReset={onCancel}
                onSubmit={onSubmit}
            >
                <Input
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Имя"
                    name="name"
                    icon={'EditIcon'}
                />
                <EmailInput
                    value={values.email}
                    onChange={handleChange}
                    isIcon={true}
                    placeholder="Email"
                    name="email"
                />
                <PasswordInput
                    value={values.password ?? ''}
                    onChange={handleChange}
                    icon={'EditIcon'}
                    placeholder="Пароль"
                    name="password"
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