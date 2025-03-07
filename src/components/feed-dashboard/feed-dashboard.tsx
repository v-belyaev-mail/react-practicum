import styles from './feed-dashboard.module.css';
import {useAppSelector} from "../../hooks/redux.ts";

export const FeedDashboard = () => {
    const {orders, total, totalToday} = useAppSelector(state => state.feedOrder);

    const ordersInWork = orders.filter(order => order.status === "pending")
    const ordersCompleted = orders.filter(order => order.status === "done")

    return (
        <section className={styles.dashboard_wrapper}>
            <div className={styles.success_block}>
                <h3 className={styles.block_title}>Готово:</h3>
                <div className={styles.topblock_content}>
                    {
                        ordersCompleted.map(orderItem =>
                            <span
                                className={styles.digits_success}
                                key={orderItem._id}
                            >{orderItem.number}
                            </span>
                        )
                    }
                </div>
            </div>
            <div className={styles.inwork_block}>
                <h3 className={styles.block_title}>В работе:</h3>
                <div className={styles.topblock_content}>
                    {
                        ordersInWork.map(orderItem =>
                            <span
                                className={styles.digits}
                                key={orderItem._id}
                            >{orderItem.number}
                            </span>
                        )
                    }
                </div>
            </div>
            <div className={styles.all_block}>
                <h3 className={styles.block_title}>Выполнено за все время:</h3>
                <span className={styles.digits_large}>{total}</span>
            </div>
            <div className={styles.today_block}>
                <h3 className={styles.block_title}>Выполнено за сегодня:</h3>
                <span className={styles.digits_large}>{totalToday}</span>
            </div>
        </section>
    )
}