import { transferTypes } from "@/constants/transferTypes";
import useShowAsPopup from "@/hooks/useShowAsPopup";
import { Transaction, useAppSelector } from "@/redux";
import WalletCalculator from "@/redux/services/walletCalculator";
import React from "react"
import { DynamicBody, DynamicHead, ICategory, IPopup, Popup, TransferInput } from '../components/index'

export default function Calculator() {

    // const { addPopup } = useShowAsPopup();
    const { transactions } = useAppSelector(state => state.transactionsReducer)
    const { categories } = useAppSelector(state => state.categoryReducer)
    const { income, spent } = WalletCalculator.countBalance(transactions);

    function getCategoryById(id: string, type: transferTypes): ICategory | undefined {
        const chosenCategories = categories[type];
        return chosenCategories.find(({ id: _id }) => _id === id)
    }

    const { addPopup, popups } = useShowAsPopup();

    function showTransfer(type: transferTypes, transaction?: Transaction) {
        const popup: IPopup = {
            title: `New ${type}`,
            children: <TransferInput
                type={type}
                transaction={transaction} />
        }
        addPopup(popup);
    }

    const content = <>
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { showTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { showTransfer(transferTypes.outcome) }}>spent</button>
        <div>
            <h3>Transfers:</h3>
            {Object.keys(transactions).map(transKey => {
                const trans = transactions[transKey];
                const { amount, categoryId, type } = trans;
                const category = getCategoryById(categoryId, type)

                return <div onClick={() => showTransfer(type, trans)} key={transKey}>{`${type} - ${category?.title} - ${amount}`}</div>
            })}
        </div>
    </>

    return <>
        <DynamicHead />
        <DynamicBody popups={popups}>
            {content}
        </DynamicBody>
    </>
};