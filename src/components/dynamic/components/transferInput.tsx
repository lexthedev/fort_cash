import { ITransferInput } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { balanceSlice, useAppDispatch } from "@/redux";
import { useState } from "react";

export const TransferInput = (props: ITransferInput) => {

    const { type, onClose } = props;

    const [value, setValue] = useState(0);

    const { incrementIncome, incrementSpent } = balanceSlice.actions;
    const dispatch = useAppDispatch();

    function close() {
        !!onClose && onClose()
    }

    function increment() {
        switch (type) {
            case transferTypes.income:
                dispatch(incrementIncome(value));
                break;

            case transferTypes.spent:
                dispatch(incrementSpent(value));
                break;

            default:
                break;
        }

        close();
    }

    return <div>
        <p>
            <label htmlFor="TransferInput-input-value">enter value </label>
            <input id="TransferInput-input-value" type="number" onInput={(e) => setValue(parseInt(e.currentTarget.value))} />
        </p>
        <p>
            <button onClick={() => increment()}>ok</button>
            <button onClick={() => close()}>cancel</button>
        </p>
    </div>
}