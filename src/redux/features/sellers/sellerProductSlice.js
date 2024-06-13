import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Seller_product_category, Seller_products, all_brand, productInfo} from "../../../constants/Api/Api";
// import swal from "sweetalert";
// import { Bounce, toast } from "react-toastify";



const initialState = {
  loading: false,
  products: [],
  error: null,
  category: [],
  subCategory: [],
  childCategory: [],
  brand: [],
  productId: ''
};


//GET ALL PRODUCT
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

//FOR PRODUCT CATEGORY & SUB CATEGORY
export const productCategory = createAsyncThunk("productCategory", async(catName) => {
  console.log(catName, 'catName')
  try {
    const categoryList = await axios.get(Seller_product_category, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(categoryList, 'categoryList')
    return {catArr: categoryList.data, name: catName}

  } catch(error) {
    console.log(error, 'error')
  }
})

//FOR PRODUCT CHILD CATEGORY
export const productChildCat = createAsyncThunk("childCategory", async(nameOfCat, {dispatch}) =>{
  try{
    console.log(nameOfCat, 'nameOfCat')
    dispatch(productCategory(nameOfCat.catName))
    return nameOfCat.subCatName
  }catch(error){
    console.log(error, 'error')
  }
})

// FOR BRAND
export const allBrand = createAsyncThunk("allBrand", async() =>{
  try{
    const brands = await axios.get(all_brand, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(brands, 'brands')
    return brands.data

  }catch(error){
    console.log(error, 'error')

  }
})

//FOR SUBMIT PRODUCT INFO PAGE
export const productInformation = createAsyncThunk("productInformation", async(productData) =>{
  try{
    const resOfProductInfo = await axios.post(productInfo, productData, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: {
          process: "productInfo",
        },
    })
    console.log(resOfProductInfo.data, 'resOfProductInfo')
    return resOfProductInfo.data

  }catch(error){
    console.log(error)

  }
})

//FOR SUBMIT PRICE VARIANT PAGE
export const priceVarInfo = createAsyncThunk("priceVarInfo", async(priceInfo) =>{
  console.log(priceInfo, 'priceInfo')
  try{
    // const varients = priceInfo.allPriceVar
    const resOfPriceVar = await axios.post(productInfo, priceInfo.priceVariant, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: {
          process: "variants",
          productId: priceInfo.productId
        },
    })
    console.log(resOfPriceVar.data, 'resOfPriceVar')

  }catch(error){
    console.log(error)
  }
})


const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState,
 
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state) =>{
        state.loading = true
  })
      .addCase(allProducts.fulfilled, (state, action) => {
          state.loading = false
          state.products = action.payload
  })
      .addCase(allProducts.rejected, (state, action) => {
       state.loading = false
        state.error = action.payload
  })

  //CATEGORY & SUB CATEGORY
  .addCase(productCategory.pending, (state) =>{
    state.loading = true
  })
  .addCase(productCategory.fulfilled, (state, action) =>{
    console.log(action.payload, 'lkl')
    state.loading = false
    state.category = action.payload?.catArr
    const singleCat = action.payload.catArr.filter((c) => c.name === action.payload.name)
    console.log(singleCat, 'singleCat')
    state.subCategory = singleCat[0]?.subCategory
  })
  .addCase(productCategory.rejected, (state) =>{
    state.loading = false
     state.error = action.payload
  })

  //CHILD CATEGORY
    .addCase(productChildCat.pending, (state) =>{
        state.loading = true
  })
      .addCase(productChildCat.fulfilled, (state, action) => {
          state.loading = false
          console.log(action.payload, '888')
          const singleSubCat = state.subCategory.filter((subCat) => subCat.subCategoryName === action.payload)
          state.childCategory = singleSubCat[0].childCategory
  })
      .addCase(productChildCat.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })

  //ALL BRANDS
      .addCase(allBrand.pending, (state) =>{
        state.loading = true
  })
      .addCase(allBrand.fulfilled, (state, action) => {
          state.loading = false
          console.log(action.payload, '777')
          state.brand = action.payload
  })
      .addCase(allBrand.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })

  //PRODUCT INFO PAGE
       .addCase(productInformation.pending, (state) =>{
        state.loading = true
  })
      .addCase(productInformation.fulfilled, (state, action) => {
          state.loading = false
          state.productId = action.payload.Product
  })
      .addCase(productInformation.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })

  },
});


export default sellerProductSlice.reducer;



