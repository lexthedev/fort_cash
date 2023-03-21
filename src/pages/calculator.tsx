import { transferTypes } from "@/constants/transferTypes";
import { transactionSlice, useAppDispatch, useAppSelector } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import { LocalStoreService } from "@/redux/services/localStoreService";
import WalletCalculator from "@/redux/services/walletCalculator";
import React, { useEffect, useState } from "react"
import { DynamicBody, DynamicHead, Popup, TransferInput } from '../components/index'

export default function Calculator() {

    const [currentTransfer, setCurrentTransfer] = useState<transferTypes | boolean>();

    const { transactions } = useAppSelector(state => state.transactionsReducer)
    // const { setTransactions } = transactionSlice.actions;
    // const { setCategories } = categorySlice.actions;
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(setTransactions(LocalStoreService.GetFromStore('transactions')));
    //     dispatch(setCategories(LocalStoreService.GetFromStore('categories')));
    // }, [])
    const { income, spent } = WalletCalculator.countBalance(transactions);

    const content = <>
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { setCurrentTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { setCurrentTransfer(transferTypes.outcome) }}>spent</button>
    </>

    return <>
        <DynamicHead />
        <DynamicBody>
            {content}
        </DynamicBody>
        {currentTransfer &&
            <Popup
                onClose={() => setCurrentTransfer(false)}
                title={`New ${currentTransfer}`}>
                <TransferInput
                    type={currentTransfer as transferTypes}
                    onClose={() => setCurrentTransfer(false)} />
            </Popup>}
    </>
};