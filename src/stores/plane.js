import {create} from "zustand";
import {devtools} from "zustand/middleware";
import yttAxios from "../utils/axios_settings";
import {parseError} from "../utils/utils";

export const API_URL = 'http://localhost:5000'


export const usePlanes = create(devtools(setState => ({
    planes: [],
    error: null,
    msg: null,
    isLoading: false,

    fetchPlanes: async () => {
        setState({isLoading: false});
        try {
            const {data} = await yttAxios.get('/planes/all');
            setState({planes: data, error: null});
        }catch (e){
            setState({error: e.error});
        }finally {
            setState({error: null});
        }
    },

    fetchCreatePlane: async (plane) => {
        setState({isLoading: true});
        try {
            await yttAxios.post(`/planes`, plane).then(async () => {
                const {data} = await yttAxios.get('/planes/all');
                setState({planes: data, isLoading: false});
            });
            setState({msg: 'Самолёт добавлен!'});
        }catch (e){
            setState({error: parseError(e), isLoading: false});
        }
    }
})));