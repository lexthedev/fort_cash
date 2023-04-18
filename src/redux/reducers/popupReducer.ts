import { IPopup } from "@/components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
    popups: IPopup[];
}

const initialState: PopupState = {
    popups: [],
}

export const popupSlice = createSlice({
    name: 'popupSlice',
    initialState,
    reducers: {
        addPopup(state: PopupState, action: PayloadAction<IPopup>) {
            const newPopup = { ...action.payload, dateTimeId: Date.now }
            state.popups?.push(newPopup);
        },
        removePopup(state: PopupState) {
            state.popups = [];
        }
    }
})

export default popupSlice.reducer;