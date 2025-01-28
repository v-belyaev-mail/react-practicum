import AppHeader from "./app-header/app-header.tsx";
import {useEffect} from "react";
import {loadIngredients} from "../services/slices/ingredients.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {Route, Routes} from "react-router-dom";
import {
    ConstructorPage,
    Page404,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage
} from "../pages";
import {ProfileForm} from "./profile-form/profile-form.tsx";
import {ProfileOrders} from "./profile-orders/profile-orders.tsx";

export default function App()
{
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(store => store.ingredients);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch])

    return (
        <div className="burger-app">
            <AppHeader/>
            {
                !loading && (
                    <Routes>
                        <Route path="/" element={<ConstructorPage />}/>
                        <Route path="/ingredients/:id" element={<ConstructorPage />}/>
                        <Route path="/profile" element={<ProfilePage />}>
                            <Route index element={<ProfileForm/>}/>
                            <Route path="orders" element={<ProfileOrders/>}/>
                        </Route>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>
                        <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                        <Route path="/reset-password" element={<ResetPasswordPage />}/>
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                )
            }
        </div>
    )
}