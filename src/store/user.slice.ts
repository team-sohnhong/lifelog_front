import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "service/auth.service";

const initialUser = {
  loading: false,
  data: { address: "", created_at: "", _v: 0, _id: "" },
  error: null,
};

const increment = createAction("user/INCREMENT");

export const fetchUser = createAsyncThunk(
  "users/FETCH_USER",
  async (address: string) => {
    return authService.login(address);
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: "",
  },
  reducers: {
    //동기 작업
    increment: (state) => {
      state.user = {}
    },
  },
  extraReducers: {
    // 비동기 작업
    [fetchUser.pending.type]: state => {
      state.loading = true;
      state.user = [];
      state.error = "";
    },
    [fetchUser.fulfilled.type]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;

///

// const userReducer = (state = initialUser, action: any) => {
//   switch (action.type) {
//     case "signIn":
//       // state = action.payload; //이렇게 하는 게 아닌가??? 왜 객체를 반환하지? state에 그냥 안 넣고?
//       console.log(state, "user info is stored");
//       return {...state, user: action.payload};

//     case "signOut":
//       state = initialUser;
//       console.log(state, "user info is deleted");
//       return state;

//     default:
//       return state;
//   }
// };

// export default userReducer;

// --------------------------------
