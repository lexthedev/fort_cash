import { ICategory, ICategoryCreateForm } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { useAppDispatch } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import { ChangeEvent, FormEvent, useState } from "react";

export function CreateCategory(props: ICategoryCreateForm) {

    const {onClose} = props;
    const [category, setCategory] = useState<ICategory>({} as ICategory)
    const { create } = categorySlice.actions;
    const dispatch = useAppDispatch();

    function createCategory(event: FormEvent) {
        event.preventDefault();
        dispatch(create(category));
        onClose();
    }

    function handleInput(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        const field = e.target.name;
        const value = e.target.value;
        setCategory({
            ...category,
            [field]: value
        })

    }

    function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'Enter':
                dispatch(create(category));
                onClose();
                break;

            case 'Escape':
                onClose()
                break;

            default:
                break;
        }
    }

    return <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)}    >
        <form onSubmit={(e) => createCategory(e)}>
            <div>
                <label>
                    enter name:
                    <input type="text" name="title" onChange={(e) => handleInput(e)} />
                </label>
            </div>
            <div>
                <label>
                    enter type:
                    <select name="type" defaultValue={'-'} onChange={(e) => handleInput(e)}>
                        <option value="-" disabled>-</option>
                        {Object.keys(transferTypes).map(key => (
                            <option key={key} value={key}>
                                {transferTypes[key as transferTypes]}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <button type="submit" onClick={(e) => createCategory(e)}>ok</button>
                <button onClick={() => onClose()}>cancel</button>
            </div>
        </form>
    </div>
}