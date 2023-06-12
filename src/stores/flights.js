import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {parseError} from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useFlights = create(devtools(setState => ({
    flights:[],
    errGetFlights: null,
    errUploading: null,
    isLoading: false,
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
        setState({errGetFlights: null, isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/valid`);
            setState({flights: data, isLoading: false});
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
        setState({errGetFlights: null, isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/all_with_tickets`);
            setState({flights: data, isLoading: false});
        }catch (e){
            setState({errGetFlights: parseError(e), isLoading: false});
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
        setState({errGetFlights: null, isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/find_by_date?flightDate=${flightDate}`);
            setState({flights: data, isLoading: false});
        }catch(e){
            setState({errGetFlights: parseError(e), isLoading: false});
        }
    },

    fetchGetValidWithTickets: async () => {
        setState({errGetFlights: null, isLoading: true});
        try {
            const {data} = await yttAxios.get(`/flights/valid_with_tickets`);
            setState({flights: data, isLoading: false});
        }catch (e){
            setState({errGetFlights: parseError(e), isLoading: false});
        }
    },

    fetchGetFlightByParams: async(date, fromCity, intoCity) => {
        setState({errGetFlights: null, isLoading: true});
        try{
            const {data} = await yttAxios.get(`/flights/valid_by_params?date=${date}&fromCity=${fromCity}&intoCity=${intoCity}`);
            setState({flights: data, isLoading: false});
        }catch(e){
            setState({errGetFlights: parseError(e), isLoading: false});
        }
    }
})));