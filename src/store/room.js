import { createSlice } from "@reduxjs/toolkit";
import { apiCallStart } from "./api";
import {
    ADD_ROOM_CODE,
    CREATE_ROOM,
    GAME_RESULT,
    GET_ROOM_CODE,
    JOINED_USER_DETAIL,
} from "./apiUrl";
const initialState = {
    code: "",
    id: "",
    waiting: false,
};
// slices

const slice = createSlice({
    name: "room",
    initialState,
    reducers: {
        roomCreated: (room, action) => {
            room.code = action.payload.roomCode;
            room.id = action.payload.roomId;
        },
        roomCodeWaiting: (room, action) => {
            room.waiting = true;
        },
        roomCodeGenerated: (room, action) => {
            room.waiting = false;
        },
        gameCompleted: (room, action) => {
            room.code = "";
            room.id = "";
        },
        deleteRoomCode: (room, action) => {
            room.code = "";
            room.id = "";
            // room.waiting = false;
        },
    },
});

export const {
    roomCreated,
    gameCompleted,
    roomCodeWaiting,
    roomCodeGenerated,
} = slice.actions;
export default slice.reducer;

// actions

export const createRoom = (data, callback) =>
    apiCallStart({
        url: CREATE_ROOM,
        method: "POST",
        data,
        onSuccess: callback,
    });
export const addRoomCode = (data, callback) =>
    apiCallStart({
        url: ADD_ROOM_CODE,
        method: "POST",
        data,
        onSuccess: callback,
    });

export const saveGameResult = (data, callback) =>
    apiCallStart({
        url: GAME_RESULT,
        method: "POST",
        data,
        onSuccess: callback,
        hasFile: true,
    });
export const joinedUserDetail = (data, callback) =>
    apiCallStart({
        url: JOINED_USER_DETAIL,
        method: "POST",
        data,
        onSuccess: callback,
    });

export const getRoomCode = (game_id, callback) =>
    apiCallStart({
        url: GET_ROOM_CODE + game_id,
        method: "GET",
        onSuccess: callback,
    });
