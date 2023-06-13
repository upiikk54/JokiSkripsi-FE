import { configureStore } from "@reduxjs/toolkit";
// import AdminReducer from "./slices/AdminReducer";
// import AuthReducer from "./slices/AuthReducer";
// import UserReducer from './slices/UserReducer';

const rootReducer = {
    // user: UserReducer,
    // auth: AuthReducer,
    // admin: AdminReducer,
}

const store = configureStore({
    reducer: rootReducer
});

export default store;