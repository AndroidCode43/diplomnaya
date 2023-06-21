import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";
import { notification } from "antd";

export const useTickets = create(devtools(setState => ({
    selectClassTicket: null,
    tickets: null,
    selectTickets: null,
    isLoading: false,

    setClassTicket: (classTicket, price) => {
        setState({
            selectClassTicket: {
                type: classTicket,
                price: price
            }
        });
    },

    fetchCreateTicket: async (ticket, flightId) => {
        setState({errCreateTicket: null, isLoading: true});
        const validTicket = {...ticket, passengerName: ticket.passengerName.trim()};
        try {
            await yttAxios.post(`/tickets/create_ticket/${flightId}`, validTicket);
            setState({isLoading: false});
            notification.success({message: 'Билет был успешно создан!', duration: 5});
        }catch (e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при создании билета!', description: parseError(e), duration: 5});
        }
    },

    fetchBuyTicket: async (seatType, flightId) => {
        setState({isLoading: true});
        try {
            await yttAxios.post(`/tickets/buy_ticket?seatType=${seatType}&flightId=${flightId}`);
            setState({isLoading: false});
            notification.success({message: 'Билет был успешно куплен!',description: 'Он отобразиться в личном кабинете.', duration: 5});
        }catch (e){
            setState({isLoading: false});
            notification.error({message: 'Ошибка при оплате!', description: parseError(e), duration: 5});
        }
    },

    fetchGetAllTickets: async () => {
        setState({isLoading: true});
        try {
            const {data} = await yttAxios.get('/tickets/all');
            setState({tickets: data, isLoading: false});
        }catch(e){
            notification.error({message: 'Не удалось получить список билетов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetTodayTickets: async () => {
        try {
            const {data} = await yttAxios.get('/tickets/today');
            setState({selectTickets: data});
        }catch(e){
            notification.error({message: 'Не удалось получить список билетов!', description: parseError(e), duration: 5});
        }
    },

    fetchGetTicketsByParams: async(userName, flightName, flightDate) => {
        setState({isLoading: true});
        try {
            const {data} = await yttAxios.get(`/tickets/by_params?userName=${userName}&flightName=${flightName}&flightDate=${flightDate}`);
            setState({tickets: data, isLoading: false});
        } catch (error) {
            
        }
    }

})));