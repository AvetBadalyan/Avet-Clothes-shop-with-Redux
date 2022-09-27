import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        token: ''
    },
    reducers: {
        initCurrentUser: (state, { payload }) => {
            state.token = payload
        }
    }
});

export const { initCurrentUser } = userSlice.actions
export default userSlice.reducer