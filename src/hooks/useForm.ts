import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

type TUseForm<T> = {
    values: T;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: Dispatch<SetStateAction<T>>;
}

export function useForm<T>(defaultValues:T): TUseForm<T> {
    const [values, setValues] = useState<T>(defaultValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}