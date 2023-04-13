import { transferTypes } from "@/constants/transferTypes";
import { transactionSlice, useAppDispatch, useAppSelector } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import { LocalStoreService } from "@/redux/services/localStoreService";
import WalletCalculator from "@/redux/services/walletCalculator";
import React, { useEffect, useState } from "react"
import { DynamicBody, DynamicHead, ICategory, Popup, TransferInput } from '../components/index'

export default function Calculator() {

    const [currentTransfer, setCurrentTransfer] = useState<transferTypes | boolean>();

    const { transactions } = useAppSelector(state => state.transactionsReducer)
    const { categories } = useAppSelector(state => state.categoryReducer)
    // const { setTransactions } = transactionSlice.actions;
    // const { setCategories } = categorySlice.actions;
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(setTransactions(LocalStoreService.GetFromStore('transactions')));
    //     dispatch(setCategories(LocalStoreService.GetFromStore('categories')));
    // }, [])
    const { income, spent } = WalletCalculator.countBalance(transactions);

    function getCategoryById(id: string, type: transferTypes): ICategory | undefined {
        const chosenCategories = categories[type];
        return chosenCategories.find(({ id: _id }) => _id === id)
    }

    const content = <>
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { setCurrentTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { setCurrentTransfer(transferTypes.outcome) }}>spent</button>
        <div>
            <h3>Transfers:</h3>
            {transactions.map((trans) => {
                const { amount, categoryId, type, id } = trans;
                const category = getCategoryById(categoryId, type)

                return <div key={id}>{`${type} - ${category?.title} - ${amount}`}</div>
            })}
        </div>
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