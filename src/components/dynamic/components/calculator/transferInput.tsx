import { CategoryList, ITransferInput } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { balanceSlice, messageSlice, transactionSlice, useAppDispatch, useAppSelector } from "@/redux";
import { useState } from "react";

export const TransferInput = (props: ITransferInput) => {

    const { type, transaction, onClose } = props;
    const [value, setValue] = useState<number>(transaction?.amount as number);
    const [category, setCategory] = useState<string>(transaction?.categoryId as string);
    const { incrementIncome, incrementSpent } = balanceSlice.actions;
    const { addTransaction, editTransaction, removeTransaction } = transactionSlice.actions;
    const { addMessage } = messageSlice.actions;
    const { income, outcome } = useAppSelector(state => state.categoryReducer.categories);

    const dispatch = useAppDispatch();

    function close() {
        !!onClose && onClose()
    }

    function increment() {

        if (!value || value < 0) {
            dispatch(addMessage({
                header: 'transactions error',
                text: 'you have to enter amount > 0',
                type: 'error'
            }))
            return;
        }
        if (!category) {
            dispatch(addMessage({
                header: 'transactions error',
                text: 'you have to enter category',
                type: 'error'
            }))
            return;
        }
        if (transaction?.id) {
            dispatch(editTransaction({
                id: transaction.id,
                amount: value,
                categoryId: category as string,
                type: type
            }))
        } else {
            dispatch(addTransaction({
                amount: value,
                categoryId: category as string,
                type: type
            }))
        }



        switch (type) {
            case transferTypes.income:
                dispatch(incrementIncome(value))
                break;

            case transferTypes.outcome:
                dispatch(incrementSpent(value))
                break;

            default:
                break;
        }

        close();
    };

    function remove() {
        dispatch(removeTransaction(transaction?.id as string))
        !!onClose && onClose();
    };

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

    console.log(transaction?.id);
    console.log(transaction);


    const categories = type === transferTypes.income ? income : outcome;

    return <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)}>
        <div>
            <div>
                <input
                    id="TransferInput-input-value"
                    placeholder="enter value"
                    type="number"
                    onInput={(e) => setValue(parseInt(e.currentTarget.value))}
                    defaultValue={value}
                    autoFocus />
            </div>

            <div>
                <CategoryList selected={category} categories={categories} onClick={(cat) => setCategory(cat.id as string)} />
            </div>
        </div>
        <div>
            <div>
                <button onClick={() => increment()}>ok</button>
                {!!transaction?.id && <button onClick={() => remove()}>delete</button>}
                <button onClick={() => close()}>cancel</button>
            </div>
        </div>
    </div>
}