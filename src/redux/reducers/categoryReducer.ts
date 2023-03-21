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
            state.categories[type].push(action.payload);

            const savePayload: IPayload = {
                name: 'categories',
                data: state.categories
            }

            LocalStoreService.SaveToStore(savePayload)
        },
        setCategories(state, action: PayloadAction<CategoryState>) {
            state.categories = {
                ...state.categories,
                ...action.payload
            }

            console.log('new state', state.categories);

        }
    }
})

export default categorySlice.reducer;