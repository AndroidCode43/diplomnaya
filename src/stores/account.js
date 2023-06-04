import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useAccount = create(devtools(setState => ({
    accountData: null,
    accountError: null,
    paymentError: null,
    paymentSuccess: null,

    clearState: () => setState({paymentError: null, paymentSuccess: null}),

    fetchGetMyAccount: async () => {
        setState({accountError: null});
        try {
            const {data} = await yttAxios.get(`/users/me`);
            setState({accountData: data});
        }catch (e){
            setState({accountError: parseError(e)});
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
           setState({paymentSuccess: 'Оплата прошла успешно!'});
        }catch (e){
            setState({paymentError: parseError(e)});
        }
    }
})));