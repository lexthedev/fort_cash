import React, { useState } from "react"
import { DynamicHead, Footer, Popup } from '../components/index'

export default function Calculator() {

    const [income, setIncome] = useState<number>(0);
    const [spent, setSpent] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [currentTransfer, setCurrentTransfer] = useState<string | boolean>();

    return <>
        <DynamicHead />
        <div>
            <div>income: {income}</div>
            <div>balance: {balance}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { setCurrentTransfer('income') }}>income</button>
        <button onClick={() => { setCurrentTransfer('spent') }}>spent</button>
        {currentTransfer &&
            <Popup
                onClose={() => setCurrentTransfer(false)}>
                <h2>New {currentTransfer}</h2>
            </Popup>}
        <Footer />
    </>
};