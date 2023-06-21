import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getAllCategory = createAsyncThunk(
    'admin/getAllCategory',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/category`,
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

export const createCategory = createAsyncThunk(
    'admin/createCategory',
    async (category) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: category,
                url: `${local_url}/v1/category/create`,
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

export const getCategoryById = createAsyncThunk(
    'admin/getCategoryById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/category/${id}`,
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

export const updateCategory = createAsyncThunk(
    'admin/updateCategory',
    async ({ id, category }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "PUT",
                url: `${local_url}/v1/category/update/${id}`,
                data: category,
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

export const deleteCategoryById = createAsyncThunk(
    'admin/deleteCategoryById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/category/delete/${id}`,
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
    getDataCategory: {},
    getDataCategorySingle: {},
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: {
        [getAllCategory.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getAllCategory.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataCategory: action.payload.data.getAllCategory
            }
        },
        [getAllCategory.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [getCategoryById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getCategoryById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataCategorySingle: action.payload.data
            }
        },
        [getCategoryById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createCategory.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createCategory.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createCategory.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [updateCategory.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [updateCategory.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [updateCategory.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deleteCategoryById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteCategoryById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataCategorySingle: action.payload.data
            }
        },
        [deleteCategoryById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})
export default categorySlice.reducer;