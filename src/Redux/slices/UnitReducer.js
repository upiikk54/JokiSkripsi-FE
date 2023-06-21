import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
const local_url = "http://localhost:8811";

export const getAllUnit = createAsyncThunk(
    'admin/getAllUnit',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/unit`,
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

export const createUnit = createAsyncThunk(
    'admin/createUnit',
    async (unit) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "POST",
                data: unit,
                url: `${local_url}/v1/unit/create`,
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

export const getUnitById = createAsyncThunk(
    'admin/getUnitById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/unit/${id}`,
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

export const updateUnit = createAsyncThunk(
    'admin/updateUnit',
    async ({ id, unit }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "PUT",
                url: `${local_url}/v1/unit/update/${id}`,
                data: unit,
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

export const deleteUnitById = createAsyncThunk(
    'admin/deleteUnitById',
    async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/v1/unit/delete/${id}`,
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
    getDataUnit: {},
    getDataUnitSingle: {},
}

const unitSlice = createSlice({
    name: 'unit',
    initialState,
    extraReducers: {
        [getAllUnit.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getAllUnit.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataUnit: action.payload.data.getAllUnit
            }
        },
        [getAllUnit.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [getUnitById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getUnitById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataUnitSingle: action.payload.data
            }
        },
        [getUnitById.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [createUnit.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [createUnit.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [createUnit.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [updateUnit.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [updateUnit.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [updateUnit.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [deleteUnitById.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteUnitById.fulfilled]: (state, action) => {
            return {
                ...state,
                getDataUnitSingle: action.payload.data
            }
        },
        [deleteUnitById.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})
export default unitSlice.reducer;