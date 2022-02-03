//Redux Ducks pattern
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { defaultQuestion } from "../domain/type/questionInteface";
import questionService from "./../service/question.service";

//action
export const add = createAction("question/ADD");

//async action
export const getQuestions = createAsyncThunk("question/GET_QUESTION", () => {
  return questionService.getQuestions();
});

const initialState = {
  questions: [defaultQuestion],
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
    [getQuestions.pending.type]: state => {
      state.questions = [defaultQuestion];
      state.loading = true;
      state.error = "";
    },
    [getQuestions.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.questions = action.payload ?? [defaultQuestion];
      state.loading = false;
      state.error = "";
    },
    [getQuestions.rejected.type]: (state, action: PayloadAction<any>) => {
      state.questions = [defaultQuestion];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default questionSlice.reducer;
