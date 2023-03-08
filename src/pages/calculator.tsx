import { transferTypes } from "@/constants/transferTypes";
import { useAppSelector } from "@/redux";
import React, { useState } from "react"
import { DynamicHead, Footer, Popup, TransferInput } from '../components/index'

export default function Calculator() {

    // const [income, setIncome] = useState<number>(0);
    // const [spent, setSpent] = useState<number>(0);
    // const [balance, setBalance] = useState<number>(0);
    const [currentTransfer, setCurrentTransfer] = useState<transferTypes | boolean>();

    const {income, spent} = useAppSelector(state => state.balanceReduser.wallet)

    return <>
        <DynamicHead />
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { setCurrentTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { setCurrentTransfer(transferTypes.spent) }}>spent</button>
        {currentTransfer &&
            <Popup
                onClose={() => setCurrentTransfer(false)}>
                <h2>New {currentTransfer}</h2>
                <TransferInput
                    type={currentTransfer as transferTypes}
                    onClose={() => setCurrentTransfer(false)} />
            </Popup>}
        <Footer />
    </>
};