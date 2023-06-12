import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useTickets = create(devtools(setState => ({
    errCreateTicket: null,
    selectClassTicket: null,
    tickets: null,
    selectTickets: null,
    isLoading: false,

    clearError: () => setState({errCreateTicket:null}),

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
        try {
            await yttAxios.post(`/tickets/create_ticket/${flightId}`, ticket);
            setState({isLoading: false});
        }catch (e){
            setState({errCreateTicket: parseError(e), isLoading: false});
        }
    },

    fetchBuyTicket: async (seatType, flightId) => {
        setState({errCreateTicket: null});
        try {
            await yttAxios.post(`/tickets/buy_ticket?seatType=${seatType}&flightId=${flightId}`);
        }catch (e){
            setState({errCreateTicket: parseError(e)});
        }
    },

    fetchGetAllTickets: async () => {
        setState({errCreateTicket: null, isLoading: true});
        try {
            const {data} = await yttAxios.get('/tickets/all');
            setState({tickets: data, isLoading: false});
        }catch(e){
            setState({errCreateTicket: parseError(e)});
        }
    },

    fetchGetTodayTickets: async () => {
        setState({errCreateTicket: null});
        try {
            const {data} = await yttAxios.get('/tickets/today');
            setState({selectTickets: data});
        }catch(e){
            setState({errCreateTicket: parseError(e)});
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