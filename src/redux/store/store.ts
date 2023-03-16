import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import balanceReduser from "../reducers/balanceReducer"
import transactionsReducer from "../reducers/transactionsReducer"
import categoryReducer from "../reducers/categoryReducer"

const rootReducer = combineReducers({
  balanceReduser,
  transactionsReducer,
  categoryReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// export const wrapper = createWrapper<AppStore>(setupStore);