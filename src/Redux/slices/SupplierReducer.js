import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getAllSupplier = createAsyncThunk(
    'admin/getAllSupplier',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/supplier`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
);

const initialState = {
    getAllSuppliers: {},
}

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    extraReducers: {
        [getAllSupplier.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getAllSupplier.fulfilled]: (state, action) => {
            return {
                ...state,
                getAllSuppliers: action.payload.data.getAllSupplier
            }
        },
        [getAllSupplier.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default supplierSlice.reducer;