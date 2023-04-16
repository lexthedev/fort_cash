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
        addTransaction(state: TransactionState, action: PayloadAction<Transaction>) {
            const newId = Number(state.transactions.slice(-1)[0]?.id || 0) + 1;
            const newTransaction = { ...action.payload, id: String(newId) }
            state.transactions.push(newTransaction);
            const savePayload: IPayload = {
                name: 'transactions',
                data: state.transactions
            }

            LocalStoreService.SaveToStore(savePayload)
        },
        setTransactions(state: TransactionState, action: PayloadAction<Transaction[]>) {
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