import Cookies from "js-cookie";
import {Navigate, Outlet} from "react-router-dom";

export const AuthRoutes = () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    return !token || !role ? <Navigate to={'/login'}/> : <Outlet/>;
}