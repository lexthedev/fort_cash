import { transferTypes } from "@/constants/transferTypes";
import { useAppSelector } from "@/redux";
import React, { useState } from "react"
import { CreateCategory, DynamicBody, DynamicHead, Footer, Popup, SideMenu, TransferInput } from '../components/index'

export default function Calculator() {

    // const [income, setIncome] = useState<number>(0);
    // const [spent, setSpent] = useState<number>(0);
    // const [balance, setBalance] = useState<number>(0);
    const [currentTransfer, setCurrentTransfer] = useState<transferTypes | boolean>();
    const [creatingCategory, setCreatingCategory] = useState<boolean>(false);

    const { income, spent } = useAppSelector(state => state.balanceReduser.wallet)

    const content = <>
        <div>
            <div>income: {income}</div>
            <div>balance: {income - spent}</div>
            <div>spent: {spent}</div>
        </div>
        <button onClick={() => { setCurrentTransfer(transferTypes.income) }}>income</button>
        <button onClick={() => { setCurrentTransfer(transferTypes.outcome) }}>spent</button>
        <button onClick={() => setCreatingCategory(true)}>create category</button>
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
        {creatingCategory &&
            <Popup
                onClose={() => setCreatingCategory(false)}
                title={`New ${currentTransfer}`}>
                <CreateCategory onClose={() => setCreatingCategory(false)} />
            </Popup>}
    </>
};