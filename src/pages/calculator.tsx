import { transferTypes } from "@/constants/transferTypes";
import { useAppSelector } from "@/redux";
import React, { useState } from "react"
import { CreateCategory, DynamicHead, Footer, Popup, TransferInput } from '../components/index'

export default function Calculator() {

    // const [income, setIncome] = useState<number>(0);
    // const [spent, setSpent] = useState<number>(0);
    // const [balance, setBalance] = useState<number>(0);
    const [currentTransfer, setCurrentTransfer] = useState<transferTypes | boolean>();
    const [creatingCategory, setCreatingCategory] = useState<boolean>(false);

    const { income, spent } = useAppSelector(state => state.balanceReduser.wallet)

    return <>
        <DynamicHead />
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { setCurrentTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { setCurrentTransfer(transferTypes.outcome) }}>spent</button>
        <button onClick={() => setCreatingCategory(true)}>create category</button>
        {currentTransfer &&
            <Popup
                onClose={() => setCurrentTransfer(false)}>
                <h2>New {currentTransfer}</h2>
                <TransferInput
                    type={currentTransfer as transferTypes}
                    onClose={() => setCurrentTransfer(false)} />
            </Popup>}
        {creatingCategory &&
            <Popup
                onClose={() => setCreatingCategory(false)}>
                <h2>New category</h2>
                <CreateCategory onClose={() => setCreatingCategory(false)} />
            </Popup>}
        <Footer />
    </>
};