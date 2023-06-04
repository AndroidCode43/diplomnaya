import {create} from "zustand";
import {devtools} from "zustand/middleware";
import yttAxios from "../utils/axios_settings";

export const API_URL = 'http://localhost:5000'

//ХРАНИЛИЩЕ СОСТОЯНИЯ ДЛЯ САМОЛЁТОВ
export const usePlanes = create(devtools(setState => ({
    planes: [],
    error: null,
    msg: null,

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
        try {
            await yttAxios.post(`/planes`, plane).then(async () => {
                const {data} = await yttAxios.get('/planes/all');
                setState({planes: data});
            });
            setState({msg: 'Самолёт добавлен!'});
        }catch (e){
            setState({error: JSON.parse(e.request.response).message.join(' ')});
        }
    },

    fetchDeletePlanet: async (id) => {
        try {
            await yttAxios.delete(`/planes/delete/${id}`)
                .then(async() => {
                    const {data} = await yttAxios.get(`/planes/all`);
                    setState({planes: data, msg: 'Самолёт успешно удалён!'});
                });
        }catch (e){
            setState({error: e.error});
        }finally {
            setState({error: null, msg: null});
        }
    }
})));