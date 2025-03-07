import {FeedDashboard} from "../feed-dashboard/feed-dashboard.tsx";
import styles from './feed.module.css'
import {OrderItem} from "../order-item/order-item.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    getError,
    getOrders,
    getStatus,
    wsFeedOrderConnect,
    wsFeedOrderDisconnect
} from "../../services/slices/feed-order.ts";
import {useEffect} from "react";
import {wsFeedOrder} from "../../constants/api.ts";
import {WebsocketStatus} from "../../utils/types.ts";

export const Feed = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(getStatus);
    const error = useAppSelector(getError);
    const orders = useAppSelector(getOrders);

    useEffect(() => {
        dispatch(wsFeedOrderConnect(wsFeedOrder));
        return () => {
            dispatch(wsFeedOrderDisconnect());
        }
    }, []);
    const isLoading = status === WebsocketStatus.CONNECTING;
    const isError = status === WebsocketStatus.OFFLINE && !!error;

    return (
        <main className={styles.page}>
            {
                isError ?
                    (<h1 className={styles.title}>{error}</h1>) :
                    isLoading ? (
                        <h1 className={styles.title}>Загрузка...</h1>) :
                        (
                            <>
                                <h1 className={styles.title}>Лента заказов</h1>
                                <section className={styles.orders_wrapper}>
                                {
                                    orders.map((orderItem) =>
                                        <OrderItem order={orderItem} key={orderItem._id}/>)
                                }
                                </section>
                                <FeedDashboard/>
                            </>
                        )
            }
        </main>
    )
}