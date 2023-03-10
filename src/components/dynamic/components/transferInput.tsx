import { ITransferInput } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { balanceSlice, useAppDispatch } from "@/redux";
import { useState } from "react";

export const TransferInput = (props: ITransferInput) => {

    const { type, onClose } = props;
    const [value, setValue] = useState<number>();
    const [category, setCategory] = useState<string>();
    const { incrementIncome, incrementSpent } = balanceSlice.actions;
    const dispatch = useAppDispatch();

    function close() {
        !!onClose && onClose()
    }

    function increment() {

        if (value && value > 0) {
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
    }

    function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {

        switch (event.key) {
            case 'Enter':
                increment()
                break;

            case 'Escape':
                close()
                break;

            default:
                break;
        }
    }

    return <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)}>
        <div>
            <div>
                <label htmlFor="TransferInput-input-value">enter value</label>
                <input
                    id="TransferInput-input-value"
                    type="number"
                    onInput={(e) => setValue(parseInt(e.currentTarget.value))}
                    value={value}
                    autoFocus />
            </div>

            <div>
                <label htmlFor="TransferInput-input-category">enter category</label>
                <select onChange={(e) => setCategory(e.target.value)} name="TransferInput-input-category" id="TransferInput-input-category">
                    <option value="car">car</option>
                    <option value="meal">meal</option>
                    <option value="medicine">medicine</option>
                    <option value="wife">wife</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <button onClick={() => increment()}>ok</button>
                <button onClick={() => close()}>cancel</button>
            </div>
        </div>
    </div>
}