import {create} from "zustand";
import {devtools} from "zustand/middleware";
import Cookies from "js-cookie";
import axios from "axios";
import {API_URL} from "./plane";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useAccount = create(devtools(setState => ({
    accountData: null,
    accountError: null,

    fetchGetMyAccount: async () => {
        setState({accountError: null});
        try {
            const {data} = await yttAxios.get(`/users/me`);
            setState({accountData: data});
        }catch (e){
            setState({accountError: parseError(e)});
        }
    }
})));