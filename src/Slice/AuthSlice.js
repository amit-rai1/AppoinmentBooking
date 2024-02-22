import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice ({
    name:'login',
    initialState: {
        isLoggedIn: false,
        data: {}
    },
    reducers: {
        userlogin(state, action) {
            console.log("sgsgs",action.payload)
            state.isLoggedIn = true;
            state.data = action.payload;
        },
        userlogout(state) {
            state.isLoggedIn = false;
            state.data = {}
        },
    }
})

export const {userlogin, userlogout} = loginSlice.actions;
export default loginSlice.reducer;