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
            const newPopup = { ...action.payload, dateTimeId: String(Date.now()) }
            state.popups?.push(newPopup);
        },
        removePopup(state: PopupState, action: PayloadAction<string>) {
            const { payload: id } = action;
            state.popups = state.popups.filter(pop => pop.dateTimeId !== id);
        }
    }
})

export default popupSlice.reducer;