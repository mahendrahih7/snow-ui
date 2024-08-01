import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  add_supplier, add_warehouse, get_suppliers, get_warehouse, update_status} from "../../../constants/Api/Api";
// import { Bounce, toast } from "react-toastify";
import swal from "sweetalert";
import { act } from "react";
// import { Bounce, toast } from "react-toastify";



const initialState = {
  loading: false,
  error: null,
  warehouseDetail: []
  
};


//ADD WAREHOUSE
export const addWarehouse = createAsyncThunk("addWarehouse", async(info) => {
    try {
    const resAddWarehouse = await axios.post(add_warehouse, info,  {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(resAddWarehouse, 'resAddWarehouse')
    swal("Done!", resAddWarehouse.data.message, "success");
    // dispatch(allSuppliers())
    } catch (error) {
      console.log(error, 'error')
    }
  }
);

//GET WAREHOUSE LIST
export const allWarehouse = createAsyncThunk("allWarehouse", async() =>{
    try{
        const resAllWarehouse = await axios.get(get_warehouse, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            
        })
        console.log(resAllWarehouse, 'resAllWarehouse')
        return resAllWarehouse.data.data
    }catch(error){
        console.log(error)
    }
})



const sellerWarehouseSlice = createSlice({
  name: "sellerWarehouse",
  initialState,

 
  extraReducers: (builder) => {
    builder

//ADD WAREHOUSE
      .addCase(addWarehouse.pending, (state) =>{
        state.loading = true
  })
      .addCase(addWarehouse.fulfilled, (state) => {
          state.loading = false
  })
      .addCase(addWarehouse.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })

//WAREHOUSE LIST
      .addCase(allWarehouse.pending, (state) =>{
        state.loading = true
  })
      .addCase(allWarehouse.fulfilled, (state, action) => {
          state.loading = false
          state.warehouseDetail = action.payload
  })
      .addCase(allWarehouse.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })
  },
});


export default sellerWarehouseSlice.reducer;



