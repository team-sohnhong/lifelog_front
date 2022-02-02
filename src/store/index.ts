import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionReducer from "./question.slice";
import userReducer from "./user.slice";

const rootReducer = combineReducers({
  question: questionReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export default rootReducer;
