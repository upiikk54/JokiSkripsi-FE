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

export const createSupplier = createAsyncThunk(
    'admin/createSupplier',
    async (supplier) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: supplier,
                url: `${local_url}/v1/supplier-create`,
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

export const getSupplierById = createAsyncThunk(
    'admin/getSupplierById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/supplier/${id}`,
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

export const updateSupplier = createAsyncThunk(
    'admin/updateSupplier',
    async ({ id, supplier }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "PUT",
                url: `${local_url}/v1/update-supplier/${id}`,
                data: supplier,
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

export const deleteSupplierById = createAsyncThunk(
    'admin/deleteSupplierById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/delete-supplier/${id}`,
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
    getDataSupplierSingle: {},
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

        [getSupplierById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getSupplierById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataSupplierSingle: action.payload.data
            }
        },
        [getSupplierById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createSupplier.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createSupplier.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createSupplier.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [updateSupplier.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [updateSupplier.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [updateSupplier.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deleteSupplierById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteSupplierById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataSupplierSingle: action.payload.data
            }
        },
        [deleteSupplierById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default supplierSlice.reducer;