import { ICategory, ICategoryCreateForm, PopUpAction } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { useAppDispatch } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import { ChangeEvent, useState } from "react";

export function CreateCategory(props: ICategoryCreateForm) {

    const { onClose, creatingCategory } = props;
    const [category, setCategory] = useState<ICategory>(
        {
            title: '',
            type: creatingCategory as transferTypes,
            picture: ''
        });
    const { create } = categorySlice.actions;
    const dispatch = useAppDispatch();

    function createCategory(event: MouseEvent) {
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

    return <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)} >
        <div>
            <label>
                enter name:
                <input type="text" name="title" onChange={(e) => handleInput(e)} />
            </label>
        </div>
        {!creatingCategory && <div>
            <label>
                enter type:
                <select
                    name="type"
                    defaultValue={creatingCategory ? creatingCategory : '-'}
                    onChange={(e) => handleInput(e)}
                >
                    <option value="-" disabled>-</option>
                    {Object.keys(transferTypes).map(key => (
                        <option key={key} value={key}>
                            {transferTypes[key as transferTypes]}
                        </option>
                    ))}
                </select>
            </label>
        </div>}
        <PopUpAction
            onSubmit={(e) => createCategory(e)}
            onCancel={() => onClose()} />
    </div>
}