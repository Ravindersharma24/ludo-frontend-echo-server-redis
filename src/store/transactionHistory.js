import { createSlice } from "@reduxjs/toolkit"
import { apiCallStart } from "./api"
import { TRANSACTION_HISTORY } from "./apiUrl"
const initialState = {
    list: []
}
// slices

const slice = createSlice({
    name: 'transactions_history',
    initialState,
    reducers:{
        fetchedTransactionsHistory: (history, action) => {
            history.list = action.payload.wallet_transaction_history
            .data
        },
    }
})


export const {fetchedTransactionsHistory} = slice.actions;
export default slice.reducer;


// actions

export const loadTransactionHistory = () => apiCallStart({
    url: TRANSACTION_HISTORY,
    onSuccess: fetchedTransactionsHistory.type
})

