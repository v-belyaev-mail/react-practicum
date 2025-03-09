import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getOrders} from "../../services/slices/orders.ts";
import {getOrders as getOrderFeed} from "../../services/slices/feed-order.ts";
import {getOrders as getProfileOrderFeed} from "../../services/slices/profile-feed-order.ts";
import {OrderDetail} from "../../components/order-detail/order-detail.tsx";
import {fetchOrderByNumber} from "../../services/slices/orders.ts";

export const OrderDetailPage = () => {
    const {number} = useParams();
    const dispatch = useAppDispatch()
    const feedOrders = useAppSelector(getOrderFeed)
    const profileOrders = useAppSelector(getProfileOrderFeed)
    const orders = useAppSelector(getOrders)

    if(!number) return null;

    let order = feedOrders.find(orderItem => orderItem.number.toString() === number);

    if(!order)
        order = profileOrders.find(orderItem => orderItem.number.toString() === number);

    if(!order)
        order = orders.find(orderItem => orderItem.number.toString() === number);

    if(!order)
        dispatch(fetchOrderByNumber(number))

    if(!order)
        return null;

    return (
        <OrderDetail order={order} />
    )
}