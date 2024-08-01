import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  add_bill, add_supplier, create_purchase_order, get_suppliers, get_warehouse, getAllPO, purchase_order_detail, update_status} from "../../../constants/Api/Api";
// import { Bounce, toast } from "react-toastify";
import swal from "sweetalert";
import { ErrorRounded } from "@mui/icons-material";
import { Bounce, toast } from "react-toastify";
// import { Bounce, toast } from "react-toastify";



const initialState = {
  loading: false,
  error: null,
  suppliers: [],
  warehouse: [],
  POList: [],
  purchaseOrderDetail: {}
};


//ADD SUPPLIER
export const addSupplierInfo = createAsyncThunk("addSupplier", async(info, {dispatch}) => {
    try {
    const supplierInfoAdded = await axios.post(add_supplier, info,  {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(supplierInfoAdded, 'supplierInfoAdded')
    swal("Done!", supplierInfoAdded.data.message, "success");
    dispatch(allSuppliers())
    } catch (error) {
      console.log(error, 'error')
    }
  }
);

//GET SUPPLIER LIST
export const allSuppliers = createAsyncThunk("allSuppliers", async() =>{
    try{
        const suppliersList = await axios.get(get_suppliers, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            
        })
        console.log(suppliersList, 'suppliersList')
        return suppliersList.data.data
    }catch(error){
        console.log(error)
    }
})

//UPDATE STATUS
export const updateStatus = createAsyncThunk("updateStatus", async(data, {dispatch}) =>{
  console.log(data, 'data')
  try{
    const resStatus = await axios.put(`${update_status}/${data.id}`, {isActive: !data.statusActive}, {
       headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
       params: {
        process: "status"
       }
    })
    console.log(resStatus, 'resStatus')
    dispatch(allSuppliers())
  }catch(error){
    console.log(error)
  }
})

//CREATE PURCHASE ORDER
export const createPurchaseOrder = createAsyncThunk("createPurchaseOrder", async(po, {dispatch}) =>{
  try {
    const resForPo = await axios.post(create_purchase_order, po, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(resForPo, 'resForPo') 
    swal("Done!", resForPo.data.message, "success");
    dispatch(allPurchaseOrder())
  }catch(error){
    toast.error(error.response.data.message, {
        className: "toast-message",
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      });
    console.log(error, 'error1234')
  }
})

//GET ALL PURCHASE ORDERS
export const allPurchaseOrder = createAsyncThunk("allPurchaseOrder", async()=>{
  try{
    const resPO = await axios.get(getAllPO, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(resPO, 'resPOForAllPurchaseOrder')
    return resPO.data.data

  }catch(error){
    console.log(error)
  }
})

//GET PURCHASE ORDER DETAIL
export const POdetail = createAsyncThunk("POdetail", async(POId) =>{
  try{
    const resPOdetail = await axios.get(`${purchase_order_detail}/${POId}`, {
       headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(resPOdetail, 'resPOdetail')
    return resPOdetail.data.data

  }catch(error){
    console.log(error)
  }
})

//FOR ADD BILL
export const addBill = createAsyncThunk("addBill", async(dataForBill) =>{
  try{
    const resForAddBill = await axios.post(add_bill, dataForBill,{
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(resForAddBill, 'resForAddBill')
    swal("Done!", resForAddBill.data.message, "success");

  }catch(error){
    toast.error(error.response.data.message, {
        className: "toast-message",
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      });
    console.log(error, 'errorAddBill')

  }
})


const sellerPurchaseSlice = createSlice({
  name: "sellerPurchase",
  initialState,

  
 
  extraReducers: (builder) => {
    builder
    //ADD SUPPLIER
      .addCase(addSupplierInfo.pending, (state) =>{
        state.loading = true
  })
      .addCase(addSupplierInfo.fulfilled, (state) => {
          state.loading = false
  })
      .addCase(addSupplierInfo.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })

  //GET SUPPLIER
     .addCase(allSuppliers.pending, (state) =>{
        state.loading = true
  })
      .addCase(allSuppliers.fulfilled, (state, action) => {
          state.loading = false
          state.suppliers = action.payload
  })
      .addCase(allSuppliers.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })

  //GET ALL PURCHASE ORDER
     .addCase(allPurchaseOrder.pending, (state) =>{
        state.loading = true
  })
      .addCase(allPurchaseOrder.fulfilled, (state, action) => {
          state.loading = false
          state.POList = action.payload
  })
      .addCase(allPurchaseOrder.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })

  //PURCHASE ORDER DETAIL
       .addCase(POdetail.pending, (state) =>{
        state.loading = true
  })
      .addCase(POdetail.fulfilled, (state, action) => {
          state.loading = false
          state.purchaseOrderDetail = action.payload
  })
      .addCase(POdetail.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })


  
  },
});


export default sellerPurchaseSlice.reducer;



