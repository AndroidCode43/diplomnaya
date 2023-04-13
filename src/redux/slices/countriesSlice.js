import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCityByName = createAsyncThunk('get country by name', async() => {
    const data = await axios.post('https://htmlweb.ru/geo/api.php?location=Европа&json&api_key=16ef934a8a6fdd88c67abe60516deb61');
    return data;
});

const initialState = {
    countries: []
}

const citySlice = createSlice({
    name: 'city slice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [getCityByName.pending] : (state) => {
            state.countries = [];
        },
        [getCityByName.fulfilled] : (state, action) => {
            state.countries = action.payload;
        },
        [getCityByName.rejected] : (state) => {
            state.countries = []
        }
    }
});

export const countriesReducer = citySlice.reducer;