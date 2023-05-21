import { apiCallStart } from "./api";
import { MANUAL_WITHDRAW_FUNDS, WITHDRAW_FUNDS } from "./apiUrl";
// slices

// actions

export const withdrawFunds = (data, callback) =>
    apiCallStart({
        url: WITHDRAW_FUNDS,
        method: "POST",
        data,
        onSuccess: callback,
    });

export const manualWithdrawFunds = (data, callback) =>
    apiCallStart({
        url: MANUAL_WITHDRAW_FUNDS,
        method: "POST",
        data,
        onSuccess: callback,
    })
