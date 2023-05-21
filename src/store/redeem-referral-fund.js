import { apiCallStart } from "./api";
import { REDEEM_REFER_FUNDS } from "./apiUrl";
// slices

// actions

export const RedeemReferralFunds = (data, callback) =>
    apiCallStart({
        url: REDEEM_REFER_FUNDS,
        method: "POST",
        data,
        onSuccess: callback,
    });
