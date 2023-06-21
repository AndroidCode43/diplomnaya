import {create} from "zustand";
import {devtools} from "zustand/middleware";
import yttAxios from "../utils/axios_settings";
import {parseError} from "../utils/utils";
import { notification } from "antd";

export const API_URL = 'http://localhost:5000'


export const usePlanes = create(devtools(setState => ({
    planes: [],
    isLoading: false,

    fetchPlanes: async () => {
        setState({isLoading: false});
        try {
            const {data} = await yttAxios.get('/planes/all');
            setState({planes: data});
        }catch (e){
            notification.error({message: 'Не удалось получить список самолётов!', description: parseError(e), duration: 5});
        }
    },

    fetchCreatePlane: async (plane) => {
        setState({isLoading: true});
        try {
            await yttAxios.post(`/planes`, plane).then(async () => {
                const {data} = await yttAxios.get('/planes/all');
                setState({planes: data, isLoading: false});
            });
            notification.success({message: 'Самолёт успешно добавлен!', duration: 5});
        }catch (e){
            setState({error: parseError(e), isLoading: false});
        }
    }
})));