import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { parseError } from "../utils/utils";
import yttAxios from "../utils/axios_settings";

export const useUsers = create(devtools(setState => ({
    users: null,
    usersError: null,
    isLoading: false,
    
    fetchGeAllUsers: async () => {
        setState({ usersError: null, isLoading: true });
        try {
            const { data } = await yttAxios.get(`/users/all`);
            setState({ users: data, isLoading: false });
        } catch (e) {
            setState({ usersError: parseError(e), isLoading: true });
        }
    },

    fetchGetUserByParams: async (name, passport, dob) => {
        setState({ usersError: null, isLoading: true });
        try {
            const { data } = await yttAxios.post(`/users/param?name=${name}&passportNumber=${passport}&dob=${dob}`);
            setState({ users: data, isLoading: false });
        } catch (e) {
            setState({ usersError: parseError(e), isLoading: true });
        }
    }
})));