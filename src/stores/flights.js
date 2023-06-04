import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useFlights = create(devtools(setState => ({
    flights:[],
    errGetFlights: null,
    errUploading: null,

    uploadingStatus: null,

    currentFlight: null,

    clearError: () => setState({errUploading: null, errGetFlights: null}),

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
            await yttAxios.post(`/flights/${id}`, updateData).then(() => {
                setState({uploadingStatus: true, errUploading: null});
            });
        }catch (e){
            setState({errUploading: parseError(e), isUploading: false});
        }
    },

    fetchGetFlights: async () => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/valid`);
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
            const {data} = await yttAxios.get(`/flights/flight_by_id/${flightId}`);
            setState({currentFlight: data});
        }catch (e){
            setState({errGetFlights: parseError(e)});
        }
    },

    fetchGetFlightByDate: async (flightDate) => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/find_by_date?flightDate=${flightDate}`);
            setState({flights: data});
        }catch(e){
            setState({errGetFlights: parseError(e)});
        }
    },
    fetchGetValidWithTickets: async () => {
        setState({errGetFlights: null});
        try {
            const {data} = await yttAxios.get(`/flights/valid_with_tickets`);
            setState({flights: data});
        }catch (e){
            setState({errGetFlights: parseError(e)});
        }
    }
})));