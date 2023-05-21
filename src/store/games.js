import { createSlice } from "@reduxjs/toolkit"
import { apiCallStart } from "./api"
import { GAMES_LIST } from "./apiUrl"
const initialState = {
    list: []
}
// slices

const slice = createSlice({
    name: 'games',
    initialState,
    reducers:{
        loadGamesList: (games, action) => {
            games.list = action.payload.GameListings
        },
    }
})


export const {loadGamesList} = slice.actions;
export default slice.reducer;


// actions

export const loadAllGames = () => apiCallStart({
    url: GAMES_LIST,
    onSuccess: loadGamesList.type
})