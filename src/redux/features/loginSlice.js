import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Login_url } from "../../constants/Api/Api";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticatd: false,
  //token: ""
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      //console.log(userData, "userData")
      const loginData = await axios.post(Login_url, userData);
      //console.log(loginData, "logdata")
      localStorage.setItem("token", loginData.data.token);
      return loginData.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => (
        state.loading = false,
          state.user = action.payload.user,
          state.isAuthenticatd = true,
          state.error = null
        //state.token = action.payload.user.token,
        // if (localStorage.getItem('token')) {
        //     state.isAuthenticatd = true
        // }
      ))
      .addCase(loginUser.rejected, (state, action) => (
        state.loading = false,
          state.error = action.payload.message,
          state.user = null
      ));
  },
});
export default loginSlice.reducer;
