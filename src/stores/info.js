import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useInfo = create(devtools(setState => ({
    infoData: null,
    infoError: null,
    isLoading: false,

    fetchGetInfo: async () => {
        setState({infoError: null, isLoading: true});
        try {
            const {data} = await yttAxios.get(`/info`);
            setState({infoData: data, isLoading: false});
        }catch (e){
            setState({infoError: parseError(e)});
        }
    },
})));