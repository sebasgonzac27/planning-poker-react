import { configureStore } from "@reduxjs/toolkit";
import partyReducer from "../reducers/party/partySlice";
import userReducer from "../reducers/user/userSlice";

const store = configureStore({
    reducer: {
        party: partyReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;