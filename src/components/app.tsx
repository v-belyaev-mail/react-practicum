import AppHeader from "./app-header/app-header.tsx";
import {useEffect} from "react";
import {loadIngredients} from "../services/slices/ingredients.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import {OnlyAuth, OnlyUnAuth} from "./protected-route/protected-route.tsx";
import {fetchUser} from "../services/slices/user.ts";
import {IngredientDetails} from "./ingredient-details/ingredient-details.tsx";
import {Modal} from "./modal/modal.tsx";

export default function App()
{
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(store => store.ingredients);

    const background = location.state && location.state.background;

    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

    useEffect(() => {
        dispatch(loadIngredients());
        dispatch(fetchUser());
    }, [dispatch])

    return (
        <div className="burger-app">
            <AppHeader/>
            {
                !loading && (
                    <>
                        <Routes location={background || location}>
                            <Route path="/" element={<ConstructorPage />}/>
                            <Route path="/ingredients/:id" element={<IngredientDetails />}/>
                            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />}/>}>
                                <Route index element={<OnlyAuth component={<ProfileForm />}/>}/>
                                <Route path="orders" element={<OnlyAuth component={<ProfileOrders />}/>}/>
                            </Route>
                            <Route path="/login" element={<OnlyUnAuth component={<LoginPage />}/>}/>
                            <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />}/>}/>
                            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />}/>}/>
                            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />}/>}/>
                            <Route path="*" element={<Page404 />}/>
                        </Routes>
                        {background && (
                            <Routes>
                                <Route
                                    path="/ingredients/:id"
                                    element={
                                        <Modal title="Детали ингредиента" onClose={handleModalClose}>
                                            <IngredientDetails/>
                                        </Modal>
                                    }
                                />
                            </Routes>
                        )}
                    </>
                )
            }
        </div>
    )
}