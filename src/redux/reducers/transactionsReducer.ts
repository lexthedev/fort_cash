import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "..";
import { IPayload } from "../models/localStorePayload";
import { LocalStoreService } from "../services/localStoreService";

interface TransactionState {
    transactions: Transaction[]
    isLoading: boolean;
    error: any | any[];
}

const initialState: TransactionState = {
    transactions: [] as Transaction[],
    isLoading: false,
    error: null
}

export const transactionSlice = createSlice({
    name: 'balanceSlice',
    initialState,
    reducers: {
        addTransaction(state, action: PayloadAction<Transaction>) {
            state.transactions.push(action.payload);
            const savePayload: IPayload = {
                name: 'transactions',
                data: state.transactions
            }

            LocalStoreService.SaveToStore(savePayload)
        },
        setTransactions(state, action: PayloadAction<Transaction[]>) {
            if (!!action.payload) {
                state.transactions = [
                    ...state.transactions,
                    ...action.payload
                ];
            }
        }
    }
})

export default transactionSlice.reducer;