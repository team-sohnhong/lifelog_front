import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionReducer from "./question.slice";
import userReducer from "./user.slice";

const rootReducer = combineReducers({ questionReducer, userReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});

// const question: QuestionProps = useSelector(state => state) //
