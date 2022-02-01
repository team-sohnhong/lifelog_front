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

const initialQuestions = defaultQuestion;
// reducer
const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [] as any[],
    loading: false,
    error: "",
  },
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      state.questions.push(action.payload);
    },
  },
  extraReducers: {
    [getQuestions.pending.type]: state => {
      state.questions = [];
      state.loading = true;
      state.error = "";
    },
    [getQuestions.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.questions = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getQuestions.rejected.type]: (state, action: PayloadAction<any>) => {
      state.questions = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default questionSlice.reducer;
