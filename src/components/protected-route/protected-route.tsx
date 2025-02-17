import React from 'react';
import styles from "./protected-route.module.css"
import { Navigate, useLocation } from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.ts";
import {getIsAuthChecked, getIsAuthenticated} from "../../services/slices/user.ts";

type TProtectedProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}

const Protected:React.FC<TProtectedProps> = ({ onlyUnAuth = false, component}): React.JSX.Element => {
    const isAuthenticated = useAppSelector(getIsAuthenticated);
    const isAuthChecked = useAppSelector(getIsAuthChecked);
    const location = useLocation();

    if (!isAuthChecked) {
        return <p className={styles.loading}>Загрузка...</p>;
    }

    if (onlyUnAuth && isAuthenticated) {
        const { from } = location.state ?? { from: { pathname: "/ "} };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
    <Protected onlyUnAuth={true} component={component} />
);

