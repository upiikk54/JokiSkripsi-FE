import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getAllMerk = createAsyncThunk(
    'admin/getAllMerk',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/brand`,
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

export const createMerk = createAsyncThunk(
    'admin/createMerk',
    async (merk) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: merk,
                url: `${local_url}/v1/brand/create`,
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

export const getMerkById = createAsyncThunk(
    'admin/getMerkById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/brand/${id}`,
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

export const updateMerk = createAsyncThunk(
    'admin/updateMerk',
    async ({ id, merk }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "PUT",
                url: `${local_url}/v1/brand/update/${id}`,
                data: merk,
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

export const deleteMerkById = createAsyncThunk(
    'admin/deleteMerkById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/brand/delete/${id}`,
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
    getDataMerk: {},
    getDataMerkSingle: {},
}

const merkSlice = createSlice({
    name: 'merk',
    initialState,
    extraReducers: {
        [getAllMerk.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getAllMerk.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataMerk: action.payload.data.getAllBrand
            }
        },
        [getAllMerk.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [getMerkById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getMerkById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataMerkSingle: action.payload.data
            }
        },
        [getMerkById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createMerk.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createMerk.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createMerk.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [updateMerk.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [updateMerk.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [updateMerk.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deleteMerkById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteMerkById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataMerkSingle: action.payload.data
            }
        },
        [deleteMerkById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})
export default merkSlice.reducer;