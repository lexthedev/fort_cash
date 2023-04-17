import { transferTypes } from "@/constants/transferTypes";
import useShowAsPopup from "@/hooks/useShowAsPopup";
import { Transaction, transactionSlice, useAppDispatch, useAppSelector } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import { popupSlice } from "@/redux/reducers/popupReducer";
import { LocalStoreService } from "@/redux/services/localStoreService";
import WalletCalculator from "@/redux/services/walletCalculator";
import React, { useEffect, useState } from "react"
import { DynamicBody, DynamicHead, ICategory, IPopup, Popup, TransferInput } from '../components/index'

export default function Calculator() {

    const [currentTransfer, setCurrentTransfer] = useState<transferTypes | boolean>();
    const setPopUp = useShowAsPopup();
    const dispatch = useAppDispatch();
    const { removePopup } = popupSlice.actions;


    const { transactions } = useAppSelector(state => state.transactionsReducer)
    const { categories } = useAppSelector(state => state.categoryReducer)
    const { income, spent } = WalletCalculator.countBalance(transactions);

    function getCategoryById(id: string, type: transferTypes): ICategory | undefined {
        const chosenCategories = categories[type];
        return chosenCategories.find(({ id: _id }) => _id === id)
    }

    function ShowTransfer(type: transferTypes, transaction?: Transaction) {
        const popup: IPopup = {
            title: `New ${type}`,
            children: <TransferInput
                type={type}
                transaction={transaction}
                onClose={() => dispatch(removePopup())} />  // TO-DO: remove this awful code
        }
        setPopUp(popup);
    }

    const content = <>
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { ShowTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { ShowTransfer(transferTypes.outcome) }}>spent</button>
        <div>
            <h3>Transfers:</h3>
            {Object.keys(transactions).map(transKey => {
                const trans = transactions[transKey];
                const { amount, categoryId, type } = trans;
                const category = getCategoryById(categoryId, type)

                return <div onClick={() => ShowTransfer(type, trans)} key={transKey}>{`${type} - ${category?.title} - ${amount}`}</div>
            })}
        </div>
    </>

    return <>
        <DynamicHead />
        <DynamicBody>
            {content}
        </DynamicBody>

    </>
};