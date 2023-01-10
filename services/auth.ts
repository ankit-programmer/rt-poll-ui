import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "./types";
const initialState: Auth = {
    token: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<Auth>) => {
            state.token = action.payload.token,
                state.email = action.payload.email,
                state.isAnonymous = action.payload.isAnonymous,
                state.uid = action.payload.uid
        },
        removeToken: (state) => {
            state.token = undefined;
        }
    }
});


export const { setAuth, removeToken } = authSlice.actions;
export default authSlice.reducer;