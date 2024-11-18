import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {}
};

const UserSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const {
    setUserData,
} = UserSlice.actions;

export default UserSlice.reducer;
