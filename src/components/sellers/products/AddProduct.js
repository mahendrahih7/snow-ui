import { faPlus, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import NavBar from "../../common/Nav/NavBar";

const AddProduct = () => {
  const tableRef = useRef(null);
  const myRefKey = useRef();
  const myRefVal = useRef();
  const [rows, setRows] = useState([]);
  const [potencyDiv, setPotencyDiv] = useState([]);
  const [potencyArr, setPotencyArr] = useState([]);
  const [potencyChild, setPotencyChild] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [potencyDivIndex, setPotencyDivIndex] = useState([]);

  console.log(potencyDivIndex, "potencyDivIndex");
  console.log(potencyArr, "potencyArr");

  // console.log(rows, "rows");
  // console.log(potencyDiv, "potencyDiv");
  // console.log(productTags, "productTags");

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

  const showPotencyDiv = (index) => {
    console.log("clickedDiv");
    setPotencyDiv([...potencyDiv, {}]);
    setPotencyDivIndex([...potencyDivIndex, index]);
  };

  const handleChange = (event, index) => {
    const arr = [...rows];
    arr[index][event.target.name] = event.target.value;
    setProductTags([...arr]);
  };

  const handleSubmit = (e) => {
    console.log(productTags, "productTags");
  };

  const addPotency = () => {
    setPotencyArr([...potencyArr, {}]);
  };

  const addPotencyChild = (index) => {
    console.log(index, "indexChild");
    if (index === 1) {
      setPotencyChild([...potencyChild, {}]);
    }
  };

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
                      onClick="open_tabs(event,'product_info')"
                    >
                      <span>
                        <i className="fa-solid fa-bag-shopping" />
                      </span>
                      Product Info
                    </button>
                    <button
                      className="tabs_c"
                      onClick="open_tabs(event,'prices')"
                    >
                      <span>
                        <i className="fa-solid fa-sack-dollar" />
                      </span>{" "}
                      Prices
                    </button>
                    <button
                      className="tabs_c"
                      onClick="open_tabs(event,'inventory')"
                    >
                      <span>
                        <i className="fa-solid fa-bag-shopping" />
                      </span>
                      Inventory
                    </button>
                    <button
                      className="tabs_c"
                      onClick="open_tabs(event,'batches')"
                    >
                      <span>
                        <i className="fa-solid fa-image" />
                      </span>{" "}
                      Batches
                    </button>
                    <button
                      className="tabs_c"
                      onClick="open_tabs(event,'images')"
                    >
                      <span>
                        <i className="fa-solid fa-image" />
                      </span>{" "}
                      Images
                    </button>
                  </div>
                </div>
                <div id="product_info" className="tb_c">
                  <div className="p_info">
                    <div className="e-edit">
                      <a href="javascript:void(0);" className="edit">
                        Edit
                      </a>
                    </div>
                  </div>
                  <div className="total_p_rows">
                    {/*  */}
                    <div className="p_rows">
                      <div className="p_total" id="table_body1">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            className="addMain"
                            placeholder="Product Type"
                          />
                          <input
                            type="text"
                            className="addPrefer"
                            placeholder="REGULAR"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body1')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body2">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Product Name" />
                          <input type="text" placeholder="10Bandz" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body2')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body3">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Cannabis Type" />
                          <input
                            type="text"
                            placeholder="Inherit from Category"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body3')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body4">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Status" />
                          <input type="text" placeholder="Active" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body4')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body5">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Category" />
                          <input type="text" placeholder="Premium" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body5')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body6">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Metric Category" />
                          <input type="text" placeholder="Flower" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body6')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body7">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Metric Item Id" />
                          <input type="text" placeholder="" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body7')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body8">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Weight Per Unit" />
                          <input type="text" placeholder="Custom" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body8')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body9">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Custom Weight Option"
                          />
                          <input type="text" placeholder="Gram" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body9')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body10">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Custom Weight Value"
                          />
                          <input type="text" placeholder="3.5" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body10')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body11">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Weight Per Unit" />
                          <input type="text" placeholder="Custom" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body11')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body12">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Pricing Template" />
                          <input
                            type="text"
                            placeholder="Alien Labs/Connected 3.5g 3/2023"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body12')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body13">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Weight Per Unit" />
                          <input type="text" placeholder="Custom" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body13')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body14">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Retail Value" />
                          <input type="text" placeholder="$51.00" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body14')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body15">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Same Price Mix & Match"
                          />
                          <input type="text" placeholder="Inactive" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body15')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body16">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Flower type" />
                          <input type="text" placeholder="Hybrid" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body16')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body17">
                        <div className="p_c_lft">
                          <input type="text" placeholder="SKU" />
                          <input type="text" placeholder="H231PRO1" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body17')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body18">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Strain" />
                          <input type="text" placeholder="" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body18')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body19">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Vendor" />
                          <input type="text" placeholder="2JC, LLC" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body19')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body20">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Secondary Vendors" />
                          <input type="text" placeholder="" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body20')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body21">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Brand" />
                          <input
                            type="text"
                            placeholder="Connected Cannabis Co"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body21')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body22">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Price Includes Excise Tax"
                          />
                          <input type="text" placeholder="No" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body22')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body23">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Sell Type" />
                          <input type="text" placeholder="Both" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body23')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body24">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Sync to Third Party Menus"
                          />
                          <input type="text" placeholder="No" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body24')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body25">
                        <div className="p_c_lft">
                          <input type="text" placeholder="Description" />
                          <input
                            type="text"
                            placeholder="Introducing 10 Bandz"
                          />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body25')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body26">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Show In Online Widget"
                          />
                          <input type="text" placeholder="Yes" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body26')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                      <div className="p_total" id="table_body27">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            placeholder="Show Potency (mg) on Web"
                          />
                          <input type="text" placeholder="No" />
                          <span
                            className="add_btn"
                            onClick="create_tr('table_body27')"
                          >
                            <i className="fa-solid fa-plus" />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* potency */}
                    <div className="main_p_inform" id="tbDiv001">
                      <div className="p_inform">
                        <div className="p_total p_hdng" id="table_body">
                          <div className="p_c_lft">
                            <input
                              type="text"
                              placeholder="Potency"
                              className="table_body01"
                            />
                            <span
                              className="add_btn"
                              onClick={() => showPotencyDiv()}
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
                            <div className="p_c_lft">
                              <input
                                type="text"
                                className="addMain"
                                placeholder="Total THC (mg)"
                              />
                              <input
                                type="text"
                                className="addPrefer"
                                placeholder="0.00mg"
                              />
                              <span
                                className="add_btn"
                                onClick={() => addPotency()}
                                // onClick="create_tr('table_body29')"
                              >
                                <FontAwesomeIcon icon={faPlus} size="2xl" />
                              </span>
                            </div>
                            {potencyArr.map((potency, i) => {
                              return (
                                <div className="p_c_lft" key={i}>
                                  <input
                                    type="text"
                                    className="addMain"
                                    placeholder="Total THC (mg)"
                                  />
                                  <input
                                    type="text"
                                    className="addPrefer"
                                    placeholder="0.00mg"
                                  />
                                  <span
                                    className="add_btn"
                                    onClick={() => addPotency()}
                                  >
                                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {potencyDiv.map((div, index) => {
                      return (
                        <div className="main_p_inform" key={index}>
                          <div className="p_inform">
                            <div className="p_total p_hdng" id="table_body">
                              <div className="p_c_lft">
                                <input
                                  type="text"
                                  placeholder="Potency"
                                  className="table_body01"
                                />
                                <span
                                  className="add_btn"
                                  onClick={() => showPotencyDiv(index)}
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
                                ref={tableRef}
                              >
                                <div className="p_c_lft">
                                  <input
                                    type="text"
                                    className="addMain"
                                    placeholder="Total THC (mg)"
                                  />
                                  <input
                                    type="text"
                                    className="addPrefer"
                                    placeholder="0.00mg"
                                  />
                                  <span
                                    className="add_btn"
                                    onClick={() => addPotencyChild(index)}
                                  >
                                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                                  </span>
                                </div>
                                {/* ..................................................................................... */}
                                {index === 1 &&
                                  potencyChild.map((potency, i) => {
                                    return (
                                      <div className="p_c_lft" key={i}>
                                        <input
                                          type="text"
                                          className="addMain"
                                          placeholder="Total THC (mg)"
                                        />
                                        <input
                                          type="text"
                                          className="addPrefer"
                                          placeholder="0.00mg"
                                        />
                                        <span
                                          className="add_btn"
                                          onClick={() => addPotencyChild(index)}
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
                        </div>
                      );
                    })}

                    <div className="p_rows">
                      <div className="p_total" id="table_body42">
                        <div className="p_c_lft">
                          <input
                            type="text"
                            ref={myRefKey}
                            className="addMain"
                            placeholder="Product Tags"
                            // onChange={handleChange}
                          />
                          <input
                            type="text"
                            ref={myRefVal}
                            className="addPrefer"
                            placeholder="Flower Box,Connected Cannabis Co."
                            // onChange={handleChange}
                          />
                          <span className="add_btn" onClick={addRowProductTags}>
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
                                onChange={(e) => handleChange(e, i)}
                              />
                              <input
                                type="text"
                                name="value"
                                ref={myRefVal}
                                className="addPrefer"
                                placeholder="Flower Box,Connected Cannabis Co."
                                onChange={(e) => handleChange(e, i)}
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
                      {/* <button onClick={handleSubmit}>Submit</button> */}
                    </div>

                    <div className="p_rows">
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
                    </div>
                  </div>
                </div>
                <div id="prices" className="tb_c" style={{ display: "none" }}>
                  <div className="title-bx" id="price_tab">
                    <div className="outr_title">
                      <ul id="list" className="listitem">
                        <li className="litext">Color</li>
                        <li className="litext">Weight</li>
                        <li className="litext currentItem">Price</li>
                      </ul>
                      <button type="" className="add_title tab_lst_add">
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                    <div className="title_add_outr hidden">
                      <input
                        type="text"
                        defaultValue=""
                        className="input-field hidden"
                      />
                      <button type="button" className="add__btn">
                        Add
                      </button>
                    </div>
                    <div id="pro_header">
                      <div className="outr_all_header">
                        <div className="all_title">
                          <div className="input-field-outr">
                            <span>Price</span>
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="add_row hidden tab_lst_add"
                          onClick="addField(this)"
                        >
                          <i className="fas fa-plus" />
                        </button>
                        <button
                          type="button"
                          className="delete_btn hidden tab_lst_add"
                          onClick="removeItem(this)"
                        >
                          <i className="fa-solid fa-minus" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                            <select name="transfer_to" className="form-control">
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
                <div id="batches" className="tb_c" style={{ display: "none" }}>
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
