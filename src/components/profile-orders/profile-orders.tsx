import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    getOrders,
    getStatus,
    wsProfileFeedOrderConnect,
    wsProfileFeedOrderDisconnect
} from "../../services/slices/profile-feed-order.ts";
import {useEffect} from "react";
import {wsProfileFeedOrder} from "../../constants/api.ts";
import {WebsocketStatus} from "../../utils/types.ts";
import {OrderItem} from "../order-item/order-item.tsx";
import styles from "./profile-orders.module.css";

export const ProfileOrders = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(getStatus);
    const orders = useAppSelector(getOrders);

    useEffect(() => {
        dispatch(wsProfileFeedOrderConnect(wsProfileFeedOrder));
        return () => {
            dispatch(wsProfileFeedOrderDisconnect());
        }
    }, []);
    const isConnected = status === WebsocketStatus.ONLINE;

    return (
        <section className={styles.wrapper}>
            {
                isConnected && (
                    [...orders]
                        .sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
                        .map((order) => <OrderItem key={order._id} order={order} />)
                )
            }
        </section>
    )
}