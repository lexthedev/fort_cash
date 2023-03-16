import { transferTypes } from "@/constants/transferTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { balanceSlice, Transaction } from "..";
import WalletCalculator from "../services/walletCalculator";

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
        },
        setTransactions(state, action: PayloadAction<Transaction[]>) {
            state.transactions = action.payload;
        }
    }
})

export default transactionSlice.reducer;