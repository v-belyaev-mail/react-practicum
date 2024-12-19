import {FC} from "react";
import styles from './order-details.module.css'

export const OrderDetails:FC = () => {
    return (
        <section className={styles.box}>
            <p className={styles.order_number}>034536</p>
            <p className={styles.order_number_title}>идентификатор заказа</p>
            <img src="/images/success-order.svg" alt="Заказ оформлен" className={styles.success_icon}/>
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.status_description}>Дождитесь готовности на орбитальной станции</p>
        </section>
    )
}