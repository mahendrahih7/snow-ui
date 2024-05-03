import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Seller_Send_otp, Seller_forgot_password, Seller_login, Seller_reset_password, Seller_update_password } from "../../../constants/Api/Api";
import swal from "sweetalert";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const initialState = {
  loading: false,
  // seller: null,
  error: null,
  otpStatus: false,
  withOtp : false,
  resetPassword: false
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
    } catch (error) {
        toast.error(error.response.data.message, {
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
      return rejectWithValue(err);
    }
  }
);

export const sellerLoginWithOtp = createAsyncThunk("loginWithOtp", async(Credentials, {rejectWithValue}) => {
  try {
    const loginWithOtp = await axios.post(Seller_login, Credentials, { withCredentials: true })
    console.log(loginWithOtp.data.message, 'loginWithOtp')
    swal("Done!", loginWithOtp.data.message, "success");
    return loginWithOtp.data
  } catch(err) {
    console.log(err, 'err')
    swal("Error!", err.response.data.message, "error");
    return rejectWithValue(err)
  }
})

//For update password
export const sellerUpdatePassword = createAsyncThunk("sellerUpdatePassword", async(passwordDetail, {rejectWithValue}) =>{
  try {
    // const config = {withCredentials: true}
    const updatePass = await axios.put(Seller_update_password, passwordDetail, { withCredentials: true })
    console.log(updatePass.data.message, 'updatePass')
    toast.success(updatePass.data.message, {
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
    return updatePass.data
  }catch(error) {
    console.log(error, 'updatePassErr')
    toast.error(error.response.data.message, {
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
    return rejectWithValue(err)
  }
})

//For forgot password
export const sellerForgotPassword = createAsyncThunk("sellerForgotPassword", async(email, {rejectWithValue} ) =>{
  try {
    const forgotPassword = await axios.post(Seller_forgot_password, {email: email})
    console.log(forgotPassword, 'forgotPassword')
    toast.success(forgotPassword.data.message, {
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
  }catch(error) {
    return rejectWithValue(error)
  }

})

//For reset password
export const SellerResetPassword = createAsyncThunk("SellerResetPassword", async(passData, {rejectWithValue}) =>{
  try {
    const resetPassword = await axios.put(`${Seller_reset_password}/${passData.token}`, {password: passData.newPassword})
    console.log(resetPassword)
    toast.success(resetPassword.data.message, {
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
  }catch(error) {
     toast.error(error.response.data.message, {
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
return rejectWithValue(error)
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
        state.loading = false,
        state.error = action.payload
  })
      
      //Seller login with email, password and OTP
      .addCase(sellerLoginWithOtp.pending, (state) =>{
        state.loading = true;
      })
      .addCase(sellerLoginWithOtp.fulfilled, (state) =>{
        state.loading = false,
        // state.otpStatus = false
        state.withOtp = true
      
      })
      .addCase(sellerLoginWithOtp.rejected, (state) => {
        // console.log(action.payload, 'rejected'),
        state.loading = false
        // state.error = action.payload
  })

      //For seller update password
      .addCase(sellerUpdatePassword.pending, (state) =>{
        state.loading = true;
      })
      .addCase(sellerUpdatePassword.fulfilled, (state) =>{
        state.loading = false
      })
      .addCase(sellerUpdatePassword.rejected, (state) => (
        state.loading = false
      ))

      //For seler reset password
       .addCase(SellerResetPassword.pending, (state) =>{
        state.loading = true;
      })
      .addCase(SellerResetPassword.fulfilled, (state) =>{
        state.loading = false
        state.resetPassword = true
      })
      .addCase(SellerResetPassword.rejected, (state) => (
        state.loading = true
      ))
  },
});
export default sellerLoginSlice.reducer;
