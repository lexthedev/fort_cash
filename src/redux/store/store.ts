import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import balanceReduser from "../reducers/balanceReducer"

const rootReducer = combineReducers({
  balanceReduser,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];