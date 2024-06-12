import {
  faBagShopping,
  faDollarSign,
  faImage,
  faMinus,
  faPlus,
  faSackDollar,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import NavBar from "../../common/Nav/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  allBrand,
  productCategory,
  productChildCat,
} from "../../../redux/features/sellers/sellerProductSlice";
import Price from "./Price";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  // const tableRef = useRef(null);
  // const myRefKey = useRef();
  // const myRefVal = useRef();
  // const keyRef = useRef();
  // const valRef = useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [tabs, setTabs] = useState("product_info");
  const [productInfo, setProductInfo] = useState({
    product_name: "",
    status: "",
    category: "",
    sub_category: "",
    child_category: "",
    sku: "",
    brand: "",
    description: "",
    shipping_charge: "",
    free_shipping: "",
  });
  const [main, setMain] = useState([
    { potency: [{ key: "", value: "" }], val: "" },
  ]);
  const [catName, setCatName] = useState("");
  const [showCreateTitle, setShowCreateTitle] = useState(false);
  const [createTitleName, setCreateTitleName] = useState("");

  const [title, setTitle] = useState(["Color", "Weight", "Price"]);

  const [inputFields, setInputFields] = useState([{ Price: "" }]);
  console.log(inputFields, "inputFields");
  const [arr, setArr] = useState([]);
  console.log(arr, "arr");

  const { category, subCategory, childCategory, brand } = useSelector(
    (state) => state.sellerProducts
  );

  function createTr(table_id) {
    console.log("called");
    let table_body = document.getElementById(table_id);
    const firstTr = table_body.firstElementChild.cloneNode(true);

    table_body.appendChild(firstTr);

    // cleanFirstTr(table_body.firstElementChild);
  }

  function cleanFirstTr(firstTr) {
    const children = Array.from(firstTr.children);

    children.forEach((child, index) => {
      if (index !== children.length - 1) {
        child.firstElementChild.value = "";
      }
    });
  }

  const addRowProductTags = () => {
    setRows([...rows, { key: "", value: "" }]);
    console.log(rows, "rows");
  };

  const handleChange = (event, index) => {
    const arr = [...rows];
    arr[index][event.target.name] = event.target.value;
    setProductTags([...arr]);
  };

  const handleSubmit = (e) => {
    console.log(productTags, "productTags");
  };

  useEffect(() => {
    dispatch(productCategory());
    dispatch(allBrand());
  }, []);

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

  const changeHandler = (e, mainInd, childInd) => {
    console.log(mainInd, childInd, "Index");
    setMain((prevData) => {
      const tableInfo = [...prevData];
      tableInfo[mainInd]["potency"][childInd][e.target.name] = e.target.value;
      return tableInfo;
    });
  };

  const headingChange = (e, index) => {
    setMain((prev) => {
      const heading = [...prev];
      heading[index]["val"] = e.target.value;
      return heading;
    });
  };

  const changeProductInfo = (e) => {
    console.log(e.target.name, "999");
    if (e.target.type === "text") {
      setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    } else {
      if (e.target.name === "category") {
        if (category.length > 0) {
          category.map((cat) => {
            if (cat.name === e.target.value) {
              setProductInfo({ ...productInfo, category: cat._id });
            }
          });
          setCatName(e.target.value);
          dispatch(productCategory(e.target.value));
        }
      } else if (e.target.name === "sub_category") {
        if (subCategory?.length > 0) {
          subCategory.map((subCat_item) => {
            console.log(e.target.value, "subCatValue");
            if (subCat_item.subCategoryName === e.target.value) {
              setProductInfo({
                ...productInfo,
                sub_category: subCat_item._id,
              });
            }
          });
          console.log(catName, e.target.value, "catDataAll");
          dispatch(
            productChildCat({ catName: catName, subCatName: e.target.value })
          );
        }
      } else if (e.target.name === "child_category") {
        if (childCategory.length > 0) {
          childCategory.map((childCat_item) => {
            if (childCat_item.childCategoryName === e.target.value) {
              setProductInfo({
                ...productInfo,
                child_category: childCat_item._id,
              });
            }
          });
        }
      } else if (e.target.name === "brand") {
        if (brand.length > 0) {
          brand.map((item) => {
            if (item.name === e.target.value) {
              setProductInfo({ ...productInfo, brand: item._id });
            }
          });
        }
      }
    }
  };

  const submitHandler = () => {
    console.log(productInfo, "productInfo");
    const productData = {
      info: productInfo,
      others: main,
    };
    console.log(productData, "productData");
    axios
      .post(`http://15.206.169.180/api/products`, productData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response.data));
  };

  const createTitle = () => {
    setShowCreateTitle(true);
  };

  const addTitle = () => {
    setShowCreateTitle(false);
    if (title.includes(createTitleName)) {
      alert("already exist");
    } else {
      setTitle([...title, createTitleName]);
    }
    setCreateTitleName("");
  };

  const getTitle = (titleName) => {
    console.log(titleName, "titleName");
    console.log(inputFields, "inputFields55");

    const result = inputFields
      .map((obj, index) => {
        return Object.keys(obj);
      })
      .flat();
    // console.log(result, "result");
    if (result.includes(titleName)) {
      alert("already exist");
    } else {
      setInputFields([...inputFields, { [titleName]: "" }]);
    }
  };

  const addField = () => {
    const combinedData = inputFields.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {}
    );
    console.log(combinedData, "combinedData");
    setArr([...arr, combinedData]);
  };

  const chngeFirstIndexData = (e, index) => {
    inputFields[index][e.target.name] = e.target.value;
  };

  const changeOtherIndexData = (e, index) => {
    console.log(e.target.name, "nametarget");
    arr[index][e.target.name] = e.target.value;
  };

  // const deleteTitle = (x) => {
  //   const newTitle = title.filter((tl) => tl !== x);
  //   console.log(newTitle, "newTitle");
  //   setTitle(newTitle);
  // };

  return (
    <>
      <main>
        <section className="total_parent_element">
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
                {/* <img src="./images/nav_btm_logo.png" alt="btm-logo" /> */}
                <img
                  src={require("../../../assets/images/nav_btm_logo.png")}
                  alt="btm-logo"
                />
              </div>
            </div>
          </div>
          <div className="right_parent_element">
            {/* ........................................................................... */}
            <NavBar />
            <div className="outr-right-content prdct_info">
              <div className="inner_tbl_bkng">
                <div className="tb_top pdtc">
                  <div className="tb_lft product_i">
                    <button
                      className="tabs_c"
                      // onClick="open_tabs(event,'product_info')"
                      onClick={() => setTabs("product_info")}
                    >
                      <span>
                        {/* <i className="fa-solid fa-bag-shopping" /> */}
                        <FontAwesomeIcon icon={faBagShopping} />
                      </span>
                      Product Info
                    </button>
                    <button
                      className="tabs_c"
                      // onClick="open_tabs(event,'prices')"
                      onClick={() => setTabs("prices")}
                    >
                      <span>
                        {/* <i className="fa-solid fa-sack-dollar" /> */}
                        <FontAwesomeIcon icon={faSackDollar} />
                      </span>{" "}
                      Prices
                    </button>
                    <button
                      className="tabs_c"
                      // onClick="open_tabs(event,'inventory')"
                      onClick={() => setTabs("inventory")}
                    >
                      <span>
                        <FontAwesomeIcon icon={faBagShopping} />
                      </span>
                      Inventory
                    </button>
                    <button
                      className="tabs_c"
                      // onClick="open_tabs(event,'batches')"
                      onClick={() => setTabs("batches")}
                    >
                      <span>
                        {/* <i className="fa-solid fa-image" /> */}
                        <FontAwesomeIcon icon={faImage} />
                      </span>{" "}
                      Batches
                    </button>
                    <button
                      className="tabs_c"
                      // onClick="open_tabs(event,'images')"
                      onClick={() => setTabs("images")}
                    >
                      <span>
                        {/* <i className="fa-solid fa-image" /> */}
                        <FontAwesomeIcon icon={faImage} />
                      </span>{" "}
                      Images
                    </button>
                  </div>
                </div>

                {/* /// PRODUCT INFO */}

                {tabs === "product_info" && (
                  <div id="product_info" className="tb_c">
                    <div className="p_info">
                      <div className="e-edit">
                        {/* <a href="javascript:void(0);" className="edit">
                          Edit
                        </a> */}
                        <button
                          href="javascript:void(0);"
                          className="edit"
                          onClick={submitHandler}
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
                              id="productName"
                              name="product_name"
                              type="text"
                              placeholder="10Bandz"
                              onChange={(e) => changeProductInfo(e)}
                            />
                          </div>
                        </div>

                        <div className="p_total" id="table_body4">
                          <div className="p_c_lft">
                            <label htmlFor="status">Status</label>
                            <input
                              id="status"
                              name="status"
                              type="text"
                              placeholder="active"
                              onChange={(e) => changeProductInfo(e)}
                            />
                          </div>
                        </div>
                        <div className="p_total" id="table_body5">
                          <div className="p_c_lft">
                            <label>Category</label>
                            <select
                              name="category"
                              id="category"
                              onChange={(e) => changeProductInfo(e)}
                            >
                              <option value="">Select Category</option>
                              {category.length > 0 &&
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
                              name="sub_category"
                              id="sub_category"
                              onChange={(e) => changeProductInfo(e)}
                            >
                              <option value="">Select sub category</option>
                              {subCategory?.length > 0 &&
                                subCategory.map((subCatItem) => {
                                  console.log(subCatItem, "subCatItem");
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
                              name="child_category"
                              id="child_category"
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

                        <div className="p_total" id="table_body17">
                          <div className="p_c_lft">
                            <label htmlFor="sku">SKU</label>
                            <input
                              id="sku"
                              name="sku"
                              type="text"
                              placeholder="H231PRO1"
                              onChange={(e) => changeProductInfo(e)}
                            />
                          </div>
                        </div>

                        <div className="p_total" id="table_body21">
                          <div className="p_c_lft">
                            <label>Brand</label>
                            <select
                              name="brand"
                              id="brand"
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
                              id="shippingCharge"
                              name="shipping_charge"
                              type="text"
                              placeholder="$10"
                              onChange={(e) => changeProductInfo(e)}
                            />
                          </div>
                        </div>
                        <div className="p_total" id="table_body26">
                          <div className="p_c_lft">
                            {/* <input type="text" placeholder="Free Shipping" /> */}
                            <label htmlFor="freeShipping">Free Shipping</label>
                            <input
                              id="freeShipping"
                              name="free_shipping"
                              type="text"
                              placeholder="true"
                              onChange={(e) => changeProductInfo(e)}
                            />
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
                                          name="key"
                                          type="text"
                                          className="addMain"
                                          placeholder="Total THC (mg)"
                                          onChange={(e) =>
                                            changeHandler(e, ind, ci)
                                          }
                                        />
                                        <input
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

                      {/* <div className="p_rows">
                        <div className="p_total" id="table_body42">
                          <div className="p_c_lft">
                            <input
                              type="text"
                              ref={myRefKey}
                              className="addMain"
                              placeholder="Product Tags"
                              // onChange={changeInput}
                            />
                            <input
                              type="text"
                              ref={myRefVal}
                              className="addPrefer"
                              placeholder="Flower Box,Connected Cannabis Co."
                              // onChange={changeInput}
                            />
                            <span
                              className="add_btn"
                              onClick={addRowProductTags}
                            >
                              <FontAwesomeIcon icon={faPlus} size="2xl" />
                            </span>
                          </div>
                          {rows.map((row, i) => {
                            console.log(row, "row");
                            console.log(i, "index");
                            return (
                              <div className="p_c_lft" key={i}>
                                <input
                                  type="text"
                                  name="key"
                                  ref={myRefKey}
                                  className="addMain"
                                  placeholder="Product Tags"
                                  onChange={(e) => changeInput(e, i)}
                                />
                                <input
                                  type="text"
                                  name="value"
                                  ref={myRefVal}
                                  className="addPrefer"
                                  placeholder="Flower Box,Connected Cannabis Co."
                                  onChange={(e) => changeInput(e, i)}
                                />
                                <span
                                  className="add_btn"
                                  onClick={addRowProductTags}
                                >
                                  <FontAwesomeIcon icon={faPlus} size="2xl" />
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div> */}

                      {/* <div className="p_rows">
                      <div className="p_total" id="table_body43">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            className="addMain"
                            placeholder="Apply cart discount for tax calculation"
                          />
                          <input
                            type="text"
                            className="addPrefer"
                            placeholder="Yes"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body43')"
                          >
                            <FontAwesomeIcon icon={faPlus} size="2xl" />
                          </span>
                        </div>
                      </div>

                      <div className="p_total" id="table_body44">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            className="addMain"
                            placeholder="Item ineligible for discount"
                          />
                          <input
                            type="text"
                            className="addPrefer"
                            placeholder="No"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body44')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                    </div> */}
                    </div>
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
                              <>
                                <li
                                  className="litext"
                                  key={i}
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
                              </>
                            ))}

                          {/* <li className="litext">Weight</li>
                          <li className="litext currentItem">Price</li> */}
                        </ul>
                        <button
                          type=""
                          className="add_title tab_lst_add"
                          onClick={createTitle}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                      {/* <div className="title_add_outr hidden">
                        <input
                          type="text"
                          defaultValue=""
                          className="input-field hidden"
                        />
                        <button type="button" className="add__btn">
                          Add
                        </button>
                      </div> */}

                      <div
                        className={`${
                          showCreateTitle
                            ? "title_add_outr"
                            : "title_add_outr hidden"
                        }`}
                      >
                        <input
                          type="text"
                          defaultValue=""
                          value={createTitleName}
                          className="input-field"
                          onChange={(e) => setCreateTitleName(e.target.value)}
                        />
                        <button
                          type="button"
                          className="add__btn"
                          onClick={addTitle}
                        >
                          ADD
                        </button>
                      </div>
                      <div id="pro_header">
                        <div className="outr_all_header">
                          <div className="all_otr">
                            <div className="all_title">
                              {/* {arr.length > 0 ? arr.map} */}
                              {inputFields.map((input, i) => (
                                <div className="input-field-outr" key={i}>
                                  <span>{Object.keys(input)[0]}</span>
                                  <input
                                    name={Object.keys(input)[0]}
                                    type="text"
                                    defaultValue=""
                                    onChange={(e) => chngeFirstIndexData(e, i)}
                                  />
                                </div>
                              ))}
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
                                // console.log(arrFromObj, "arrFromObj");

                                return (
                                  <div className="all_title">
                                    {arrFromObj.map((key, keyIndex) => {
                                      console.log(obj[key], "name");
                                      return (
                                        <div
                                          className="input-field-outr"
                                          key={objIndex}
                                        >
                                          <input
                                            type="text"
                                            name={key}
                                            defaultValue={obj[key]}
                                            key={keyIndex}
                                            onChange={(e) =>
                                              changeOtherIndexData(e, objIndex)
                                            }
                                          />
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
                          {/* <button
                            type="button"
                            className="delete_btn hidden tab_lst_add"
                            onClick="removeItem(this)"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button> */}
                          <button
                            className="edit"
                            onClick={() =>
                              console.log(
                                [
                                  inputFields.reduce(
                                    (acc, obj) => ({ ...acc, ...obj }),
                                    {}
                                  ),
                                ].concat(arr),
                                "arraySave"
                              )
                            }
                          >
                            Save
                          </button>
                        </div>
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
                  <div id="images" className="tb_c" style={{ display: "none" }}>
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
                            <img src="images/add_mnu_dish.png" alt="image1" />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                          </div>
                          <div className="img_icons">
                            <i className="fa-solid fa-eye" />
                            <i className="fa-solid fa-pen-to-square" />
                            <i className="fa-solid fa-trash" />
                          </div>
                        </div>
                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img1"
                              name="img1"
                              defaultValue="img1"
                            />
                            <img src="images/add_mnu_dish.png" alt="image1" />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                            <div className="img_icons">
                              <i className="fa-solid fa-eye" />
                              <i className="fa-solid fa-pen-to-square" />
                              <i className="fa-solid fa-trash" />
                            </div>
                          </div>
                        </div>
                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img1"
                              name="img1"
                              defaultValue="img1"
                            />
                            <img src="images/add_mnu_dish.png" alt="image1" />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                            <div className="img_icons">
                              <i className="fa-solid fa-eye" />
                              <i className="fa-solid fa-pen-to-square" />
                              <i className="fa-solid fa-trash" />
                            </div>
                          </div>
                        </div>
                        <div className="img_part">
                          <div className="img_part_img">
                            <input
                              type="checkbox"
                              id="img1"
                              name="img1"
                              defaultValue="img1"
                            />
                            <img src="images/add_mnu_dish.png" alt="image1" />
                          </div>
                          <div className="img_text">
                            <p>Food Image</p>
                            <div className="img_icons">
                              <i className="fa-solid fa-eye" />
                              <i className="fa-solid fa-pen-to-square" />
                              <i className="fa-solid fa-trash" />
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
                          <input type="submit" />
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

export default AddProduct;
