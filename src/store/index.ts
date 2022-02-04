import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionReducer from "./question.slice";
import userReducer from "./user.slice";
import answerReducer from "./answer.slice";

const rootReducer = combineReducers({
  question: questionReducer,
  user: userReducer,
  answer: answerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export default rootReducer;
