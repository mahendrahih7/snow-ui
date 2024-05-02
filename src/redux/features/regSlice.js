import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Reg_url } from "../../constants/Api/Api";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const signUpUser = createAsyncThunk("signUp", async (userData) => {
  try {
    //console.log(userData, "userData")
    const regData = await axios.post(Reg_url, userData);
    //console.log(regData, "regdata")
    return regData.data;
  } catch (err) {
    //console.log(err)
    throw new Error(err);
  }
});

const regSlice = createSlice({
  name: "regUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => (
        state.loading = false,
        state.user = action.payload.user
      ))
      .addCase(signUpUser.rejected, (state, action) => (
        state.loading = false ,
        state.error = action.payload.message
));
  },
  // extraReducers: {
  //     [signUpUser.pending]: (state, action) => {
  //         state.loading = true
  //     },
  //     [signUpUser.fulfilled]: (state, action) => {
  //         //console.log(action, "payload")
  //         state.loading = false,
  //             state.user = action.payload.user
  //     },
  //     [signUpUser.rejected]: (state, action) => {
  //         state.loading = false,
  //             state.error = action.payload.message
  //     }
  // }
});
export default regSlice.reducer;
