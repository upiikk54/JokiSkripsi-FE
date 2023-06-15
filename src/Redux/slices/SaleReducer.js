import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getAllSale = createAsyncThunk(
    'admin/getAllSale',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/sales-transaction`,
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
    getAllSales: {},
}

const saleSlice = createSlice({
    name: 'sale',
    initialState,
    extraReducers: {
        [getAllSale.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getAllSale.fulfilled]: (state, action) => {
            return {
                ...state,
                getAllSales: action.payload.data.getAllSalesTransaction
            }
        },
        [getAllSale.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default saleSlice.reducer;