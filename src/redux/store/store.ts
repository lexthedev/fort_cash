import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import balanceReduser from "../reducers/balanceReducer"
import transactionsReducer from "../reducers/transactionReducer"
import categoryReducer from "../reducers/categoryReducer"
import messageReducer from "../reducers/messageReducer"

const rootReducer = combineReducers({
  balanceReduser,
  transactionsReducer,
  categoryReducer,
  messageReducer
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