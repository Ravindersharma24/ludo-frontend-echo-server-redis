import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    sideBarOpen: false,
    loading: false,
    beforeinstallprompt: {},
};
// slices

const slice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        changeSideBarStatus: (state, action) => {
            state.sideBarOpen = !state.sideBarOpen;
        },
        changeLoadingStatus: (state, action) => {
            if (action.payload !== undefined) state.loading = action.payload;
            else state.loading = !state.loading;
        },
        beforeinstallprompt: (state, data) => {
            state.beforeinstallprompt = data.payload;
        },
    },
});

export const { changeSideBarStatus, changeLoadingStatus, beforeinstallprompt } =
    slice.actions;
export default slice.reducer;
