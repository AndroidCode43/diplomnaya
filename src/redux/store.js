import { configureStore } from "@reduxjs/toolkit";
import { countriesReducer } from "./slices/countriesSlice";

export const mainStore = configureStore({
    reducer: {
        countriesReducer: countriesReducer
    }
});