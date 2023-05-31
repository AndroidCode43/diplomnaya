import {useAuth} from "../stores/auth";
import {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = () => {
    const {fetchIsAdmin, authError} = useAuth();

    useEffect(() => {
        fetchIsAdmin();
    },[]);

    return authError == null ? <Outlet/> : <Navigate to={'/login'}/>;
}

export default PrivateRoutes;