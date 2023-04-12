import { ICategory } from "@/components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayload } from "../models/localStorePayload";
import { LocalStoreService } from "../services/localStoreService";

interface CategoryState {
    categories: {
        income: ICategory[],
        outcome: ICategory[]
    }
}

const initialState: CategoryState = {
    categories: {
        income: [],
        outcome: []
    }
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        createCategory(state, action: PayloadAction<ICategory>) {
            const { type } = action.payload;
            // const newId = String(state.categories[type].length);
            const categories = state.categories[type];
            const catLength = categories.length;
            const newId = String(categories[catLength - 1]);
            const newCategory = { ...action.payload, id: newId };
            const newCategories = { ...state.categories };
            newCategories[type].push(newCategory);

            const savePayload: IPayload = {
                name: 'categories',
                data: newCategories
            }

            state.categories = {
                ...state.categories,
                ...newCategories
            }

            LocalStoreService.SaveToStore(savePayload)
        }, updateCategory(state, action: PayloadAction<ICategory>) {
            const { type, id } = action.payload;
            const newCategories = { ...state.categories }
            const newCategoriesOfType = newCategories[type].map((cat) => {
                return cat.id === id ? action.payload : cat;
            });
            newCategories[type] = newCategoriesOfType;

            const savePayload: IPayload = {
                name: 'categories',
                data: newCategories
            }

            state.categories = {
                ...state.categories,
                ...newCategories
            }

            LocalStoreService.SaveToStore(savePayload)
        }, deleteCategory(state, action: PayloadAction<ICategory>) {
            const { type, id } = action.payload;
            const newCategories = { ...state.categories }
            const newCategoriesOfType = newCategories[type].filter((cat) => cat.id !== id);
            newCategories[type] = newCategoriesOfType;
            // const newCategories = state.categories[type].map((cat) => {
            //     if (cat.id !== id) return cat;
            // });

            const savePayload: IPayload = {
                name: 'categories',
                data: newCategories
            }

            state.categories = {
                ...state.categories,
                ...newCategories
            }

            LocalStoreService.SaveToStore(savePayload)
        },
        setCategories(state, action: PayloadAction<CategoryState>) {
            state.categories = {
                ...state.categories,
                ...action.payload
            }
        }
    }
})

export default categorySlice.reducer;