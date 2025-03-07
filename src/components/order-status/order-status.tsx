import {FC} from "react";

type TOrderStatusProps = {
    status: string;
    className?: string;
}

type TOrderStatusObject = {
    [key: string]: {
        name: string;
        color: string;
    }
}

const EOrderStatus =  Object.freeze<TOrderStatusObject>({
    "done": {name: "Выполнен", color: "#00CCCC"},
    "created": {name: "Принят", color: "#939393"},
    "pending": {name: "Готовится", color: "#ccbb00"},
    "undefined": {name: "Не определен", color: "#cc0000"},
})

export const OrderStatus:FC<TOrderStatusProps> = ({status, className}) => {
    const statusObject = EOrderStatus[status] ?? EOrderStatus['undefined']
    return (
        <span className={className} style={{color: statusObject.color}}>{statusObject.name}</span>
    )
}