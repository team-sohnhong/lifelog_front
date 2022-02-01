import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionReducer from "./question/question";
import userReducer from "./user/user";
const rootReducers = combineReducers({ questionReducer, userReducer });

export const store = configureStore({
  reducer: rootReducers,
  devTools: false,
});

// { question }: { question: QuestionProps }
// const dispatch = useDispatch() // 이것도 나중에 댓글 달 때나 쓰일 듯
// const question: QuestionProps = useSelector(state => state) //
