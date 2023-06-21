import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";
import { notification } from "antd";

export const useAccount = create(devtools(setState => ({
    accountData: null,

    fetchGetMyAccount: async () => {
        try {
            const {data} = await yttAxios.get(`/users/me`);
            setState({accountData: data});
        }catch (e){
            notification.error({message: 'Произошла ошибка!', description: parseError(e), duration: 5});
        }
    },

    fetchAddBalance: async (dto) => {
        setState({paymentError: null});
        try {
           await yttAxios.post('/users/add_balance', {...dto, amount: Number(dto.amount)})
               .then(async () => {
                   const {data} = await yttAxios.get(`/users/me`);
                   setState({accountData: data});
               });
               notification.success({message: 'Оплата прошла успешно!', duration: 2});
        }catch (e){
            notification.error({message: 'Ошибка при оплате!', description: parseError(e), duration: 5});
        }
    }
})));