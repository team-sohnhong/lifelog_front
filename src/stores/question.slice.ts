//Redux Ducks pattern
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import questionService from "../services/question.service";
import { Question } from "../domain/type/questionInteface";

//action
export const add = createAction("question/ADD");

//async action
export const getAllQuestions = createAsyncThunk(
  "question/GET_QUESTIONS",
  thunkAPI => {
    //try catch 여기로 옮겨야 한다.
    return questionService.getQuestions();
  }
);

//async action
export const getOneQuestion = createAsyncThunk(
  "question/GET_QUESTION",
  (questionId: string, thunkAPI) => {
    return questionService.getQuestion(questionId);
  }
);

//async action
export const closeQuestionAction = createAsyncThunk(
  "question/CLOSE",
  (questionId: string, thunkAPI) => {
    return questionService.closeQuestion(questionId);
  }
);

const initialState = {
  questions: [] as Question[],
  loading: false,
  error: "",
};
// reducer
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      state.questions.push(action.payload);
    },
  },
  extraReducers: {
    [getAllQuestions.pending.type]: state => {
      state.questions = [];
      console.log("🚀 질문 목록 로딩 중", state.questions);
      state.loading = true;
      state.error = "";
    },
    [getAllQuestions.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 질문 목록 받았음", state.questions);
      state.questions = action.payload ?? [];
      state.loading = false;
      state.error = "";
    },
    [getAllQuestions.rejected.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 질문 목록 에러", state.questions);
      state.questions = [];
      state.loading = false;
      state.error = action.payload;
    },
    [getOneQuestion.pending.type]: state => {
      console.log("🚀 질문 one 로딩 중", state.questions);
      state.loading = true;
      state.error = "";
    },
    [getOneQuestion.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 질문 one 받아짐", action.payload);

      const isExist = state.questions.includes(action.payload);
      if (!isExist) {
        state.questions.push(action.payload);
      }
      state.loading = false;
      state.error = "";
    },
    [getOneQuestion.rejected.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 질문 one 에러", state.questions);

      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default questionSlice.reducer;
