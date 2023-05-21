import { createSlice } from "@reduxjs/toolkit"
import { apiCallStart } from "./api"
import { GAME_HISTORY } from "./apiUrl"
const initialState = {
    list: []
}
// slices

const slice = createSlice({
    name: 'games_history',
    initialState,
    reducers:{
        fetchedGamesHistory: (history, action) => {
            // history.list = action.payload.game_history.data
            history.list = action.payload.battle_transaction_history.data
        },
    }
})


export const {fetchedGamesHistory} = slice.actions;
export default slice.reducer;


// actions

export const loadGamesHistory = () => apiCallStart({
    url: GAME_HISTORY,
    onSuccess: fetchedGamesHistory.type
})

