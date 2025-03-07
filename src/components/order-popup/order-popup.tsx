import {FC} from "react";
import styles from './order-popup.module.css'
import {useAppSelector} from "../../hooks/redux.ts";

export const OrderPopup:FC = () => {
    const {lastOrder} = useAppSelector(store => store.orders)

    if(!lastOrder) return;

    return (
        <section className={styles.box}>
            <p className={styles.order_number}>{lastOrder.number}</p>
            <p className={styles.order_number_title}>идентификатор заказа</p>
            <img src="/images/success-order.svg" alt="Заказ оформлен" className={styles.success_icon}/>
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.status_description}>Дождитесь готовности на орбитальной станции</p>
        </section>
    )
}