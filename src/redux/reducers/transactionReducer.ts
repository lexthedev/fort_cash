import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction, Transactions } from "..";
import { IPayload } from "../models/localStorePayload";
import { LocalStoreService } from "../services/localStoreService";

interface TransactionState {
    transactions: Transactions;
    lastId: string;
    // c: Transaction[]
    // isLoading: boolean;
    // error: any | any[];
}

const initialState: TransactionState = {
    transactions: {},
    lastId: '0',
    //     isLoading: false,
    //     error: null
}


function saveToStore(state: TransactionState) {
    const savePayload: IPayload = {
        name: 'transactions',
        data: state.transactions
    }

    LocalStoreService.SaveToStore(savePayload)
}

export const transactionSlice = createSlice({
    name: 'balanceSlice',
    initialState,
    reducers: {
        addTransaction(state: TransactionState, action: PayloadAction<Transaction>) {
            // const newId = Number(state.transactions.slice(-1)[0]?.id || 0) + 1;
            // const newTransaction = { ...action.payload, id: String(newId) }
            // state.transactions.push(newTransaction);
            const newId = String(Number(state.lastId) + 1);
            state.transactions[newId] = { ...action.payload, id: newId };
            state.lastId = newId;

            saveToStore(state);
        },
        editTransaction(state: TransactionState, action: PayloadAction<Transaction>) {
            const { id } = action.payload;
            state.transactions[id as string] = action.payload;

            saveToStore(state);
        },
        removeTransaction(state: TransactionState, action: PayloadAction<string>) {
            delete state.transactions[action.payload];

            saveToStore(state);
        },
        setTransactions(state: TransactionState, action: PayloadAction<Transactions>) {
            // console.log('state.transactions', ...state.transactions);
            // console.log('action.payload', action.payload);


            if (!!action.payload) {
                const { payload } = action;
                Object.keys(payload).forEach((apKey) => {
                    state.transactions[apKey] = payload[apKey];
                    const apKeyNumber = Number(apKey);
                    if (apKeyNumber > Number(state.lastId)) state.lastId = apKey;
                })
            }
        }
    }
})

export default transactionSlice.reducer;