import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import Cookies from 'js-cookie';
import yttAxios from "../utils/axios_settings";

export const useAuth = create(devtools(setState => ({
    authError: null,
    admin: null,
    isLoggedIn: false,

    fetchAuthLogin: async (user) =>{
        setState({authError: null});
        try {
            const { data } = await yttAxios.post(`/auth/login`, user);
            Cookies.set('token', data.token, {
                expires: 7,
                path: ''
            });
            setState({isLoggedIn: true});
        }catch (e){
            setState({authData: null, authError: parseError(e)});
        }
    },

    fetchIsAdmin: async () => {
        setState({authError: null});
        try {
            const {data} = await yttAxios.get(`/users/admin`);
            setState({admin: data});
        }catch (e){
            console.log(parseError(e));
            setState({authError: parseError(e), admin: null});
        }
    }
})));