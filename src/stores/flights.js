import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useFlights = create(devtools(setState => ({
    flights:[],
    errGetFlights: null,
    errUploading: null,
    currentFlight: null,

    fetchCreateFlight: async (flight, id) => {
        setState({errUploading: null});

        const updateData = {
            ...flight,
            arrivalTime: +flight.arrivalTime,
            priceEconomy: +flight.priceEconomy,
            priceBusiness: +flight.priceBusiness,
            pricePremium: +flight.pricePremium
        };

        try {
            await yttAxios.post(`/flights/${id}`, updateData);
        }catch (e){
            setState({errUploading: parseError(e)});
        }
    },

    fetchGetFlights: async () => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/all`);
            setState({flights: data});
        }catch (e){
            setState({errGetFlights: parseError(e)});
        }
    },

    fetchGetFlightByCity: async(fromCity,intoCity) => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/find?fromCity=${fromCity}&intoCity=${intoCity}`);
            setState({flights: data});
        }catch (e){
            setState({errGetFlights: parseError(e)});
        }
    },

    fetchGetFlightsWithTickets: async () => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/all_with_tickets`);
            setState({flights: data});
        }catch (e){
            setState({errGetFlights: parseError(e)});
        }
    },

    fetchGetFlightById: async (flightId) => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/${flightId}`);
            setState({currentFlight: data});
        }catch (e){
            setState({errGetFlights: parseError(e)});
        }
    }
})));