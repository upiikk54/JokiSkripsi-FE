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

export const createPurchase = createAsyncThunk(
    'admin/createPurchase',
    async (purchase) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: purchase,
                url: `${local_url}/v1/purchase-create`,
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

export const getPurchaseById = createAsyncThunk(
    'admin/getPurchaseById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/purchase/${id}`,
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

export const deletePurchaseById = createAsyncThunk(
    'admin/deletePurchaseById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/delete-purchase/${id}`,
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
    getDataPurchaseSingle: {},
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

        [getPurchaseById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getPurchaseById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataPurchaseSingle: action.payload.data
            }
        },
        [getPurchaseById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createPurchase.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createPurchase.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createPurchase.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deletePurchaseById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deletePurchaseById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataPurchaseSingle: action.payload.data
            }
        },
        [deletePurchaseById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default purchaseSlice.reducer;