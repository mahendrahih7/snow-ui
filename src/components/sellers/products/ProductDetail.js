import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../common/Sidebar";
import NavBar from "../../common/Nav/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCloudArrowUp,
  faEye,
  faImage,
  faLayerGroup,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allBrand,
  childCatUpdatePage,
  prodCatUpdatePage,
  productCategory,
  productChildCat,
  singleProductDetail,
  updateInfo,
} from "../../../redux/features/sellers/sellerProductSlice";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Seller_products } from "../../../constants/Api/Api";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [main, setMain] = useState([
    { potency: [{ key: "", value: "" }], val: "" },
  ]);
  const [inputFields, setInputFields] = useState([
    { Price: "" },
    { "Product Image": [] },
    { "Banner Image": [] },
  ]);
  const [arr, setArr] = useState([]);
  const [title, setTitle] = useState([
    "Price",
    "Color",
    "Weight",
    "Sku",
    "Product Image",
    "Banner Image",
  ]);
  const [tabs, setTabs] = useState("product_info");
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [createTitleName, setCreateTitleName] = useState("");
  const [showCreateTitle, setShowCreateTitle] = useState(false);
  const [catName, setCatName] = useState("");
  const [subCatName, setSubCatName] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  // For showing name in dropdown
  const [dropDownData, setDropDownData] = useState({
    categoryName: "",
    subCategoryName: "",
    childCategoryName: "",
    brandName: "",
  });

  const [fileForProductInput, setFileForProductInput] = useState([]);
  const [fileForBannerInput, setFileForBannerInput] = useState([]);
  const [fileForProduct, setFileForProduct] = useState([]);
  const [fileForBanner, setFileForBanner] = useState([]);
  const [productPictures, setProductPictures] = useState([]);
  const [bannerPictures, setBannerPictures] = useState([]);

  //store index of array -> Arr
  const [indexOfArr, setIndexOfArr] = useState();

  //USE UseSelector
  const {
    loading,
    productDetail,
    category,
    subCategory,
    childCategory,
    brand,
  } = useSelector((state) => state.sellerProducts);
  console.log(productDetail, "productDetail");

  //State for Product Info
  const [productInfo, setProductInfo] = useState({});

  console.log(productInfo, "productInfo");

  //FOR dispatch action
  useEffect(() => {
    dispatch(singleProductDetail(id));
    dispatch(productCategory());
    dispatch(allBrand());
  }, []);

  //GET SINGLE PRODUCT DETAILS
  useEffect(() => {
    axios
      .get(`${Seller_products}/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setMain(res.data.data.otherDescription);
        console.log(res.data.data.productInfo, "infodetails");
        setProductInfo(res.data.data.productInfo);

        //For InputField
        const variant = res.data.data.variants[0].variant;
        const arrForInputFields = [];
        for (let key in variant) {
          arrForInputFields.push({ [key]: variant[key] });
        }
        arrForInputFields.push({
          "Product Image": res.data.data.variants[0]["productPictures"],
        });
        arrForInputFields.push({
          "Banner Image": res.data.data.variants[0]["bannerPictures"],
        });
        setInputFields(arrForInputFields);

        //For ARR
        const newVariants = res.data.data.variants.slice(1);
        const newArray = newVariants.map((v) => {
          return {
            ...v.variant,
            "Product Image": [...v["productPictures"]],
            "Banner Image": [...v["bannerPictures"]],
          };
        });

        setArr(newArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggle = (heading, val, arrInd) => {
    setModal(!modal);
    setModalHeading(heading);
    setValue(val);
    // setObj(object);
    if (val === "inputFields") {
      if (heading === "Product Image") {
        setProductPictures(inputFields[arrInd]["Product Image"]);
        // setProductPictures(inputViewProdPic);
      } else if (heading === "Banner Image") {
        setBannerPictures(inputFields[arrInd]["Banner Image"]);
        // setBannerPictures(inputViewBannrPic);
      }
    }

    if (val === "arr") {
      if (heading === "Product Image") {
        setProductPictures(arr[arrInd]["Product Image"]);
      } else if (heading === "Banner Image") {
        setBannerPictures(arr[arrInd]["Banner Image"]);
      }
    }
  };

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

  const changeProductInfo = (e) => {
    if (e.target.type === "text") {
      setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
      if (e.target.name === "shippingCharge") {
        setProductInfo({
          ...productInfo,
          shippingDetails: {
            ...productInfo.shippingDetails,
            shippingCharge: e.target.value,
          },
        });
      }
    } else if (e.target.type === "checkbox") {
      if (e.target.name === "status") {
        setProductInfo({ ...productInfo, status: !productInfo?.status });
      }
      if (e.target.name === "freeShipping") {
        setProductInfo({
          ...productInfo,
          shippingDetails: {
            ...productInfo.shippingDetails,
            freeShipping: !productInfo?.shippingDetails?.freeShipping,
          },
        });
      }
    } else {
      if (e.target.name === "category") {
        console.log(e.target.value, "valueTarget");
        setCatName(e.target.value);
        const catSingleObj = category.find(
          (catObj) => catObj.name === e.target.value
        );
        setProductInfo({
          ...productInfo,
          category: { _id: catSingleObj?._id },
          subCategory: { name: "" },
          childCategory: { name: "" },
        });
        dispatch(prodCatUpdatePage(e.target.value));
      }

      if (e.target.name === "subCategory") {
        setSubCatName(e.target.value);
        console.log(catName, "catName");

        if (!catName) {
          const catSingleObj = category.find(
            (catObj) => catObj.name === productInfo?.category?.name
          );
          const subCatSingleObj = catSingleObj?.subCategory?.find(
            (subCatObj) => subCatObj.subCategoryName === e.target.value
          );
          setProductInfo({
            ...productInfo,
            subCategory: { _id: subCatSingleObj?._id },
            childCategory: { _id: "" },
          });
        } else {
          const catSingleObj = category.find(
            (catObj) => catObj.name === catName
          );
          const subCatSingleObj = catSingleObj?.subCategory?.find(
            (subCatObj) => subCatObj.subCategoryName === e.target.value
          );
          setProductInfo({
            ...productInfo,
            subCategory: { _id: subCatSingleObj?._id },
            childCategory: { _id: "" },
          });
        }

        dispatch(childCatUpdatePage(e.target.value));
      }

      if (e.target.name === "childCategory") {
        if (!subCatName) {
          const subCatSingleObj = subCategory?.find(
            (subCatObj) =>
              subCatObj.subCategoryName === productInfo?.subCategory?.name
          );
          const childCatSingleObj = subCatSingleObj?.childCategory?.find(
            (childCatObj) => childCatObj.childCategoryName === e.target.value
          );
          setProductInfo({
            ...productInfo,
            childCategory: { _id: childCatSingleObj?._id },
          });
        } else {
          const subCatSingleObj = subCategory?.find(
            (subCatObj) => subCatObj.subCategoryName === subCatName
          );
          const childCatSingleObj = subCatSingleObj?.childCategory?.find(
            (childCatObj) => childCatObj.childCategoryName === e.target.value
          );
          setProductInfo({
            ...productInfo,
            childCategory: { _id: childCatSingleObj?._id },
          });
        }
      }
    }

    if (e.target.name === "brand") {
      const brandSingleObj = brand?.find(
        (brandObj) => brandObj.name === e.target.value
      );
      setProductInfo({ ...productInfo, brand: { _id: brandSingleObj?._id } });
    }
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
      const newArray = [...title];
      const insertIndex = newArray.length - 2;
      newArray.splice(insertIndex, 0, createTitleName);

      setTitle(newArray);
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

  const addField = () => {
    const combinedData = inputFields.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {}
    );
    setArr([...arr, combinedData]);
  };

  const saveImages = () => {};

  const modalCancel = () => {};

  const submitProductInfo = (e) => {
    e.preventDefault();
    const productInfoUpdate = {
      name: productInfo.name,
      status: productInfo.status,
      category: productInfo.category._id,
      subCategory: !productInfo?.subCategory?._id
        ? ""
        : productInfo.subCategory._id,
      childCategory: !productInfo?.childCategory?._id
        ? ""
        : productInfo?.childCategory?._id,
      brand: productInfo?.brand?._id,
      description: productInfo.description,
      shippingCharge: productInfo.shippingDetails.shippingCharge,
      freeShipping: productInfo.shippingDetails.freeShipping,
    };

    console.log(productInfoUpdate, "productInfoUpdate");

    dispatch(updateInfo({ productInfoUpdate, id }));

    // console.log(productInfo, "productInfo");

    // const productData = {
    //   info: productInfo,
    //   // others: JSON.stringify(main),
    // };

    // console.log(productData.info, "productInfoDetail");
  };

  const submitPriceVariant = (e) => {
    e.preventDefault();
    setIsEdit(true);
    const ArrayOfdata = [
      inputFields.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
    ].concat(arr);
    console.log(ArrayOfdata, "ArrayOfdata");

    ArrayOfdata.forEach((dataObj) => {
      // const formData = dataObj;
      // dispatch(priceVarInfo({ formData, productId }));
    });
  };

  return (
    <>
      <main>
        <section className="total_parent_element">
          <>
            <Modal
              className="prdct_mdl"
              isOpen={modal}
              toggle={toggle}
              centered
              fade
              size="lg"
              backdrop
            >
              <ModalHeader toggle={toggle}>
                {`${
                  modalHeading === "Product Image"
                    ? " Upload Product Images (Max 3)"
                    : "Upload Banner Images (Max 4)"
                }`}
              </ModalHeader>
              <ModalBody>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {modalHeading === "Product Image" &&
                    productPictures.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={image}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            margin: "10px",
                          }}
                          alt=""
                        />
                      );
                    })}
                  {modalHeading === "Banner Image" &&
                    bannerPictures.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={image}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            margin: "10px",
                          }}
                          alt=""
                        />
                      );
                    })}
                </div>

                {isEdit && (
                  <input
                    type="file"
                    name="Product Image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, modalHeading)}
                    multiple
                  />
                )}
              </ModalBody>
              <ModalFooter>
                {isEdit && (
                  <Button
                    color="primary"
                    className="modalBtn"
                    // onClick={saveImages(obj, modalHeading)}
                    onClick={saveImages}
                  >
                    Add
                  </Button>
                )}{" "}
                {isEdit && (
                  <Button
                    color="secondary"
                    className="modalBtn"
                    onClick={modalCancel}
                  >
                    Cancel
                  </Button>
                )}
              </ModalFooter>
            </Modal>
          </>

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
                  </div>
                </div>

                {/* /// PRODUCT INFO */}

                {tabs === "product_info" && (
                  <div id="product_info" className="tb_c">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!isEdit) {
                          submitProductInfo(e);
                        }
                      }}
                    >
                      <div className="p_info">
                        <div className="e-edit">
                          {isEdit ? (
                            <button
                              type="submit"
                              className="edit"
                              onClick={() => setIsEdit(false)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="edit"
                              onClick={() => setIsEdit(true)}
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="total_p_rows">
                        {/*  */}
                        <div className="p_rows">
                          <div className="p_total" id="table_body1"></div>
                          <div className="p_total" id="table_body2">
                            <div className="p_c_lft">
                              <label htmlFor="name">Product Name</label>
                              <input
                                disabled={!isEdit}
                                required
                                id="name"
                                name="name"
                                value={productInfo?.name}
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
                                <label className="switch">
                                  <input
                                    disabled={!isEdit}
                                    name="status"
                                    type="checkbox"
                                    checked={productInfo?.status}
                                    onChange={(e) => changeProductInfo(e)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="p_total" id="table_body5">
                            <div className="p_c_lft">
                              <label>Category</label>
                              <select
                                disabled={!isEdit}
                                required
                                name="category"
                                id="category"
                                value={productInfo?.category?.name}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select Category</option>
                                {category &&
                                  category.map((cat, i) => {
                                    return (
                                      <option value={cat.name} key={i}>
                                        {cat.name}
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
                                disabled={!isEdit}
                                name="subCategory"
                                id="subCategory"
                                value={productInfo?.subCategory?.name}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select sub category</option>

                                {subCategory &&
                                  subCategory.map((subCat, i) => {
                                    return (
                                      <option
                                        value={subCat.subCategoryName}
                                        key={i}
                                      >
                                        {subCat.subCategoryName}
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
                                disabled={!isEdit}
                                name="childCategory"
                                id="childCategory"
                                value={productInfo?.childCategory?.name}
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
                                required
                                disabled={!isEdit}
                                name="brand"
                                id="brand"
                                value={productInfo?.brand?.name}
                                onChange={(e) => changeProductInfo(e)}
                              >
                                <option value="">Select brand</option>
                                {brand &&
                                  brand.map((b, i) => {
                                    return (
                                      <option value={b.name} key={i}>
                                        {b.name}
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
                                disabled={!isEdit}
                                id="description"
                                name="description"
                                type="text"
                                value={productInfo?.description}
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
                                disabled={!isEdit}
                                id="shippingCharge"
                                name="shippingCharge"
                                value={
                                  productInfo?.shippingDetails?.shippingCharge
                                }
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
                                <label class="switch">
                                  <input
                                    disabled={!isEdit}
                                    name="freeShipping"
                                    type="checkbox"
                                    onChange={(e) => changeProductInfo(e)}
                                    checked={
                                      productInfo?.shippingDetails?.freeShipping
                                    }
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* potency */}

                        <div className="main_p_inform" id="tbDiv001">
                          {main?.map((v, ind) => {
                            return (
                              <div className="p_inform" key={ind}>
                                <div className="p_total p_hdng" id="table_body">
                                  <div className="p_c_lft">
                                    <input
                                      disabled={!isEdit}
                                      required
                                      type="text"
                                      placeholder="Potency"
                                      value={v.val}
                                      className="table_body01"
                                      onChange={(e) => headingChange(e, ind)}
                                    />
                                    <span
                                      className="add_btn"
                                      onClick={() => {
                                        if (isEdit === true) {
                                          addPotency("main");
                                        }
                                      }}
                                    >
                                      <div className="click_me" />
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        size="xl"
                                      />
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
                                            disabled={!isEdit}
                                            name="key"
                                            type="text"
                                            className="addMain"
                                            placeholder="Total THC (mg)"
                                            value={c.key}
                                            onChange={(e) =>
                                              changeHandler(e, ind, ci)
                                            }
                                          />
                                          <input
                                            required
                                            disabled={!isEdit}
                                            // ref={valRef}
                                            name="value"
                                            type="text"
                                            className="addPrefer"
                                            value={c.value}
                                            placeholder="0.00mg"
                                            onChange={(e) =>
                                              changeHandler(e, ind, ci)
                                            }
                                          />
                                          <span
                                            className="add_btn"
                                            onClick={() => {
                                              if (isEdit === true) {
                                                addPotency(ind);
                                              }
                                            }}
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
                                  onClick={() => {
                                    if (isEdit === true) {
                                      getTitle(t);
                                    }
                                  }}
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
                          onClick={() => {
                            if (isEdit === true) {
                              createTitle();
                            }
                          }}
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
                        <form onSubmit={submitPriceVariant}>
                          {/* <form > */}
                          <div className="outr_all_header">
                            <div className="all_otr">
                              <div className="all_title">
                                {/* {arr.length > 0 ? arr.map} */}
                                {inputFields &&
                                  inputFields.map((input, i) => {
                                    return (
                                      <div className="input-field-outr" key={i}>
                                        <span>{Object.keys(input)[0]}</span>
                                        {Object.keys(input)[0] ===
                                          "Product Image" ||
                                        Object.keys(input)[0] ===
                                          "Banner Image" ? (
                                          <button
                                            type="button"
                                            className="edit"
                                            onClick={() => {
                                              toggle(
                                                Object.keys(input)[0],
                                                "inputFields",
                                                i
                                              );
                                            }}
                                          >
                                            {isEdit ? "Upload" : "View"}{" "}
                                            {isEdit && (
                                              <FontAwesomeIcon
                                                icon={faCloudArrowUp}
                                                // size="xl"
                                              />
                                            )}{" "}
                                            {Object.keys(input)[0] ===
                                              "Product Image" &&
                                              input["Product Image"].length}
                                            {Object.keys(input)[0] ===
                                              "Banner Image" &&
                                              input["Banner Image"].length}
                                          </button>
                                        ) : (
                                          <input
                                            required
                                            disabled={!isEdit}
                                            name={Object.keys(input)[0]}
                                            type="text"
                                            value={input[Object.keys(input)[0]]}
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
                                  onClick={() => {
                                    if (isEdit === true) {
                                      addField();
                                    }
                                  }}
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
                                            {key === "Product Image" ||
                                            key === "Banner Image" ? (
                                              <button
                                                type="button"
                                                href="javascript:void(0);"
                                                className="edit"
                                                onClick={() => {
                                                  toggle(key, "arr", objIndex);
                                                  setIndexOfArr(objIndex);
                                                  // showImageNum(obj, key);
                                                }}
                                              >
                                                {isEdit ? "Upload" : "View"}{" "}
                                                {isEdit && (
                                                  <FontAwesomeIcon
                                                    icon={faCloudArrowUp}
                                                    // size="xl"
                                                  />
                                                )}{" "}
                                                {key === "Product Image" &&
                                                  obj["Product Image"].length}
                                                {key === "Banner Image" &&
                                                  obj["Banner Image"].length}
                                              </button>
                                            ) : (
                                              <input
                                                disabled={!isEdit}
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
                                        onClick={() => {
                                          if (isEdit === true) {
                                            addField();
                                          }
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faPlus} />
                                      </button>
                                    </div>
                                  );
                                })}
                            </div>

                            <br />
                            {/* <button
                            type="button"
                            className="delete_btn hidden tab_lst_add"
                            onClick="removeItem(this)"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button> */}
                            <button
                              type="submit"
                              // type="button"
                              className="edit"
                              // onClick={submitPriceVariant}
                            >
                              {isEdit ? "Save" : "Edit"}
                            </button>
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
                    className="tb_c"
                    style={{
                      // display: "none",
                      marginTop: "20px",
                    }}
                  >
                    <div className="img_info">
                      <div className="img_contains">
                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img1"
                              name="img1"
                              defaultValue="img1"
                            />

                            <img
                              src={require("../../../assets/images/add_mnu_dish.png")}
                              alt="image1"
                            />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                          </div>
                          <div className="img_icons">
                            <FontAwesomeIcon icon={faEye} size="2xl" />
                            <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                            <FontAwesomeIcon icon={faTrash} size="2xl" />
                          </div>
                        </div>
                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img2"
                              name="img2"
                              defaultValue="img2"
                            />
                            <img
                              src={require("../../../assets/images/add_mnu_dish.png")}
                              alt="image2"
                            />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                            <div className="img_icons">
                              <FontAwesomeIcon icon={faEye} size="2xl" />
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                size="2xl"
                              />
                              <FontAwesomeIcon icon={faTrash} size="2xl" />
                            </div>
                          </div>
                        </div>
                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img3"
                              name="img3"
                              defaultValue="img1"
                            />
                            <img
                              src={require("../../../assets/images/add_mnu_dish.png")}
                              alt="image3"
                            />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                            <div className="img_icons">
                              <FontAwesomeIcon icon={faEye} size="2xl" />
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                size="2xl"
                              />
                              <FontAwesomeIcon icon={faTrash} size="2xl" />
                            </div>
                          </div>
                        </div>

                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img4"
                              name="img4"
                              defaultValue="img4"
                            />
                            <img
                              src={require("../../../assets/images/add_mnu_dish.png")}
                              alt="image4"
                            />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                            <div className="img_icons">
                              <FontAwesomeIcon icon={faEye} size="2xl" />
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                size="2xl"
                              />
                              <FontAwesomeIcon icon={faTrash} size="2xl" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="img_upload">
                        <p>
                          Click on the "Choose File" button to upload a image:
                        </p>
                        <form action="">
                          <input type="file" id="myFile" name="filename" />
                          {/* <input type="submit" /> */}
                        </form>
                      </div>
                    </div>
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

export default ProductDetail;
