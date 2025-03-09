import styles from "./order-detail.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useOrder} from "../../hooks/useOrders.ts";
import {TOrderSimple} from "../../utils/types.ts";
import {FC} from "react";
import {OrderStatus} from "../order-status/order-status.tsx";
import {useLocation} from "react-router-dom";

type TOrderDetailProps = {
    order: TOrderSimple
}

export const OrderDetail:FC<TOrderDetailProps> = ({order}) => {
    const orderData = useOrder(order);

    const location = useLocation();
    const background = location.state && location.state.background;


    return (
        <section className={styles.box}>
            <div className={styles.wrapper}>
                {
                    !background && (
                        <h3 className={styles.order_number}>#{order.number}</h3>
                    )
                }
                <div className={styles.header}>
                    <h3 className={styles.order_title}>{orderData.name}</h3>
                    <OrderStatus status={orderData.status} className={styles.order_status}/>
                </div>
                <div className={styles.body}>
                    <h3 className="text text_type_main-default">Состав:</h3>
                    <ul className={styles.ingredient_wrapper}>
                        {
                            orderData.ingredients.map(ingredient => {
                                return (
                                    <li className={styles.ingredient} key={ingredient._id}>
                                        <div className={styles.ingredient_avatar}>
                                            <img
                                                src={ingredient.image_mobile}
                                                alt={ingredient.name}
                                                className={styles.ingredient_avatar_img}
                                            />
                                        </div>
                                        <span className="text text_type_main-default">
                                            {ingredient.name}
                                        </span>
                                        <span className={styles.price}>
                                            {`${ingredient.count} x ${ingredient.price}`}
                                            <CurrencyIcon type="primary"/>
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.footer}>
                    <FormattedDate
                        date={new Date(orderData.createdAt)}
                        className="text text_type_main-default text_color_inactive"
                    />
                    <span className={styles.price}>
                        {orderData.total}
                        <CurrencyIcon type="primary"/>
                    </span>
                </div>
            </div>
        </section>
    )
}