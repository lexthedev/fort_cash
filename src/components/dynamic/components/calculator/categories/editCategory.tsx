import { ICategory, ICategoryCreateForm, PopUpAction } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { useAppDispatch } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import React from "react";
import { ChangeEvent, useState } from "react";
import CategoryIconSelector from "./categoryIconSelector";

export function EditCategory(props: ICategoryCreateForm) {

    const { onClose, editingCategory } = props;
    const [category, setCategory] = useState<ICategory>(
        {
            id: editingCategory?.id as string,
            title: editingCategory?.title as string,
            type: editingCategory?.type as transferTypes,
            picture: editingCategory?.picture as string
        });
    const { updateCategory, deleteCategory } = categorySlice.actions;
    const dispatch = useAppDispatch();

    function updateCurrentCategory(event?: MouseEvent) {
        event?.preventDefault();
        const { title, type, picture } = category;
        if (!!title && !!type && !!picture) {
            dispatch(updateCategory(category));
            onClose();
        } else {
            alert(`Need to select:${!title ? ' title' : ''}${!type ? ' type' : ''}${!picture ? ' picture' : ''}`)
        }
    }

    function deleteCurrentCategory(event?: MouseEvent) {
        event?.preventDefault();
        dispatch(deleteCategory(category));
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
                dispatch(updateCategory(category));
                onClose();
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
                <input defaultValue={editingCategory?.title} type="text" name="title" onChange={(e) => handleInput(e)} />
            </label>
        </div>
        <div>
            <label>
                enter type:&nbsp;
                <select
                    name="type"
                    defaultValue={editingCategory ? editingCategory?.type : '-'}
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
        </div>
        <CategoryIconSelector onSelect={handleSelectIcon} selected={category.picture} />
        <PopUpAction
            onSubmit={(e) => updateCurrentCategory(e)}
            onDelete={(e) => deleteCurrentCategory(e)}
            onCancel={() => onClose()} />
    </div>
}