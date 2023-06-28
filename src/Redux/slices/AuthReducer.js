import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
// import { parseJwt } from "../../Helpers/ParseJWT";
// import { encryptLocalStorage } from '../../Helpers/Encryption/encryptLocalStorage'
// const local_url = "http://localhost:8987";
const local_url = "http://localhost:8811";

export const LoginUsers = createAsyncThunk(
    'admin/LoginUsers',
    async (user) => {
        try {
            const response = await axios({
                method: "POST",
                data: user,
                url: `${local_url}/v1/auth/login`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            })
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
);

export const getUsers = createAsyncThunk(
    'auth/Users',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios({
                method: "GET",
                url: `${local_url}/v1/auth/me`,
                headers: {
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
    dataUsers: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.dataUsers = action.payload
        },
    },
    extraReducers: {

        // // Auth me
        [getUsers.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [getUsers.fulfilled]: (state, action) => {
            return {
                ...state,
                dataUsers: action.payload.data.user
            }
        },
        [getUsers.rejected]: (state, action) => {
            return {
                ...state
            }
        },

        [LoginUsers.pending]: (state, action) => {
            return {
                ...state
            }
        },
        [LoginUsers.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [LoginUsers.rejected]: (state, action) => {
            return {
                ...state
            }
        },
    }
})

export default authSlice.reducer;