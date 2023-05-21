import { createSlice } from "@reduxjs/toolkit";
import { apiCallStart } from "./api";
import {
    ADD_GAME_BATTLE,
    BATTLES,
    DELETE_GAME_BATTLE,
    // LIVE_BATTLES,
    REJECT_GAME_BATTLE,
} from "./apiUrl";
const initialState = {
    list: [],
    liveBtlList: [],
};
// slices

const slice = createSlice({
    name: "lobby",
    initialState,
    reducers: {
        loadGameBattles: (battles, action) => {
            battles.list = action.payload;
        },
        liveBattles: (battles, action) => {
            battles.list = action.payload?.data?.liveBattle;
        },
        addNewBattle: (battles, action) => {
            let extistingBattle = battles.list.findIndex(
                (battle) => battle.id === action?.payload?.latestBattle[0].id
            );
            if (extistingBattle === -1) {
                battles.list.unshift(action?.payload?.latestBattle[0]);
            }
        },
        setWaitingStatus: (battles, action) => {
            const { battle_id, status } = action.payload;
            let index = battles.list.findIndex(
                (battle) => battle.id == battle_id
            );
            if (index >= 0) {
                battles.list[index].status = status;
            }
        },
        deleteGameBattle: (battles, action) => {
            battles.list = battles.list.filter(
                (battle) => battle.id !== action.payload?.battleId
            );
        },
        reject_battle: (battles, action) => { },
    },
});

export const {
    loadGameBattles,
    setWaitingStatus,
    addGameBattle,
    deleteGameBattle,
    liveBattles,
    reject_battle,
    addNewBattle,
} = slice.actions;
export default slice.reducer;

// actions

export const loadAllBattles = (id) =>
    apiCallStart({
        url: BATTLES + id,
        onSuccess: loadGameBattles.type,
    });
export const addBattle = (data) =>
    apiCallStart({
        url: ADD_GAME_BATTLE,
        method: "POST",
        data,
        onSuccess: addNewBattle.type,
    });
export const deleteBattle = (data) =>
    apiCallStart({
        url: DELETE_GAME_BATTLE,
        method: "DELETE",
        data,
        onSuccess: deleteGameBattle.type,
    });
export const rejectBtl = (data) =>
    apiCallStart({
        url: REJECT_GAME_BATTLE,
        method: "POST",
        data,
        onSuccess: reject_battle.type,
    });
