import {
  faBagShopping,
  faCircleInfo,
  faCloudArrowUp,
  faEye,
  faImage,
  faLayerGroup,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import NavBar from "../../common/Nav/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  addThumbNail,
  allBrand,
  deleteImage,
  getImages,
  priceVarInfo,
  productCategory,
  productChildCat,
  productInformation,
  saveDataWithImage,
} from "../../../redux/features/sellers/sellerProductSlice";

// import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import "react-dropzone-uploader/dist/styles.css";
import { Bounce, toast } from "react-toastify";
// For React Crop
import ReactCrop from "react-image-crop";
// import ImageCrop from "./ImageCrop";
import ImageModal from "./ImageModal";
import MyEditor from "./MyEditor";
import swal from "sweetalert";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(modalOpen, "modalOpen");
  const [value, setValue] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [tabs, setTabs] = useState("product_info");
  const [productInfo, setProductInfo] = useState({
    name: "",
    status: false,
    category: "",
    subCategory: "",
    childCategory: "",
    brand: "",
    description: "",
    shippingCharge: 0,
    freeShipping: false,
  });

  // For showing name in dropdown
  const [dropDownData, setDropDownData] = useState({
    categoryName: "",
    subCategoryName: "",
    childCategoryName: "",
    brandName: "",
  });

  const [main, setMain] = useState([
    { potency: [{ key: "", value: "" }], val: "" },
  ]);
  const [catName, setCatName] = useState("");
  const [showCreateTitle, setShowCreateTitle] = useState(false);
  const [createTitleName, setCreateTitleName] = useState("");

  const [title, setTitle] = useState([
    "Price",
    "Color",
    "Weight",
    // "Sku",
    // "Product Image",
    // "Banner Image",
  ]);

  const [inputFields, setInputFields] = useState([
    { Price: "" },
    { Save: "" },
    { "Upload Image": "" },
  ]);

  const [modalData, setModalData] = useState({
    imageName: "",
    altName: "",
    productImage: "",
  });

  const [arr, setArr] = useState([]);
  const [fileForProductInput, setFileForProductInput] = useState([]);
  const [fileForBannerInput, setFileForBannerInput] = useState([]);
  const [fileForProduct, setFileForProduct] = useState([]);
  const [fileForBanner, setFileForBanner] = useState([]);
  const [productPictures, setProductPictures] = useState([]);
  const [bannerPictures, setBannerPictures] = useState([]);
  const [indexOfArr, setIndexOfArr] = useState();
  const [error, setError] = useState("");
  const [productImage, setProductImage] = useState("");
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  // console.log(crop, "crop");
  const [variantId, setVariantId] = useState();
  const [showForInput, setShowForInput] = useState(false);
  const [showForArr, setShowForArr] = useState(Array(arr.length).fill(false));
  const [pictureId, setPictureId] = useState("");
  const [picDetail, setPicDetail] = useState("");

  /////////   GET REDUX STATE   //////////////////
  const {
    loading,
    category,
    subCategory,
    childCategory,
    brand,
    productId,
    // variantId,
    productImages,
    allVariant,
  } = useSelector((state) => state.sellerProducts);

  useEffect(() => {
    dispatch(productCategory());
    dispatch(allBrand());
    // dispatch(getImages(variantId));
  }, []);

  //Alert for refreshing Add product page
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // This is required for Chrome to show the warning
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const addPotency = (passData) => {
    if (passData === "main") {
      setMain((prev) => {
        let duplicateMain = [...prev];
        return [...duplicateMain, { potency: [{ key: "", value: "" }] }];
      });
    } else {
      setMain((prev) => {
        let duplicateChild = [...prev];
        duplicateChild[passData]["potency"].push({ key: "", value: "" });
        return duplicateChild;
      });
    }
  };
  const headingChange = (e, index) => {
    setMain((prev) => {
      const heading = [...prev];
      heading[index]["val"] = e.target.value;
      return heading;
    });
  };

  const changeHandler = (e, mainInd, childInd) => {
    setMain((prevData) => {
      const tableInfo = [...prevData];
      tableInfo[mainInd]["potency"][childInd][e.target.name] = e.target.value;
      return tableInfo;
    });
  };

  const changeProductInfo = (e) => {
    if (e.target.type === "text") {
      setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    } else {
      if (e.target.name === "category") {
        if (category.length > 0) {
          category.map((cat) => {
            if (cat.name === e.target.value) {
              setDropDownData({
                ...dropDownData,
                categoryName: e.target.value,
              });
              setProductInfo({ ...productInfo, category: cat._id });
            }
          });
          setCatName(e.target.value);
          dispatch(productCategory(e.target.value));
        }
      } else if (e.target.name === "subCategory") {
        if (subCategory?.length > 0) {
          subCategory.map((subCat_item) => {
            if (subCat_item.subCategoryName === e.target.value) {
              setDropDownData({
                ...dropDownData,
                subCategoryName: e.target.value,
              });
              setProductInfo({
                ...productInfo,
                subCategory: subCat_item._id,
              });
            }
          });

          dispatch(
            productChildCat({ catName: catName, subCatName: e.target.value })
          );
        }
      } else if (e.target.name === "childCategory") {
        if (childCategory.length > 0) {
          childCategory.map((childCat_item) => {
            if (childCat_item.childCategoryName === e.target.value) {
              setDropDownData({
                ...dropDownData,
                childCategoryName: e.target.value,
              });
              setProductInfo({
                ...productInfo,
                childCategory: childCat_item._id,
              });
            }
          });
        }
      } else if (e.target.name === "brand") {
        if (brand.length > 0) {
          brand.map((item) => {
            if (item.name === e.target.value) {
              setDropDownData({
                ...dropDownData,
                brandName: e.target.value,
              });
              setProductInfo({ ...productInfo, brand: item._id });
            }
          });
        }
      }
    }
  };

  const submitProductInfo = (e) => {
    e.preventDefault();
    const productData = {
      info: productInfo,
      others: JSON.stringify(main),
    };

    dispatch(productInformation(productData));
  };

  const createTitle = () => {
    setShowCreateTitle(true);
  };

  const addTitle = (e) => {
    e.preventDefault();

    setShowCreateTitle(false);
    if (title.includes(createTitleName)) {
      alert("already exist");
    } else {
      setTitle([...title, createTitleName]);
    }
    setCreateTitleName("");
  };

  const getTitle = (titleName) => {
    const result = inputFields
      .map((obj, index) => {
        return Object.keys(obj);
      })
      .flat();

    if (result.includes(titleName)) {
      alert("already exist");
    } else {
      const newModArr = [...inputFields];
      const inInd = newModArr.length - 2;
      newModArr.splice(inInd, 0, { [titleName]: "" });
      setInputFields(newModArr);

      /////////////////////////New Try//////////////////
      const addNew = arr.map((obj) => {
        const entries = Object.entries(obj);
        const getInd = entries.length - 2;
        const x = {
          [titleName]: "",
        };
        // entries.splice(getInd, 0, x);
        entries.splice(getInd, 0, Object.entries(x).flat());

        const newObject = Object.fromEntries(entries);
        return newObject;
      });

      setArr(addNew);
    }
  };

  const chngeFirstIndexData = (e, index) => {
    inputFields[index][e.target.name] = e.target.value;
  };

  const changeOtherIndexData = (e, index) => {
    // console.log(index, "iiii");
    arr[index][e.target.name] = e.target.value;
  };

  const saveVariantData = (heading, val, objIndex) => {
    setModalHeading(heading);
    setValue(val);
    console.log(val, "val005");
    if (val === "inputFields") {
      const obj = inputFields
        .slice(0, inputFields.length - 2)
        .reduce((acc, obj) => ({ ...acc, ...obj }), {});
      console.log(obj, "obj");
      dispatch(
        priceVarInfo({ info: obj, productId: "66839dbf0fead0f56552fe34" })
      ).then((res) => {
        console.log(res, "res666");
        if (res?.payload?.message === "New variant added.") {
          setShowForInput(true);
        }
      });
    }
    if (val === "arr") {
      console.log(objIndex, "objIndex");
      const newObj = { ...arr[objIndex] };
      delete newObj["Save"];
      delete newObj["Upload Image"];
      console.log(newObj, "arrDetail");
      dispatch(
        priceVarInfo({ info: newObj, productId: "66839dbf0fead0f56552fe34" })
      );

      const newShowForArr = [...showForArr];
      newShowForArr[objIndex] = true;
      console.log(newShowForArr, "newShowForArr");
      setShowForArr(newShowForArr);
    }
  };

  const uploadImageBtn = (heading, val, index) => {
    if (val === "inputFields") {
      const combined = inputFields.reduce(
        (acc, obj) => ({ ...acc, ...obj }),
        {}
      );
      console.log(combined, "combined");
      const inputFieldObj = allVariant.find(
        (x) => x.variant.Price === combined.Price
      );
      console.log(inputFieldObj, "inputFieldObj");
      setVariantId(inputFieldObj._id);
      dispatch(getImages(inputFieldObj._id));
    } else if (val === "arr") {
      const targetObj = allVariant.find(
        (x) => x.variant.Price === arr[index].Price
      );
      console.log(targetObj, "targetObj");
      setVariantId(targetObj?._id);
      // setPicDetail("");
      dispatch(getImages(targetObj._id));
    }

    if (heading === "Upload Image") {
      setTabs("images");
    }
  };

  const toggle = () => {
    setModal(!modal);
    setPicDetail("");
  };

  // const handleImageChange = (e, modalHeading) => {
  //   if (value === "inputFields") {
  //     if (modalHeading === "Product Image") {
  //       const filesForProduct = Array.from(e.target.files);
  //       setFileForProductInput(filesForProduct);
  //       const newImages = filesForProduct.map((file) =>
  //         URL.createObjectURL(file)
  //       );
  //       setProductPictures((prevImages) => [...prevImages, ...newImages]);
  //     } else if (modalHeading === "Banner Image") {
  //       const filesForBanner = Array.from(e.target.files);
  //       setFileForBannerInput(filesForBanner);
  //       const newImages = filesForBanner.map((file) =>
  //         URL.createObjectURL(file)
  //       );
  //       setBannerPictures((prevImages) => [...prevImages, ...newImages]);
  //     }
  //   }

  //   if (value === "arr") {
  //     if (modalHeading === "Product Image") {
  //       const filesForProduct = Array.from(e.target.files);
  //       setFileForProduct(filesForProduct);
  //       const newImages = filesForProduct.map((file) =>
  //         URL.createObjectURL(file)
  //       );
  //       setProductPictures((prevImages) => [...prevImages, ...newImages]);
  //     } else if (modalHeading === "Banner Image") {
  //       const filesForBanner = Array.from(e.target.files);
  //       setFileForBanner(filesForBanner);
  //       const newImages = filesForBanner.map((file) =>
  //         URL.createObjectURL(file)
  //       );
  //       setBannerPictures((prevImages) => [...prevImages, ...newImages]);
  //     }
  //   }
  // };

  // const modalInput = (e) => {
  //   if (e.target.type === "text") {
  //     setModalData({ ...modalData, [e.target.name]: e.target.value });
  //   } else if (e.target.type === "file") {
  //     setProductImage(e.target.files[0]);
  //     setModalData({ ...modalData, productImage: e.target.files[0] });
  //   }
  // };

  // const modalImage = (e) => {
  //   console.log(e.target.files[0], "hhh");
  //   setProductImage(e.target.files[0]);
  //   setModalData({ ...modalData, productImage: e.target.files[0] });
  // };

  // const saveImages = () => {
  //   setInputFields((prevField) => {
  //     const updatedField = [...prevField];
  //     const indexForProductImage = updatedField.findIndex((obj) =>
  //       obj.hasOwnProperty("Product Image")
  //     );
  //     const indexForBannerImage = updatedField.findIndex((obj) =>
  //       obj.hasOwnProperty("Banner Image")
  //     );
  //     if (modalHeading === "Product Image") {
  //       if (fileForProductInput.length > 3) {
  //         alert("Product image not more than 3");
  //       } else {
  //         updatedField[indexForProductImage]["Product Image"] =
  //           fileForProductInput;
  //         return updatedField;
  //       }
  //       return updatedField;
  //     }

  //     if (modalHeading === "Banner Image") {
  //       if (fileForBannerInput.length > 4) {
  //         alert("Banner image not more than 4");
  //       } else {
  //         updatedField[indexForBannerImage]["Banner Image"] =
  //           fileForBannerInput;
  //         return updatedField;
  //       }
  //       return updatedField;
  //     }

  //     ////////////Alternate////////////////////////////////////////
  //     // updatedField[indexForProductImage]["Product Image"] = fileForProductInput;
  //     // updatedField[indexForBannerImage]["Banner Image"] = fileForBannerInput;
  //     // return updatedField;
  //   });

  //   const otherFields = arr.map((field, index) => {
  //     if (index === indexOfArr && modalHeading === "Product Image") {
  //       if (fileForProduct.length > 3) {
  //         alert("Product image not more than 3");
  //       } else {
  //         return {
  //           ...field,
  //           "Product Image": fileForProduct,
  //           // "Banner Image": fileForBanner,
  //         };
  //       }
  //     }
  //     if (index === indexOfArr && modalHeading === "Banner Image") {
  //       if (fileForBanner.length > 4) {
  //         alert("Banner image not more than 4");
  //       } else {
  //         return {
  //           ...field,
  //           // "Product Image": fileForProduct,
  //           "Banner Image": fileForBanner,
  //         };
  //       }
  //     }
  //     return field;
  //   });

  //   // const otherFields = arr.map((field, index) => {
  //   //   if (index === indexOfArr && modalHeading === "Product Image") {
  //   //     return {
  //   //       ...field,
  //   //       "Product Image": fileForProduct,
  //   //       // "Banner Image": fileForBanner,
  //   //     };
  //   //   }
  //   //   if (index === indexOfArr && modalHeading === "Banner Image") {
  //   //     return {
  //   //       ...field,
  //   //       // "Product Image": fileForProduct,
  //   //       "Banner Image": fileForBanner,
  //   //     };
  //   //   }
  //   //   return field;
  //   // });
  //   setArr(otherFields);

  //   toggle();
  //   setProductPictures([]);
  //   setBannerPictures([]);
  //   setFileForProduct([]);
  //   setFileForBanner([]);
  // };

  // const saveModalData = () => {
  //   let finalData = new FormData();
  //   for (let key in modalData) {
  //     finalData.append(key, modalData[key]);
  //   }
  //   console.log(modalData, "modalData");
  //   console.log(finalData, "finalData");
  //   dispatch(saveDataWithImage({ finalData, variantId }));
  //   toggle();
  // };

  // const modalCancel = () => {
  //   toggle();
  //   setProductPictures([]);
  //   setBannerPictures([]);
  //   setFileForProduct([]);
  //   setFileForBanner([]);
  // };

  const addField = () => {
    const combinedData = inputFields.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {}
    );
    setArr([...arr, combinedData]);

    // if (arr.length === 0) {
    //   setArr([...arr, combinedData]);
    // }

    // if (arr.length > 0) {
    //   setArr([...arr, arr[arr.length - 1]]);
    // }
  };

  // const submitPriceVariant = (e) => {
  //   e.preventDefault();
  //   const ArrayOfdata = [
  //     inputFields.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
  //   ].concat(arr);
  //   console.log(ArrayOfdata, "ArrayOfdata");

  //   ArrayOfdata.forEach((dataObj) => {
  //     // let formData = new FormData();
  //     // // Loop through each key in the object
  //     // for (let key in dataObj) {
  //     //   if (dataObj.hasOwnProperty(key)) {
  //     //     // Check if the value is a file
  //     //     if (dataObj[key] instanceof File) {
  //     //       // Append the file to the FormData object
  //     //       formData.append(key, dataObj[key], dataObj[key].name);
  //     //     } else {
  //     //       // Append other types of data (e.g., text)
  //     //       formData.append(key, dataObj[key]);
  //     //     }
  //     //   }
  //     // }
  //     // const formData = dataObj;
  //     // dispatch(priceVarInfo({ formData, productId }));
  //     // dispatch(
  //     //   priceVarInfo({ formData, productId: "6671804fd2b7492e346c16b4" })
  //     // );
  //   });
  // };

  const func1 = () => {
    let clsname = "";
    if (!showForInput) {
      clsname = "edit";
    } else {
      clsname = "disabled_btn";
    }
    console.log(clsname, "clsname");
    return clsname;
  };

  const func2 = () => {
    let clsname = "";
    if (!showForInput) {
      clsname = "disabled_btn";
    } else {
      clsname = "edit";
    }
    console.log(clsname, "clsname");
    return clsname;
  };

  const func3 = (objIndex) => {
    let clsname = "";
    if (!showForArr[objIndex]) {
      clsname = "edit";
    } else {
      clsname = "disabled_btn";
    }
    console.log(clsname, "clsname");
    return clsname;
  };

  const func4 = (objIndex) => {
    let clsname = "";
    if (!showForArr[objIndex]) {
      clsname = "disabled_btn";
    } else {
      clsname = "edit";
    }
    console.log(clsname, "clsname");
    return clsname;
  };

  const thumbNailPic = (e, imageId) => {
    dispatch(addThumbNail({ imageId, variantId }));
  };

  const handleVeiw = (picId) => {
    toggle();
    const obj = productImages.find((img) => img._id === picId);
    console.log(obj, "obj999");
    setPicDetail(obj);
  };

  const handleDelete = (picId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteImage({
            productId: "66839dbf0fead0f56552fe34",
            variantId: variantId,
            imageId: picId,
          })
        );
        swal("Image has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <>
      <main>
        <section className="total_parent_element">
          <div className="ttl_mdl">
            <ImageModal
              modal={modal}
              setModal={setModal}
              variantId={variantId}
              picDetail={picDetail}
            />
          </div>

          <div className="left_parent_element">
            <div className="total_upper_left">
              <div className="logo_area" />
              <div className="nav_area">
                <div className="outr_dashboard_nav">
                  <h4>Dashboards</h4>
                  <div className="parent_nav_menu">
                    <Sidebar />
                  </div>
                </div>
              </div>
              <div className="nav_btm_logo">
                <img
                  src={require("../../../assets/images/nav_btm_logo.png")}
                  alt="btm-logo"
                />
              </div>
            </div>
          </div>
          <div className="right_parent_element">
            {/* ......................TABS........................ */}
            <NavBar />
            <div className="outr-right-content prdct_info">
              <div className="inner_tbl_bkng">
                <div className="tb_top pdtc">
                  <div className="tb_lft product_i">
                    <button
                      className={`tabs_c ${
                        tabs === "product_info" ? "active" : ""
                      }`}
                      onClick={() => setTabs("product_info")}
                    >
                      <span>
                        <FontAwesomeIcon icon={faBagShopping} />
                      </span>
                      Product Info
                    </button>
                    <button
                      className={`tabs_c ${tabs === "prices" ? "active" : ""}`}
                      onClick={() => setTabs("prices")}
                    >
                      <span>
                        {/* <FontAwesomeIcon icon={faSackDollar} /> */}
                        <FontAwesomeIcon icon={faLayerGroup} />
                      </span>{" "}
                      Variation
                    </button>
                    <button
                      className={`tabs_c ${
                        tabs === "inventory" ? "active" : ""
                      }`}
                      onClick={() => setTabs("inventory")}
                    >
                      <span>
                        <FontAwesomeIcon icon={faBagShopping} />
                      </span>
                      Inventory
                    </button>
                    <button
                      className={`tabs_c ${tabs === "batches" ? "active" : ""}`}
                      onClick={() => setTabs("batches")}
                    >
                      <span>
                        {/* <i className="fa-solid fa-image" /> */}
                        <FontAwesomeIcon icon={faImage} />
                      </span>{" "}
                      Batches
                    </button>
                    <button
                      className={`tabs_c ${tabs === "images" ? "active" : ""}`}
                      onClick={() => setTabs("images")}
                    >
                      <span>
                        <FontAwesomeIcon icon={faImage} />
                      </span>{" "}
                      Images
                    </button>
                    <button
                      className={`tabs_c ${
                        tabs === "product_description" ? "active" : ""
                      }`}
                      onClick={() => setTabs("product_description")}
                    >
                      <span>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </span>{" "}
                      Product Description
                    </button>
                  </div>
                </div>

                {/* /// PRODUCT INFO */}

                {tabs === "product_info" && (
                  <div id="product_info" className="tb_c">
                    <form onSubmit={submitProductInfo}>
                      <div className="p_info">
                        <div className="e-edit">
                          <button
                            type="submit"
                            href="javascript:void(0);"
                            className="edit"
                            // onClick={submitProductInfo}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="total_p_rows">
                        {/*  */}
                        <div className="p_rows">
                          <div className="p_total" id="table_body1"></div>
                          <div className="p_total" id="table_body2">
                            <div className="p_c_lft">
                              <label htmlFor="productName">Product Name</label>
                              <input
                                required
                                id="productName"
                                name="name"
                                value={productInfo.name}
                                type="text"
                                placeholder="10Bandz"
                                onChange={(e) => changeProductInfo(e)}
                              />
                            </div>
                          </div>

                          <div className="p_total" id="table_body4">
                            <div className="p_c_lft">
                              <label htmlFor="status">Status</label>
                              <div className="form-check form-switch">
                                <label class="switch">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      setProductInfo({
                                        ...productInfo,
                                        status: !productInfo.status,
                                      })
                                    }
                                  />
                                  <span class="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="p_total" id="table_body5">
                            <div className="p_c_lft">
                              <label>Category</label>
                              <select
                                required
                                name="category"
                                id="category"
                                value={dropDownData.categoryName}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select Category</option>
                                {category.length > 0 &&
                                  category.map((cat, i) => {
                                    return (
                                      <option value={cat?.name} key={i}>
                                        {cat?.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div className="p_total" id="table_body6">
                            <div className="p_c_lft">
                              <label>Sub Category</label>
                              <select
                                name="subCategory"
                                id="subCategory"
                                value={dropDownData.subCategoryName}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select sub category</option>
                                {subCategory?.length > 0 &&
                                  subCategory.map((subCatItem) => {
                                    return (
                                      <option
                                        value={subCatItem.subCategoryName}
                                        key={subCatItem._id}
                                      >
                                        {subCatItem.subCategoryName}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div className="p_total" id="table_body7">
                            <div className="p_c_lft">
                              <label>Child Category</label>
                              <select
                                name="childCategory"
                                id="childCategory"
                                value={dropDownData.childCategoryName}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select child category</option>

                                {childCategory?.length > 0 &&
                                  childCategory.map((childCatItem) => {
                                    return (
                                      <option
                                        key={childCatItem._id}
                                        value={childCatItem.childCategoryName}
                                      >
                                        {childCatItem.childCategoryName}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>

                          <div className="p_total" id="table_body21">
                            <div className="p_c_lft">
                              <label>Brand</label>
                              <select
                                name="brand"
                                id="brand"
                                value={dropDownData.brandName}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select brand</option>
                                {brand.length > 0 &&
                                  brand.map((brandItem) => {
                                    return (
                                      <option
                                        value={brandItem.name}
                                        key={brandItem._id}
                                      >
                                        {brandItem.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>

                          <div className="p_total" id="table_body25">
                            <div className="p_c_lft">
                              <label htmlFor="description">Description</label>
                              <input
                                required
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Introducing 10 Bandz"
                                onChange={(e) => changeProductInfo(e)}
                              />
                            </div>
                          </div>
                          <div className="p_total" id="table_body26">
                            <div className="p_c_lft">
                              <label htmlFor="shippingCharge">
                                Shipping Charge
                              </label>
                              <input
                                required
                                id="shippingCharge"
                                name="shippingCharge"
                                type="text"
                                placeholder="10"
                                onChange={(e) => changeProductInfo(e)}
                              />
                            </div>
                          </div>
                          <div className="p_total" id="table_body26">
                            <div className="p_c_lft">
                              <label htmlFor="freeShipping">
                                Free Shipping
                              </label>

                              <div className="form-check form-switch">
                                {/* <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  onChange={() =>
                                    setProductInfo({
                                      ...productInfo,
                                      freeShipping: !productInfo.freeShipping,
                                    })
                                  }
                                  checked={productInfo.freeShipping}
                                /> */}
                                <label class="switch">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      setProductInfo({
                                        ...productInfo,
                                        freeShipping: !productInfo.freeShipping,
                                      })
                                    }
                                  />
                                  <span class="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* potency */}

                        <div className="main_p_inform" id="tbDiv001">
                          {main.map((v, ind) => {
                            return (
                              <div className="p_inform" key={ind}>
                                <div className="p_total p_hdng" id="table_body">
                                  <div className="p_c_lft">
                                    <input
                                      required
                                      type="text"
                                      placeholder="Potency"
                                      className="table_body01"
                                      onChange={(e) => headingChange(e, ind)}
                                    />
                                    <span
                                      className="add_btn"
                                      onClick={() => addPotency("main")}
                                    >
                                      <div className="click_me" />
                                      <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                  </div>
                                </div>

                                <div className="p_rows">
                                  <div
                                    className="p_total"
                                    id="table_body29"
                                    // ref={tableRef}
                                  >
                                    {v.potency.map((c, ci) => {
                                      return (
                                        <div className="p_c_lft_dup" key={ci}>
                                          <input
                                            // ref={keyRef}
                                            required
                                            name="key"
                                            type="text"
                                            className="addMain"
                                            placeholder="Total THC (mg)"
                                            onChange={(e) =>
                                              changeHandler(e, ind, ci)
                                            }
                                          />
                                          <input
                                            required
                                            // ref={valRef}
                                            name="value"
                                            type="text"
                                            className="addPrefer"
                                            placeholder="0.00mg"
                                            onChange={(e) =>
                                              changeHandler(e, ind, ci)
                                            }
                                          />
                                          <span
                                            className="add_btn"
                                            onClick={() => addPotency(ind)}
                                            // onClick="create_tr('table_body29')"
                                          >
                                            <FontAwesomeIcon
                                              icon={faPlus}
                                              size="2xl"
                                            />
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* /// PRICES */}
                {tabs === "prices" && (
                  <div
                    id="prices"
                    className="tb_c"
                    // style={{ display: "none" }}
                  >
                    <div className="title-bx" id="price_tab">
                      <div className="outr_title">
                        <ul id="list" className="listitem">
                          {title &&
                            title.map((t, i) => (
                              <div key={i}>
                                <li
                                  className="litext"
                                  value={t}
                                  onClick={() => getTitle(t)}
                                >
                                  {t}
                                </li>
                                {/* <span>
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    onClick={() => deleteTitle(t)}
                                  />
                                </span> */}
                              </div>
                            ))}
                        </ul>
                        <button
                          type=""
                          className="add_title tab_lst_add"
                          onClick={createTitle}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>

                      <div
                        className={`${
                          showCreateTitle
                            ? "title_add_outr"
                            : "title_add_outr hidden"
                        }`}
                      >
                        <form onSubmit={addTitle}>
                          <input
                            required
                            type="text"
                            // defaultValue=""
                            value={createTitleName}
                            className="input-field"
                            onChange={(e) => {
                              const inputVal = e.target.value;
                              const capitalizedVal =
                                inputVal.charAt(0).toUpperCase() +
                                inputVal.slice(1).toLocaleLowerCase();
                              setCreateTitleName(capitalizedVal);
                            }}
                          />
                          <button
                            // type="button"
                            type="submit"
                            className="add__btn"
                            // onClick={addTitle}
                          >
                            ADD
                          </button>
                        </form>
                      </div>
                      <div id="pro_header">
                        <form
                        // onSubmit={submitPriceVariant}
                        >
                          {/* <form > */}
                          <div className="outr_all_header">
                            <div className="all_otr">
                              <div className="all_title">
                                {/* {arr.length > 0 ? arr.map} */}
                                {inputFields &&
                                  inputFields.map((input, i) => {
                                    return (
                                      <div className="input-field-outr" key={i}>
                                        {Object.keys(input)[0] !== "Save" &&
                                          Object.keys(input)[0] !==
                                            "Upload Image" && (
                                            <span>{Object.keys(input)[0]}</span>
                                          )}

                                        {Object.keys(input)[0] === "Save" ||
                                        Object.keys(input)[0] ===
                                          "Upload Image" ? (
                                          <button
                                            disabled={
                                              Object.keys(input)[0] === "Save"
                                                ? showForInput
                                                : !showForInput
                                            }
                                            type="button"
                                            className={
                                              Object.keys(input)[0] === "Save"
                                                ? func1()
                                                : func2()
                                            }
                                            // className="disabled_btn"
                                            // className="edit"
                                            onClick={() => {
                                              if (
                                                Object.keys(input)[0] === "Save"
                                              ) {
                                                saveVariantData(
                                                  Object.keys(input)[0],
                                                  "inputFields"
                                                );
                                              }
                                              if (
                                                Object.keys(input)[0] ===
                                                "Upload Image"
                                              ) {
                                                uploadImageBtn(
                                                  Object.keys(input)[0],
                                                  "inputFields"
                                                );
                                              }
                                            }}
                                          >
                                            {Object.keys(input)[0] === "Save"
                                              ? "Save"
                                              : "Upload Image"}
                                          </button>
                                        ) : (
                                          <input
                                            required
                                            name={Object.keys(input)[0]}
                                            type="text"
                                            defaultValue={
                                              input[Object.keys(input)[0]]
                                            }
                                            onChange={(e) =>
                                              chngeFirstIndexData(e, i)
                                            }
                                          />
                                        )}
                                      </div>
                                    );
                                  })}
                                <button
                                  type="button"
                                  className="add_row tab_lst_add"
                                  onClick={addField}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                              </div>

                              {arr &&
                                arr.map((obj, objIndex) => {
                                  const arrFromObj = Object.keys(obj);

                                  return (
                                    <div className="all_title">
                                      {arrFromObj.map((key, keyIndex) => {
                                        return (
                                          <div
                                            className="input-field-outr"
                                            key={objIndex}
                                          >
                                            {key === "Save" ||
                                            key === "Upload Image" ? (
                                              <button
                                                disabled={
                                                  key === "Save"
                                                    ? showForArr[objIndex]
                                                    : !showForArr[objIndex]
                                                }
                                                type="button"
                                                href="javascript:void(0);"
                                                className={
                                                  key === "Save"
                                                    ? func3(objIndex)
                                                    : func4(objIndex)
                                                }
                                                // className="edit"
                                                onClick={() => {
                                                  if (key === "Save") {
                                                    saveVariantData(
                                                      key,
                                                      "arr",
                                                      objIndex
                                                    );
                                                    setIndexOfArr(objIndex);
                                                  }
                                                  if (key === "Upload Image") {
                                                    uploadImageBtn(
                                                      key,
                                                      "arr",
                                                      objIndex
                                                    );
                                                    setIndexOfArr(objIndex);
                                                  }
                                                }}
                                              >
                                                {key === "Save"
                                                  ? "Save"
                                                  : "Upload Image"}
                                              </button>
                                            ) : (
                                              <input
                                                required
                                                type="text"
                                                name={key}
                                                defaultValue={obj[key]}
                                                key={keyIndex}
                                                onChange={(e) =>
                                                  changeOtherIndexData(
                                                    e,
                                                    objIndex
                                                  )
                                                }
                                              />
                                            )}
                                          </div>
                                        );
                                      })}

                                      <button
                                        type="button"
                                        className="add_row tab_lst_add"
                                        onClick={addField}
                                      >
                                        <FontAwesomeIcon icon={faPlus} />
                                      </button>
                                    </div>
                                  );
                                })}
                            </div>

                            <br />

                            {/* <button type="submit" className="edit">
                              Save
                            </button> */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {/* /// INVENTORY */}
                {tabs === "inventory" && (
                  <div
                    id="inventory"
                    className="tb_c"
                    style={{ display: "none" }}
                  >
                    {/* ayon paul start / 05.03.2024 */}
                    <div className="ivnt_ottr">
                      <div className="ivnt_tp_btns">
                        <div className="ivnt_lft_btn">
                          <a href="javascript:void(0);" className="edit">
                            Show Inventory per Region
                          </a>
                        </div>
                        <div className="ivnt_rght_btn">
                          <a href="javascript:void(0);" className="edit">
                            Refresh Inventory
                          </a>
                        </div>
                      </div>
                      <div className="ivnt_units">
                        <span>Total Stock Remaining: 3.00 units</span>
                        <span>Total Committed (Online): 0 units</span>
                      </div>
                      <div className="ivnt_tbl_ttl">
                        <div className="ivnt_tbl_hdng">
                          <h5>Inventory Transfer</h5>
                        </div>
                        <form className="ivnt_tbl_form">
                          <div className="ivnt_tbl_strt">
                            <div className="ivnt_tbl_prt">
                              <label>From</label>
                              <select
                                name="transfer_from"
                                className="form-control"
                              >
                                <option value="from_value">Select</option>
                                <option value="from_value">Safe</option>
                                <option value="from_value">Exchange</option>
                              </select>
                            </div>
                            <div className="ivnt_tbl_prt">
                              <label>To</label>
                              <select
                                name="transfer_to"
                                className="form-control"
                              >
                                <option value="to_value">Select</option>
                                <option value="to_value">Safe</option>
                                <option value="to_value">Exchange</option>
                              </select>
                            </div>
                            <div className="ivnt_tbl_prt" id="ivnt_tb_amnt">
                              <label>Amount</label>
                              <input
                                type="number"
                                name="transfer_amount"
                                className="form-control"
                                defaultValue={0}
                              />
                            </div>
                          </div>
                          <div className="ivnt_tbl_chk">
                            <input
                              type="checkbox"
                              name="trns_chk"
                              id="trns_chk"
                            />
                            <label>Transfer By Batch</label>
                          </div>
                        </form>
                        <div className="ivnt_trns_actv" id="ivnt_actv">
                          <table className="ivnt_trns_tbl">
                            <thead>
                              <tr>
                                <th>Batch</th>
                                <th>Start Inventory</th>
                                <th>Transfer Amount</th>
                                <th />
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <div className="payment_filter ivnt_filter">
                          <div className="payment_filter_both">
                            <div className="payment_filter_lft">
                              <label> Active Inventories </label>
                            </div>
                          </div>
                        </div>
                        <div className="oder_history dbrd_inv_history">
                          <div className="orders dbrd_inv_orders">
                            <div className="ordr_tbl dbrd_inv_ordr_tbl ivnt_td_ottr">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Inventory</th>
                                    <th>Current Quantity</th>
                                    <th>On Hold</th>
                                    <th>Pending Transfer</th>
                                    <th>Send Low Inventory Notification</th>
                                    <th>Low Inventory Threshold</th>
                                    <th>Inventory PAR Level</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Safe</td>
                                    <td>2 units</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Blaze Test Inv</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Employee Orders</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Safe</td>
                                    <td>2 units</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Blaze Test Inv</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Employee Orders</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Safe</td>
                                    <td>2 units</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Blaze Test Inv</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Employee Orders</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>No</td>
                                    <td>0 unit</td>
                                    <td>0 unit</td>
                                    <td>
                                      <div className="dbrd_inv_cl_btn">
                                        <a href="javascript:void(0);">Edit</a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ivnt_ottr">
                      <div className="payment_filter ivnt_filter">
                        <div className="payment_filter_both ivnt_filter_btn">
                          <a href="javascript:void(0);" className="edit">
                            Show Inventory per Region
                          </a>
                        </div>
                      </div>
                      <div className="oder_history dbrd_inv_history">
                        <div className="orders dbrd_inv_orders">
                          <div className="ordr_tbl dbrd_inv_ordr_tbl ivnt_bttm_td_ottr">
                            <table>
                              <thead />
                              <tbody>
                                <tr>
                                  <td>Send Low Inventory Notification</td>
                                  <td>No</td>
                                  <td />
                                </tr>
                                <tr>
                                  <td>Low Inventory Threshold</td>
                                  <td>0</td>
                                  <td />
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ayon paul end / 05.03.2024 */}
                  </div>
                )}

                {/* /// BATCHES */}
                {tabs === "batches" && (
                  <div
                    id="batches"
                    className="tb_c"
                    style={{ display: "none" }}
                  >
                    <div className="p_info batch">
                      <div className="batch_top">
                        <div className="p_info_hdr">
                          <h6>Batches</h6>
                        </div>
                        <div className="e-edit">
                          <a href="javascript:void(0);" className="edit">
                            Refresh Inventory
                          </a>
                        </div>
                      </div>
                      <div className="batch_info">
                        <table>
                          <thead>
                            <tr>
                              <th>Purchase Date</th>
                              <th>Batch Id</th>
                              <th>Unique #</th>
                              <th>Expiration Date</th>
                              <th>Status</th>
                              <th>Tracking System</th>
                              <th>Purchase Quantity</th>
                              <th>Current Quantity</th>
                              <th>Unit Cost</th>
                              <th>Price</th>
                              <th>Others</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>10/05/2023</td>
                              <td>1A4060300032964000221615</td>
                              <td>H231BAT1</td>
                              <td>09/23/2024</td>
                              <td>Active</td>
                              <td>
                                METRC
                                <br />
                                1A4060300032964000221615
                              </td>
                              <td>320</td>
                              <td>
                                3 <span id="myBtn">More Quantity</span>
                              </td>
                              <td>$25.00</td>
                              <td>$8000.00</td>
                              <td>
                                <div className="btns">
                                  <a
                                    href="javascript:void(0);"
                                    className="edit return"
                                  >
                                    Return To Vendor
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="edit split"
                                  >
                                    Split
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="edit finish"
                                  >
                                    Finish
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* /// IMAGES */}
                {tabs === "images" && (
                  <div
                    id="images"
                    className="tb_c nw_imgs_tbc"
                    style={{
                      // display: "none",
                      marginTop: "20px",
                    }}
                  >
                    <div className="img_info">
                      <div className="img_contains">
                        {productImages &&
                          productImages?.length > 0 &&
                          productImages?.map((pic, index) => {
                            console.log(pic, "pic");
                            return (
                              <div className="img_part" key={index}>
                                <div className="img_part_img">
                                  <input
                                    // type="checkbox"
                                    className="form-check-input"
                                    type="radio"
                                    id="img1"
                                    name="img1"
                                    defaultValue="img1"
                                    checked={pic.thumbnail}
                                    onChange={(e) => thumbNailPic(e, pic._id)}
                                  />

                                  <img src={pic?.url} alt={pic?.altName} />
                                </div>
                                <div className="img_text">
                                  <p>{pic?.imageName}</p>
                                </div>
                                <div className="img_icons">
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    size="2xl"
                                    onClick={() => handleVeiw(pic._id)}
                                  />
                                  {/* <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    size="2xl"
                                  /> */}
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size="2xl"
                                    onClick={() => handleDelete(pic._id)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="img_upload">
                        <p>
                          Click on the "Choose File" button to upload a image:
                        </p>
                        <form action="">
                          {/* <input type="file" id="myFile" name="filename" /> */}
                          {/* <input type="submit" /> */}
                          <button
                            type="button"
                            className="edit"
                            onClick={() => toggle()}
                          >
                            Upload
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {/* //Product Description */}
                {tabs === "product_description" && (
                  <div className="tb_c ext_tb_c">
                    <br />
                    <br />
                    <MyEditor />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right_notifictaion">
            <div className="outr_notifictaion">
              <div className="outr_notifictaion">
                <div className="innr_top">
                  <div className="ntfcn_hdr">
                    <h6>Notifications</h6>
                  </div>
                  <div className="ntfcn_divs">
                    <div className="ntfcn_div">
                      <div className="nt_icn">
                        <span>
                          <i className="fa-solid fa-bug" />
                        </span>
                      </div>
                      <div className="nt_txt">
                        <h6>You fixed a bug.</h6>
                        <p>Just now</p>
                      </div>
                    </div>
                    <div className="ntfcn_div">
                      <div className="nt_icn">
                        <span>
                          <i className="fa-regular fa-user" />
                        </span>
                      </div>
                      <div className="nt_txt">
                        <h6>New user registered.</h6>
                        <p>59 minutes ago</p>
                      </div>
                    </div>
                    <div className="ntfcn_div">
                      <div className="nt_icn">
                        <span>
                          <i className="fa-solid fa-bug" />
                        </span>
                      </div>
                      <div className="nt_txt">
                        <h6>You fixed a bug.</h6>
                        <p>12 hours ago</p>
                      </div>
                    </div>
                    <div className="ntfcn_div">
                      <div className="nt_icn">
                        <span>
                          <i className="fa-solid fa-tower-broadcast" />
                        </span>
                      </div>
                      <div className="nt_txt">
                        <h6>Andi Lane subscribed to you.</h6>
                        <p>Today, 11:59 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="innr_ordr">
                  <div className="orde-hdr">
                    <h6>Online Orders</h6>
                    <h6>
                      Rs - <span>230</span> - zomato - 10 min
                    </h6>
                  </div>
                  <div className="order_btns">
                    <div className="btn">
                      <a href="javascript:void(0);">Cooking</a>
                    </div>
                    <div className="btn">
                      <a href="javascript:void(0);">Delivered</a>
                    </div>
                  </div>
                </div>
                <div className="innr_tbl_bkn">
                  <div className="orde-hdr">
                    <h6>Table Bookings</h6>
                    <h6>26 Dec Manish Sethia 7:30 pm</h6>
                  </div>
                  <div className="order_btns tbl">
                    <div className="btn">
                      <span>
                        <i className="fa-solid fa-check" />
                      </span>
                      <a href="javascript:void(0);">Approve</a>
                    </div>
                    <div className="btn">
                      <span>
                        <i className="fa-solid fa-xmark" />
                      </span>
                      <a href="javascript:void(0);">Decline</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddProduct;
