import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useTickets = create(devtools(setState => ({
    errCreateTicket: null,
    selectClassTicket:null,


    setClassTicket: (classTicket, price) => {
        setState({
            selectClassTicket: {
                type: classTicket,
                price: price
            }
        });
    },

    fetchCreateTicket: async (ticket, flightId) => {
        setState({errCreateTicket: null});
        try {
            await yttAxios.post(`/tickets/create_ticket/${flightId}`, ticket);
        }catch (e){
            setState({errCreateTicket: parseError(e)});
        }
    },

    fetchBuyTicket: async (seatType, flightId) => {
        setState({errCreateTicket: null});
        try {
            await yttAxios.post(`/tickets/buy_ticket?seatType=${seatType}&flightId=${flightId}`);
        }catch (e){
            setState({errCreateTicket: parseError(e)});
        }
    }

})));