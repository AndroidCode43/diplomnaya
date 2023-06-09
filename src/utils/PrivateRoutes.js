import Cookies from "js-cookie";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = () => {
    const role = Cookies.get('role');
    const token = Cookies.get('token');
    return role === 'ADMIN' && token != undefined ? <Outlet/> : <Navigate to={'/login'}/>;
}

export default PrivateRoutes;