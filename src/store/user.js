import { createSlice } from "@reduxjs/toolkit";
import { apiCallStart } from "./api";
import {
    CHECK_AUTH,
    LOGOUT,
    SEND_OTP,
    VERIFY_OTP,
    UPLOAD_KYC,
    UPDATE_REFER_CODE,
    UPDATE_USER_PROFILE,
    GET_DOCUMENTS,
    GET_STATES,
    GET_TOTAL_REFERS,
} from "./apiUrl";
const initialState = {
    details: {
        name: "",
        userId: "",
        userImage: "",
        phoneNumber: "",
        profileImage: "",
        walletBalance: 0,
        depositeCash: 0,
        winningCash: 0,
        kyc: false,
        referCode: "",
        upiId: "",
        affiliateId: "",
        totalRefers: 0,
        battlePlayed: 0,
        isAuthenticated: "loading",
        paytm: 1
    },
    documentTypes: [],
    states: [],
};
// slices

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        unAuthenticated: (user, action) => {
            localStorage.removeItem("_token");
            user.details.isAuthenticated = false;
        },
        setUserDetails: (user, action) => {
            const {
                name,
                kyc,
                userId,
                phoneNumber,
                profileImage,
                walletBalance,
                depositeCash,
                winningCash,
                referCode,
                upiId,
                affiliateId,
                battlePlayed,
                refer_cash,
                totalRefers,
                wallet_withdraw_limit,
                refer_reedem_limit,
                refer_commission_percentage,
                max_refer_commission,
                pending_game_penalty_amt,
                wrong_result_penalty_amt,
                paytm
            } = action.payload.details;
            user.details = {
                name,
                userId,
                phoneNumber,
                profileImage,
                walletBalance,
                depositeCash,
                winningCash,
                kyc,
                referCode,
                upiId,
                isAuthenticated: true,
                affiliateId,
                totalRefers,
                battlePlayed,
                refer_cash,
                wallet_withdraw_limit,
                refer_reedem_limit,
                refer_commission_percentage,
                max_refer_commission,
                pending_game_penalty_amt,
                wrong_result_penalty_amt,
                paytm
            };
        },
        kycUploaded: (user, action) => {
            user.details.kyc = "pending";
        },
        updatedReferCode: (user, action) => {
            user.details.referCode = action.payload.referCode;
        },
        updatedProfile: (user, action) => {
            if (action.payload.userName) {
                user.details.name = action.payload.userName;
            } else {
                user.details.profileImage = action.payload.profileImage;
            }
        },
        updatedUpiId: (user, action) => {
            user.details.upiId = action.payload.upiId;
            // console.warn('user action', user, action);
        },
        fetchedDocumentTypes: (user, action) => {
            user.documentTypes = action.payload;
        },
        fetchedStates: (user, action) => {
            user.states = action.payload;
        },
        fetchedTotalRefers: (user, action) => {
            user.details.totalRefers = action.payload.total_referral;
            user.commissionPercentage = action.payload.commission_percentage;
        },
    },
});

export const {
    unAuthenticated,
    setUserDetails,
    kycUploaded,
    updatedReferCode,
    updatedProfile,
    fetchedDocumentTypes,
    fetchedStates,
    fetchedTotalRefers,
    updatedName,
    updatedUpiId
} = slice.actions;
export default slice.reducer;
// actions

export const sendOtp = (data, onSuccess) =>
    apiCallStart({
        url: SEND_OTP,
        method: "POST",
        data,
        onSuccess,
    });

export const checkAuth = () =>
    apiCallStart({
        url: CHECK_AUTH,
        onSuccess: setUserDetails.type,
        onError: unAuthenticated.type,
        dontNotifySuccess: true,
    });
export const verifyOtp = (data) =>
    apiCallStart({
        url: VERIFY_OTP,
        method: "POST",
        data,
        onSuccess: (dispatch, data) => {
            localStorage.setItem("_token", data.token);
            dispatch(checkAuth());
        },
        onError: unAuthenticated.type,
    });

export const logout = () =>
    apiCallStart({
        url: LOGOUT,
        onSuccess: unAuthenticated.type,
    });
export const uploadKyc = (data, callback) => {
    return apiCallStart({
        url: UPLOAD_KYC,
        method: "POST",
        data: {
            document_id: data.docType.id,
            document_number: data.docNumber,
            first_name: data.firstName,
            last_name: data.lastName,
            dob: data.dob,
            state: data.state.id,
            front_photo: data.frontPhoto,
            back_photo: data.backPhoto,
        },
        onSuccess: callback,
        hasFile: true,
    });
};
export const updateReferCode = (data) =>
    apiCallStart({
        url: UPDATE_REFER_CODE,
        method: "POST",
        data,
        onSuccess: updatedReferCode.type,
    });
export const updateUpiId = (data) =>
    apiCallStart({
        url: UPDATE_USER_PROFILE,
        method: "POST",
        data,
        onSuccess: updatedUpiId.type
    })
export const updateUserProfile = (data, callback) =>
    apiCallStart({
        url: UPDATE_USER_PROFILE,
        method: "POST",
        data,
        onSuccess: callback,
        hasFile: true,
    });

export const getDocumentTypes = () =>
    apiCallStart({
        url: GET_DOCUMENTS,
        onSuccess: fetchedDocumentTypes.type,
    });
export const getStates = () =>
    apiCallStart({
        url: GET_STATES,
        onSuccess: fetchedStates.type,
    });
export const getTotalRefers = () =>
    apiCallStart({
        url: GET_TOTAL_REFERS,
        onSuccess: fetchedTotalRefers.type,
    });
