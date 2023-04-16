import { ICategory, ICategoryCreateForm, PopUpAction } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { useAppDispatch } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import React from "react";
import { ChangeEvent, useState } from "react";
import CategoryIconSelector from "./categoryIconSelector";

export function CreateCategory(props: ICategoryCreateForm) {

    const { onClose, creatingCategory } = props;
    const [category, setCategory] = useState<ICategory>(
        {
            title: '',
            type: creatingCategory as transferTypes,
            picture: ''
        });
    const { createCategory } = categorySlice.actions;
    const dispatch = useAppDispatch();

    function createNewCategory(event?: MouseEvent) {
        event?.preventDefault();
        const { title, type, picture } = category;
        if (!!title && !!type && !!picture) {
            dispatch(createCategory(category));
            onClose();
        } else {
            alert(`Need to select:${!title ? ' title' : ''}${!type ? ' type' : ''}${!picture ? ' picture' : ''}`)
        }
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
                createNewCategory();
                break;

            case 'Escape':
                onClose()
                break;

            default:
                break;
        }
    }

    function handleSelectIcon(src: string) {
        setCategory({
            ...category,
            picture: src
        })
    }

    return <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)} >
        <div>
            <label>
                enter name:&nbsp;
                <input type="text" name="title" onChange={(e) => handleInput(e)} />
            </label>
        </div>
        {!creatingCategory && <div>
            <label>
                enter type:&nbsp;
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
        <CategoryIconSelector onSelect={handleSelectIcon} selected={category.picture} />
        <PopUpAction
            onSubmit={(e) => createNewCategory(e)}
            onCancel={() => onClose()} />
    </div>
}