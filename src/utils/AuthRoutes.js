import Cookies from "js-cookie";
import {Navigate, Outlet} from "react-router-dom";

export const AuthRoutes = () => {
    const token = Cookies.get('token');
    return token != undefined ? <Outlet/> : <Navigate to={'/login'}/>;
}