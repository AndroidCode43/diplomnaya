import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";
import { notification } from "antd";

export const useFlights = create(devtools(setState => ({
    flights:[],
    isLoading: false,
    isUploading: false,
    currentFlight: null,

    fetchCreateFlight: async (flight, id) => {
        setState({isUploading: true});
        const updateData = {
            ...flight,
            arrivalTime: +flight.arrivalTime,
            priceEconomy: +flight.priceEconomy,
            priceBusiness: +flight.priceBusiness,
            pricePremium: +flight.pricePremium
        };
        try {
            await yttAxios.post(`/flights/${id}`, updateData).then(() => {
                notification.success({message: 'Рейс успешно создан!', duration: 5});
            });
            setState({isUploading: false});
        }catch (e){
            setState({isUploading: false});
            notification.error({message: 'Ошибка при создании рейса!', description: parseError(e), duration: 10});
        }
    },

    fetchGetFlights: async () => {
        setState({isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/valid`);
            setState({flights: data, isLoading: false});
        }catch (e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при получении рейсов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetFlightByCity: async(fromCity,intoCity) => {
        try {
            const {data} = await yttAxios.get(`/flights/find?fromCity=${fromCity}&intoCity=${intoCity}`);
            setState({flights: data});
        }catch (e){
            notification.error({message: 'Ошибка при получении рейсов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetFlightsWithTickets: async () => {
        setState({isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/all_with_tickets`);
            setState({flights: data, isLoading: false});
        }catch (e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при получении рейсов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetFlightById: async (flightId) => {
        try {
            const {data} = await yttAxios.get(`/flights/flight_by_id/${flightId}`);
            setState({currentFlight: data});
        }catch (e){
            notification.error({message: 'Ошибка при получении рейса!', description: parseError(e), duration: 5});
        }
    },

    fetchGetFlightByDate: async (flightDate) => {
        setState({isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/find_by_date?flightDate=${flightDate}`);
            setState({flights: data, isLoading: false});
        }catch(e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при получении рейсов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetValidWithTickets: async () => {
        setState({isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/valid_with_tickets`);
            setState({flights: data, isLoading: false});
        }catch (e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при получении рейсов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetFlightByParams: async(date, fromCity, intoCity) => {
        setState({isLoading: true});
        try{
            const {data} = await yttAxios.get(`/flights/valid_by_params?date=${date}&fromCity=${fromCity}&intoCity=${intoCity}`);
            setState({flights: data, isLoading: false});
        }catch(e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при получении рейсов!', description: parseError(e), duration: 5});
        }
    }
})));