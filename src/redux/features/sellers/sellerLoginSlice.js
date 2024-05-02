import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Seller_Send_otp, Seller_login } from "../../../constants/Api/Api";
import swal from "sweetalert";
import { Bounce, toast } from "react-toastify";


const initialState = {
  loading: false,
  // seller: null,
  error: null,
  otpStatus: false,
  // isAuthenticated: false,
  // token: ""
};

export const loginSeller = createAsyncThunk("loginSeller", async (userData, { rejectWithValue }) => {
    try {
      //console.log(userData, "userData")
      const sendOtp = await axios.post(Seller_Send_otp, userData);
      console.log(sendOtp, "sendOtp")
       toast.success(sendOtp.data.message, {
        className: "toast-message",
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: 'dark',
        transition: Bounce
      });
      return sendOtp.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const sellerLoginWithOtp = createAsyncThunk("loginWithOtp", async(Credentials, {rejectWithValue}) => {
  try {
    const loginWithOtp = await axios.post(Seller_login, Credentials)
    console.log(loginWithOtp.data.message, 'loginWithOtp')
    swal("Done!", loginWithOtp.data.message, "success");
    return loginWithOtp.data
  } catch(err) {
    console.log(err, 'err')
    return rejectWithValue(err)
  }
})

const sellerLoginSlice = createSlice({
  name: "loginSeller",
  initialState,
  extraReducers: (builder) => {
    builder
    //Seller login with email and password
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        console.log('fullfilled'),
        console.log(action.payload, 'fullFilled'),
          state.loading = false,
          state.error = null,
          state.otpStatus = true
      })
      .addCase(loginSeller.rejected, (state, action) => {
        console.log(action.payload, 'rejected'),
        state.loading = true,
        state.error = action.payload
  })
      
      //Seller login with email, password and OTP
      .addCase(sellerLoginWithOtp.pending, (state) =>{
        state.loading = true;
      })
      .addCase(sellerLoginWithOtp.fulfilled, (state) =>{
        state.loading = false,
        state.otpStatus = false
      })
      .addCase(sellerLoginWithOtp.rejected, (state) => (
        // console.log(action.payload, 'rejected'),
        state.loading = true
        // state.error = action.payload
      ))
  },
});
export default sellerLoginSlice.reducer;
