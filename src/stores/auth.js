import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import Cookies from 'js-cookie';
import yttAxios from "../utils/axios_settings";
import { notification } from "antd";

export const useAuth = create(devtools(setState => ({
    admin: null,
    user: null,
    isLoggedIn: false,

    fetchAuthLogin: async (user) =>{
        try {
            const { data } = await yttAxios.post(`/auth/login`, user);
            Cookies.set('token', data.token, {
                expires: 7,
                path: '/'
            });
            Cookies.set('role', data.role, {
                expires: 7,
                path: '/'
            });
            setState({isLoggedIn: true});
        }catch (e){
            setState({authData: null});
            notification.error({ message: 'Ошибка!', description: parseError(e), duration: 5 });
        }
    },

    fetchRegister: async (user) =>{
        const u = {
            ...user, 
            name: user.name.trim(),
            passportNumber: user.passportNumber.trim(),
            dob: user.dob.trim()
        };
        try {
            const { data } = await yttAxios.post(`/auth/registration`, u);
            Cookies.set('token', data.token, {
                expires: 7,
                path: '/'
            });
            Cookies.set('role', data.role, {
                expires: 7,
                path: '/'
            });
            setState({isLoggedIn: true});
        }catch (e){
            setState({authData: null});
            notification.error({ message: 'Ошибка!', description: parseError(e), duration: 5 });
        }
    },

    fetchIsAdmin: async () => {
        setState({authError: null});
        try {
            const {data} = await yttAxios.get(`/users/admin`).then();
            setState({admin: data, authError: null});
        }catch (e){
            setState({authError: parseError(e), admin: null});
        }
    },

    fetchAuthUser: async() => {
        setState({authError: null});
        try{
            const { data } = await yttAxios.get(`/users/me`);
            setState({user: data, authError: null});
        }catch(e){
            setState({authError: parseError(e), user: null});
        }
    }
})));