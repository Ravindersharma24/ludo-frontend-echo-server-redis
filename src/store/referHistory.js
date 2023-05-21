import { createSlice } from "@reduxjs/toolkit";
import { apiCallStart } from "./api";
import { REFER_HISTORY } from "./apiUrl";
const initialState = {
    list: [],
};

const slice = createSlice({
    name: "refer_history",
    initialState,
    reducers: {
        fetchedReferHistory: (history, action) => {
            history.list = action.payload.refer_transaction_history.data;
        },
    },
});

export const { fetchedReferHistory } = slice.actions;
export default slice.reducer;

// actions

export const loadReferHistory = () =>
    apiCallStart({
        url: REFER_HISTORY,
        onSuccess: fetchedReferHistory.type,
    });
