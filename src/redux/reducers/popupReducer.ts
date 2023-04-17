import { IPopup } from "@/components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
    popup: IPopup | null;
}

const initialState: PopupState = {
    popup: null,
}

export const popupSlice = createSlice({
    name: 'popupSlice',
    initialState,
    reducers: {
        addPopup(state: PopupState, action: PayloadAction<IPopup>) {
            state.popup = action.payload;
        },
        removePopup(state: PopupState) {
            state.popup = null;
        }
    }
})

export default popupSlice.reducer;