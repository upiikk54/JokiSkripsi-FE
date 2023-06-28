import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getProductUnderKadaluarsa = createAsyncThunk(
    'admin/getProductUnderKadaluarsa',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/get-under-kadaluwarsa`,
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

export const createProduct = createAsyncThunk(
    'admin/createProduct',
    async (product) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: product,
                url: `${local_url}/v1/create-product`,
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

export const getProductById = createAsyncThunk(
    'admin/getProductById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/product/${id}`,
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

export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({
        id,
        product
    }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "PUT",
                url: `${local_url}/v1/update-product/${id}`,
                data: product,
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

export const deleteProductById = createAsyncThunk(
    'admin/deleteProductById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/delete-product/${id}`,
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
    getDataProductUnderKadaluarsas: {},
    getDataProductSingle: {},
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProductUnderKadaluarsa.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getProductUnderKadaluarsa.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataProductUnderKadaluarsas: action.payload.data
            }
        },
        [getProductUnderKadaluarsa.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [getProductById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getProductById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataProductSingle: action.payload.data
            }
        },
        [getProductById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createProduct.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createProduct.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createProduct.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [updateProduct.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [updateProduct.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [updateProduct.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deleteProductById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteProductById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataProductSingle: action.payload.data
            }
        },
        [deleteProductById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default productSlice.reducer;