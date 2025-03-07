import {TOrderSimple} from "../../utils/types.ts";
import styles from './order-item.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";
import {useOrder} from "../../hooks/useOrders.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {OrderStatus} from "../order-status/order-status.tsx";

type TOrderItemProps = {
    order: TOrderSimple;
}

const MaxIngredientsCount = 5;

export const OrderItem:FC<TOrderItemProps> = ({order}) => {
    const orderData = useOrder(order);
    const navigate = useNavigate();
    const location = useLocation();

    const isProfilePage = location.pathname === '/profile/orders';

    const onOrderClick = (number: number) => {
        navigate(
            `${isProfilePage ? '/profile/orders/' : '/feed/'}${number}`,
            {state: {background: location}}
        )
    };

    return (
        <div className={styles.wrapper} onClick={() => onOrderClick(order.number)}>
            <div className={styles.item_header}>
                <span className={styles.order_number}>{order.number}</span>
                <FormattedDate date={new Date(orderData.createdAt)} className="text text_type_main-default text_color_inactive"/>
            </div>
            <div className={styles.title_wrap}>
                <h3 className={styles.title}>{orderData.name}</h3>
                {
                    isProfilePage && (<OrderStatus status={orderData.status} className="text text_type_main-default"/>)
                }
            </div>
            <div className={styles.item_footer}>
                <ul className={styles.ingredients_list}>
                    {
                        orderData.ingredients.map((ingredient, index) => {
                            const count = index + 1;
                            const maxCount = MaxIngredientsCount + 1;
                            return maxCount >= count ? (
                                <li
                                    className={styles.ingredient_item}
                                    style={{
                                        zIndex: order.ingredients.length - index + 1
                                    }}
                                    key={ingredient._id}
                                >
                                    <div className={styles.ingredient_image_wrap}>
                                        <img
                                            className={styles.ingredient_image}
                                            style={{
                                                opacity: maxCount === count ? '0.6' : '1'
                                            }}
                                            src={ingredient.image_mobile}
                                            alt={ingredient.name}/>
                                        {
                                            maxCount === count ? (
                                                <span className={styles.expand_digit}>
                                                    +{(order.ingredients.length) - count}
                                                </span>
                                            ) : null
                                        }
                                    </div>
                                </li>
                            ) : null
                        })
                    }
                </ul>
                <span className={styles.price}>
                    {orderData.total}
                    <CurrencyIcon type="primary"/>
                </span>
            </div>
        </div>
    )
}