import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Seller_products} from "../../../constants/Api/Api";
// import swal from "sweetalert";
// import { Bounce, toast } from "react-toastify";



const initialState = {
  loading: false,
  products: [],
  error: null
};



export const allProducts = createAsyncThunk("allProducts", async() => {
    try {
      //console.log(userData, "userData")
      const products = await axios.get(Seller_products, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      console.log(products.data, 'products')
      return products.data;
    } catch (error) {
      console.log(error, 'error')
      return rejectWithValue(error);
    }
  }
);

const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState,
 
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state) =>{
        state.loading = true
  })
      .addCase(allProducts.fulfilled, (state, action) => {
        // console.log('fullfilled'),
        // console.log(action.payload, 'fullFilled'),
          state.loading = false
          state.products = action.payload
  })
      .addCase(allProducts.rejected, (state, action) => {
        // console.log(action.payload, 'rejected'),
        // state.loading = false
        state.error = action.payload
  })
  },
});


export default sellerProductSlice.reducer;



