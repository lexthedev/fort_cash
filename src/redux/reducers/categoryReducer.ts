import { ICategory } from "@/components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        create(state, action: PayloadAction<ICategory>) {
            const { type } = action.payload;
            state.categories[type].push(action.payload);
        },
        // incrementSpent(state, action: PayloadAction<number>) {
        //     state.wallet.spent += action.payload;
        // },
        // setBalance(state, action: PayloadAction<IWalletState>) {
        //     state.wallet = action.payload;
        // }
    }
})

export default categorySlice.reducer;