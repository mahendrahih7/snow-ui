import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { get_inventory_summery} from "../../../constants/Api/Api";
// import { Bounce, toast } from "react-toastify";
import swal from "sweetalert";
import { act } from "react";
// import { Bounce, toast } from "react-toastify";



const initialState = {
  loading: false,
  error: null,
  inventory: []
  
};


//GET INVENTORY DETAILS
export const inventoryDetail = createAsyncThunk("inventoryDetail", async() =>{
   try{
    const resForInventory = await axios.get(get_inventory_summery, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(resForInventory, 'resForInventory')
    return resForInventory.data.data
   }catch(error){
    console.log(error)
   }
})





const sellerInventorySlice = createSlice({
  name: "sellerInventory",
  initialState,

 
  extraReducers: (builder) => {
    builder

//GET INVENTORY DETAILS
      .addCase(inventoryDetail.pending, (state) =>{
        state.loading = true
  })
      .addCase(inventoryDetail.fulfilled, (state, action) => {
          state.loading = false
          state.inventory = action.payload
  })
      .addCase(inventoryDetail.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })
  },
});


export default sellerInventorySlice.reducer;



