import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useInfo = create(devtools(setState => ({
    infoData: null,
    infoError: null,


    fetchGetInfo: async () => {
        setState({infoError: null});
        try {
            const {data} = await yttAxios.get(`/info`);
            setState({infoData: data});
        }catch (e){
            setState({infoError: parseError(e)});
        }
    },
})));