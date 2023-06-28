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

export const createSaleTransaction = createAsyncThunk(
    'admin/createSaleTransaction',
    async (sale) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: sale,
                url: `${local_url}/v1/sales-transaction/create`,
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

export const getSaleTransactionById = createAsyncThunk(
    'admin/getSaleTransactionById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/sales-transaction/${id}`,
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

export const deleteSaleTransactionById = createAsyncThunk(
    'admin/deleteSaleTransactionById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/sales-transaction/delete/${id}`,
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
    getDataSaleSingle: {},
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

        [getSaleTransactionById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getSaleTransactionById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataSaleSingle: action.payload.data
            }
        },
        [getSaleTransactionById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createSaleTransaction.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createSaleTransaction.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createSaleTransaction.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deleteSaleTransactionById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteSaleTransactionById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataSaleSingle: action.payload.data
            }
        },
        [deleteSaleTransactionById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default saleSlice.reducer;