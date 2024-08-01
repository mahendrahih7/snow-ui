import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEye,
  faMagnifyingGlass,
  faPlus,
  faStar,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ordr_img1 from "../../../assets/images/ordr_img1.png";

import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import {
  logout,
  sellerProduct,
} from "../../../redux/features/sellers/sellerLoginSlice";
import { allProducts } from "../../../redux/features/sellers/sellerProductSlice";
import axios from "axios";
import NavBar from "../../common/Nav/NavBar";
import { addSupplierInfo } from "../../../redux/features/sellers/sellerPurchaseSlice";
import { addWarehouse } from "../../../redux/features/sellers/sellerWarehouseSlice";

const AddWarehouse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [warehouseInfo, setWarehouseInfo] = useState({
    warehouseName: "",
    email: "",
    phone: 0,
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const changeHandler = (e) => {
    if (e.target.type === "text") {
      setWarehouseInfo({ ...warehouseInfo, [e.target.name]: e.target.value });
    } else if (e.target.type === "email") {
      setWarehouseInfo({ ...warehouseInfo, [e.target.name]: e.target.value });
    } else if (e.target.type === "number") {
      setWarehouseInfo({ ...warehouseInfo, [e.target.name]: e.target.value });
    }
  };

  const submitWarehouseData = (e) => {
    e.preventDefault();
    console.log(warehouseInfo, "warehouseInfo");
    dispatch(addWarehouse(warehouseInfo));
    navigate("/warehouse/warehouse-list");
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
                <img
                  src={require("../../../assets/images/nav_btm_logo.png")}
                  alt="btm-logo"
                />
              </div>
            </div>
          </div>
          <div className="right_parent_element">
            <NavBar />
            {/* <Topbar/> */}

            <div className="outr-right-content">
              <div className="outr-right-content splr_frm_cntnt">
                <div className="splr_frm_ttl">
                  <div className="splr_frm_main">
                    <form onSubmit={(e) => submitWarehouseData(e)}>
                      <div className="splr_frm_flx">
                        <div className="form-group">
                          <label>Warehouse Name</label>
                          <input
                            required
                            type="text"
                            name="warehouseName"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email Id</label>
                          <input
                            required
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            type="number"
                            name="phone"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>Street</label>
                          <input
                            type="text"
                            name="street"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>Zipcode</label>
                          <input
                            type="text"
                            name="zipcode"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            name="country"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                        {/* <div className="form-group">
                          <label>ZipCode</label>
                          <input
                            type="text"
                            name="zipCode"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div> */}
                        {/* <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            name="country"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div> */}
                        {/* <div className="form-group">
                          <label>Tax Rate</label>
                          <select className="form-control">
                            <option value="tax-rate">Tax Rate</option>
                            <option value="tax-rate">Tax Rate</option>
                            <option value="tax-rate">Tax Rate</option>
                          </select>
                        </div> */}
                        {/* <div className="form-group">
                          <label>Tax Category</label>
                          <select className="form-control">
                            <option value="tax-category">Tax Category</option>
                            <option value="tax-category">Tax Category</option>
                            <option value="tax-category">Tax Category</option>
                          </select>
                        </div> */}
                        {/* <div className="form-group">
                          <label>Status</label>
                          <div className="sppl_tgls">
                            <div className="sppl_mn_tgl">
                              <span>Inactive</span>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={changeHandler}
                                />
                                <span className="slider round" />
                              </label>
                            </div>
                            <div className="sppl_mn_tgl">
                              <span>Active</span>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <button
                        type="submit"
                        href="javascript:void(0);"
                        className="btn_add_supplier"
                      >
                        Add Warehouse
                      </button>
                    </form>
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

export default AddWarehouse;
