import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getAllPurchase = createAsyncThunk(
    'admin/getAllPurchase',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/purchase`,
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
    getAllPurchases: {},
}

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    extraReducers: {
        [getAllPurchase.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getAllPurchase.fulfilled]: (state, action) => {
            return {
                ...state,
                getAllPurchases: action.payload.data.getAllPurchase
            }
        },
        [getAllPurchase.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default purchaseSlice.reducer;