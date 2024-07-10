import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Seller_product_category, Seller_products, all_brand, get_allvariants_data, get_product_image, productInfo, product_description, product_update, seller_prodInfo_update} from "../../../constants/Api/Api";
import { Bounce, toast } from "react-toastify";
// import swal from "sweetalert";
// import { Bounce, toast } from "react-toastify";



const initialState = {
  loading: false,
  error: null,
  products: [],
  productDetail: {},
  category: [],
  subCategory: [],
  childCategory: [],
  brand: [],
  productId: '',
  variantId: '',
  productImages: [],
  allVariant: []
};


//GET ALL PRODUCT
export const allProducts = createAsyncThunk("allProducts", async() => {
    try {
      //console.log(userData, "userData")
      const products = await axios.get(Seller_products, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      console.log(products.data, 'products')
      return products.data.products;
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

  //CATEGORY & SUB CATEGORY FOR UPDATE PAGE
  export const prodCatUpdatePage = createAsyncThunk('prodCatUpdatePage', async(cat_name) =>{
    try{
       const catListUpdatePage = await axios.get(Seller_product_category, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(catListUpdatePage, 'catListUpdatePage')
    return {catArrInUpdatePage: catListUpdatePage.data, catNameInUpdatePage: cat_name}

    }catch(error){
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
    toast.success(resOfProductInfo.data.message, {
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
    return resOfProductInfo.data

  }catch(error){
    console.log(error)

  }
})

//GET ALL VARIANTS DATA
export const allVariants = createAsyncThunk("allVariants", async(productId) =>{
  console.log(productId, 'ggh')
  try {
    const resAllVariants = await axios.get(`${get_allvariants_data}/${productId}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token")}
    })
    console.log(resAllVariants, 'resAllVariants')
    return resAllVariants.data.data

  }catch(error){
    console.log(error)
  }
})

//FOR SUBMIT PRICE VARIANT PAGE
export const priceVarInfo = createAsyncThunk("priceVarInfo", async(priceInfo, {dispatch}) =>{
  console.log(priceInfo, 'priceInfo')
  try{
    // const varients = priceInfo.allPriceVar
    const resOfPriceVar = await axios.post(productInfo, priceInfo.info, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type":"multipart/form-data"
         },
        params: {
          process: "variants",
          productId: priceInfo.productId
        },

    })
    console.log(resOfPriceVar.data, 'resOfPriceVar')
    dispatch(allVariants(priceInfo.productId))
    toast.success(resOfPriceVar.data.message, {
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
    return resOfPriceVar.data

  }catch(error){
    console.log(error)
  }
})



//FOR GETTING IMAGES
export const getImages = createAsyncThunk("getImages", async(variantId) =>{
  console.log(variantId, 'variantId')
  try {
    const resForGettingImage = await axios.get(`${get_product_image}/${variantId}`, {
         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    console.log(resForGettingImage, 'resForGettingImage')
    return resForGettingImage.data.data

  }catch(error) {
    console.log(error)
  }
})

//FOR SAVE IMAGES IN PRODUCT INFO
export const saveDataWithImage = createAsyncThunk("saveDataWithImage", async(data, {dispatch}) =>{
  console.log(data, 'data')
  try {
    const resOfDataWithImage = await axios.post(productInfo, data.finalData, {
       headers: { Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type":"multipart/form-data"
         },
        params: {
          process: "imageUpload",
          variantId: data.variantId 
        },
    })
    console.log(resOfDataWithImage, 'resOfDataWithImage')
    dispatch(getImages(data.variantId ))

  }catch(error) {
    console.log(error)
  }
})

// GET SINGLE PRODUCT DETAIL
export const singleProductDetail = createAsyncThunk("singleProductDetail", async(productId, {dispatch}) =>{
  try {
    const resProductDetail = await axios.get(`${Seller_products}/${productId}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    console.log(resProductDetail.data.data, 'resProductDetail')
    dispatch(productCategory(resProductDetail.data.data.productInfo.category.name))
    setTimeout(() => {
      dispatch(productChildCat({catName : resProductDetail.data.data?.productInfo?.category?.name, subCatName: resProductDetail.data.data?.productInfo?.subCategory?.name  }))
    }, 400);
    return resProductDetail.data.data

  }catch(error){
    console.log(error)
  }
})

// UPDATE INFO OF A SINGLE PRODUCT
export const updateInfo = createAsyncThunk("updateInfo", async(info) =>{
  console.log(info, '557')
  try {
    const resUpdateInfo = await axios.put(`${seller_prodInfo_update}/${info.id}`, info.productInfoUpdate, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      params: {
        process : "productInfo"
      }
    })
    console.log(resUpdateInfo, 'resUpdateInfo')

  }catch(error) {
    console.log(error)
  }
})

//UPDATE POTENCY SEC OF A SINGLE PRODUCT
export const updatePotency = createAsyncThunk("updatePotency", async(potencyInfo, {dispatch}) =>{
  try{
    const resUpdatePotencyInfo = await axios.put(`${seller_prodInfo_update}/${potencyInfo.prodId}`, potencyInfo, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      params: {
        process : "others"
      }
    })
    console.log(resUpdatePotencyInfo, 'resUpdatePotencyInfo')
  }catch(error){
    console.log(error)
  }
})

//FOR PRODUCT DESCRIPTION
export const productDescription = createAsyncThunk("productDescription", async(desData) =>{
  console.log(desData, 'desData')
  try{
    const resProdDes = await axios.post(product_description, desData, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      params: {
        process: "productDescription",
        productId: desData.productId
      }
    })
    console.log(resProdDes, 'resProdDes')
  }catch(error){
    console.log(error)
  }
})

//FOR THUMBNAIL AND IMAGE PAGE
export const addThumbNail = createAsyncThunk("addThumbNail",  async(dataId, {dispatch}) =>{
  try {
    const resAddThumbNail = await axios.post(productInfo, dataId, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      params: {
        process: "thumbnail",
        variantId: dataId.variantId
      }
    })
    console.log(resAddThumbNail)
    swal("Done!", "Thumbnail selected successfully", "success");
    dispatch(getImages(dataId.variantId))
    // toast.success('Thumbnail selected successfully', {
    //     className: "toast-message",
    //     position: 'top-center',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'dark',
    //     transition: Bounce
    //   });

  }catch(error){
    console.log(error)
  }
})

//FOR DELETE IMAGE
export const deleteImage = createAsyncThunk("deleteImage", async(data, {dispatch}) =>{
  try{
    const resDeleteImage = await axios.put(`${product_update}/${data.productId}`, data,  {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      params: {
        process: "deleteImage",
        variantId: data.variantId
      }
    })
    console.log(resDeleteImage, 'resDeleteImage')
    dispatch(getImages(data.variantId))

  }catch(error){
    console.log(error)
  }
})



const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState,

  reducers: {

    //CHILD CATEGORY FOR UPDATE PAGE
    childCatUpdatePage: (state, action) =>{
      const objOfSubCat = state.subCategory.find((subCatElem) => subCatElem.subCategoryName === action.payload )
      state.childCategory = objOfSubCat?.childCategory
    }

  },
 
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
    const singleCat = action.payload?.catArr?.find((c) => c.name === action.payload?.name)
    // console.log(singleCat, 'singleCat')
    state.subCategory = singleCat?.subCategory
  })
  .addCase(productCategory.rejected, (state) =>{
    state.loading = false
     state.error = action.payload
  })

  //CATEGORY & SUB CATEGORY FOR UPDATE PAGE
   .addCase(prodCatUpdatePage.pending, (state) =>{
    state.loading = true
  })
  .addCase(prodCatUpdatePage.fulfilled, (state, action) =>{
    console.log(action.payload, 'lkl')
    state.loading = false
    state.category = action.payload?.catArrInUpdatePage
    const singleCat = action.payload.catArrInUpdatePage.find((cat) => cat.name === action.payload?.catNameInUpdatePage)
    state.subCategory = singleCat?.subCategory
    state.childCategory = []
  })
  .addCase(prodCatUpdatePage.rejected, (state) =>{
    state.loading = false
     state.error = action.payload
  })

  //CHILD CATEGORY
    .addCase(productChildCat.pending, (state) =>{
        state.loading = true
  })
      .addCase(productChildCat.fulfilled, (state, action) => {
          state.loading = false
          const singleSubCat = state.subCategory?.find((subCat) => subCat?.subCategoryName === action?.payload)
          state.childCategory = singleSubCat?.childCategory
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

  //SUBMIT PRICE VARIANT
        .addCase(priceVarInfo.pending, (state) =>{
        state.loading = true
  })
      .addCase(priceVarInfo.fulfilled, (state, action) => {
          state.loading = false
          state.variantId = action.payload?.variant
  })
      .addCase(priceVarInfo.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })

  //GET ALL VARIANTS
         .addCase(allVariants.pending, (state) =>{
        state.loading = true
  })
      .addCase(allVariants.fulfilled, (state, action) => {
          state.loading = false
          state.allVariant = action.payload
  })
      .addCase(allVariants.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })


  //FOR GETTING IMAGE IN ADD PRODUCT
          .addCase(getImages.pending, (state) =>{
        state.loading = true
        state.productImages= []
  })
      .addCase(getImages.fulfilled, (state, action) => {
          state.loading = false
          state.productImages = action.payload?.productPictures
       
  })
      .addCase(getImages.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })


  // FOR SINGLE PRODUCT DETAIL
      .addCase(singleProductDetail.pending, (state) =>{
        state.loading = true
  })
      .addCase(singleProductDetail.fulfilled, (state, action) => {
          state.loading = false
          state.productDetail = action.payload
  })
      .addCase(singleProductDetail.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })

  // UPDATE INFO OF A SINGLE PRODUCT
      .addCase(updateInfo.pending, (state) =>{
        state.loading = true
  })
      .addCase(updateInfo.fulfilled, (state) => {
          state.loading = false
  })
      .addCase(updateInfo.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })

  //UPDATE POTENCY SEC OF A SINGLE PRODUCT
     .addCase(updatePotency.pending, (state) =>{
        state.loading = true
  })
      .addCase(updatePotency.fulfilled, (state) => {
          state.loading = false
  })
      .addCase(updatePotency.rejected, (state) => {
       state.loading = false
        state.error = action.payload
  })


  },
});

export const {childCatUpdatePage} = sellerProductSlice.actions
export default sellerProductSlice.reducer;



