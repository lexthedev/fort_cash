import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWalletState } from "..";

interface BalanceState {
    wallet: IWalletState;
    isLoading: boolean;
    error: any | any[];
}

const initialState: BalanceState = {
    wallet: {
        income: 0,
        spent: 0
    },
    isLoading: false,
    error: null
}

export const balanceSlice = createSlice({
    name: 'balanceSlice',
    initialState,
    reducers: {
        incrementIncome(state, action: PayloadAction<number>) {
            state.wallet.income += action.payload;
        },
        incrementSpent(state, action: PayloadAction<number>) {
            state.wallet.spent += action.payload;
        }
    }
})

export default balanceSlice.reducer;