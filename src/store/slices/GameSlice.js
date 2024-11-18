import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedGame: null,
    onlineUsers: {},
    usersDetails: {},
    roomName: null,
    roomDetails: {},
    notification: null,
};

const GameSlice = createSlice({
    name: "gameData",
    initialState,
    reducers: {
        setSelectedGame: (state, action) => {
            state.selectedGame = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setUsersDetails: (state, action) => {
            state.usersDetails = action.payload;
        },
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
        setRoomDetails: (state, action) => {
            state.roomDetails = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
    },
});

export const {
    setSelectedGame,
    setOnlineUsers,
    setUsersDetails,
    setRoomName,
    setRoomDetails,
    setNotification,
} = GameSlice.actions;

export default GameSlice.reducer;