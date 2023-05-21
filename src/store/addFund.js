import { createSlice } from "@reduxjs/toolkit"
import { apiCallStart } from "./api"
import { CREATE_ORDER, CONFIRM_ORDER } from "./apiUrl"
const initialState = {
    orderToken: '',
    orderId: ''
}
// slices

const slice = createSlice({
    name: 'add_fund',
    initialState,
    reducers:{
        setPaymentDetails: (details, action) => {
            const { order_id, order_token } = action.payload;
            return {
                orderId: order_id, orderToken : order_token
            }
        },
    }
})


export const {setPaymentDetails} = slice.actions;
export default slice.reducer;


// actions

export const generateOrderToken = (data, callback) => apiCallStart({
    url: CREATE_ORDER,
    method: 'POST',
    data,
    onSuccess: callback
})
export const checkOrderStatus = (data, callback) => apiCallStart({
    url: CONFIRM_ORDER,
    method: 'POST',
    data,
    onSuccess: callback
})


