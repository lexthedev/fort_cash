import { ICategory, ICategoryCreateForm, PopUpAction } from "@/components";
import { transferTypes } from "@/constants/transferTypes";
import { messageSlice, useAppDispatch } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import React from "react";
import { ChangeEvent, useState } from "react";
import CategoryIconSelector from "./categoryIconSelector";

export function EditCategory(props: ICategoryCreateForm) {

    const { onClose, category, type } = props;
    const [editingCategory, setEditingCategory] = useState<ICategory>(
        {
            id: category?.id as string,
            title: category?.title as string,
            type: category?.type as transferTypes || type,
            picture: category?.picture as string
        });
    const { createCategory, updateCategory, deleteCategory } = categorySlice.actions;
    const { addMessage } = messageSlice.actions;
    const dispatch = useAppDispatch();

    function close() {
        !!onClose && onClose();
    }

    function save(event?: MouseEvent) {
        event?.preventDefault();
        const { title, type, picture } = editingCategory;

        if (!title) {
            dispatch(addMessage({
                header: 'category error',
                text: 'you have to enter title',
                type: 'error'
            }))
            return;
        }
        if (!type) {
            dispatch(addMessage({
                header: 'category error',
                text: 'you have to enter type',
                type: 'error'
            }))
            return;
        }
        if (!picture) {
            dispatch(addMessage({
                header: 'category error',
                text: 'you have to enter picture',
                type: 'error'
            }))
            return;
        }

        if (category) {
            console.log(editingCategory);

            dispatch(updateCategory(editingCategory));
        } else {
            dispatch(createCategory(editingCategory));
        }
        close();
    }

    function remove(event?: MouseEvent) {
        event?.preventDefault();
        dispatch(deleteCategory(editingCategory));
        close();
    }

    function handleInput(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        const field = e.target.name;
        const value = e.target.value;
        setEditingCategory({
            ...editingCategory,
            [field]: value
        })

    }

    function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'Enter':
                save()
                break;

            case 'Escape':
                close()
                break;

            default:
                break;
        }
    }

    function handleSelectIcon(src: string) {
        setEditingCategory({
            ...editingCategory,
            picture: src
        })
    }

    return <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)} >
        <div>
            <label>
                enter name:&nbsp;
                <input defaultValue={category?.title} type="text" name="title" onChange={(e) => handleInput(e)} autoFocus />
            </label>
        </div>
        {!type && !category && <div>
            <label>
                enter type:&nbsp;
                <select
                    name="type"
                    defaultValue={'-'}
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
        <CategoryIconSelector onSelect={handleSelectIcon} selected={editingCategory.picture} />
        <PopUpAction
            onSubmit={(e) => save(e)}
            onDelete={category ? (e) => remove(e) : undefined}
            onCancel={() => close()} />
    </div>
}