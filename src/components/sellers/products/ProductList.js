import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
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

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [toggleClick, setToggleClick] = useState(false);

  const { loading, products } = useSelector((state) => state.sellerProducts);
  console.log(products, "productsList");

  const handleLogout = () => {
    // e.preventDefault();
    console.log("called", "logout");
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(logout());
        // console.log(res, "response");
        localStorage.removeItem("token");
        toast.success("logout successfully", {
          className: "toast-message",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // theme: 'dark',
          transition: Bounce,
        });
        navigate("/seller-login");
      }
    });
  };

  useEffect(() => {
    dispatch(allProducts());
  }, []);

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
            <div
              className={toggle ? "outr_parent_nav active" : "outr_parent_nav"}
            >
              <div className="lft_p_nav">
                <div className="sidebar">
                  <img
                    src={require("../../../assets/images/Sidebar.png")}
                    alt="sidebar"
                  />
                </div>
                <div className="star">
                  <FontAwesomeIcon icon={faStar} size="2xl" />
                </div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="javascript:void(0);">Dashboards</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Default
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="rgt_p_nav">
                <div className="search_bar">
                  <form action="">
                    <input
                      type="search"
                      placeholder="Search order"
                      className="search_holder"
                    />
                    <input type="button" className="search-btn" />
                    <div className="icon">
                      <img
                        src={require("../../../assets/images/Text.png")}
                        alt="text"
                      />
                    </div>
                  </form>
                </div>
                <div className="all_r_btn">
                  <div className="user_icon">
                    <div className="user">
                      <FontAwesomeIcon
                        icon={faUser}
                        onClick={() => setToggleClick(!toggleClick)}
                      />
                      {toggleClick && (
                        <div className="user_login">
                          <Link to="/signup">Login</Link>
                          <a href="javascript:void(0)">Registration</a>
                          <a href="/update-password">Update Password</a>
                          <Link onClick={handleLogout}>Logout</Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="dark_light">
                    <div className="sun">
                      <img
                        src={require("../../../assets/images/sun.png")}
                        alt="sun"
                      />
                    </div>
                  </div>
                  <div className="counter">
                    <img
                      src={require("../../../assets/images/counter_btn.png")}
                      alt="counter"
                    />
                  </div>
                  <div
                    className="notification"
                    onClick={() => setToggle(!toggle)}
                  >
                    <img
                      src={require("../../../assets/images/bell.png")}
                      alt="bell"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <Topbar/> */}

            <div className="outr-right-content">
              {/* <HomePage/> */}
              {/* <Outlet /> */}
              <div className="oder_history">
                <div className="order_hdr">
                  <div className="ordre_lft">
                    <h6>Product List</h6>
                    {/* <p>Manage your recent products and invoices.</p> */}
                  </div>
                  <div className="ordre_rght">
                    <div className="ordr_srch_bx">
                      <input type="search" placeholder="Search Order Id" />
                      <span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                      </span>
                    </div>
                    <div className="ordr_date_bx">
                      <input type="date" />
                    </div>
                  </div>
                </div>
                <div className="orders">
                  <div className="ordr_tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          {/* <th>Description</th> */}
                          <th>Brand</th>
                          <th>Category</th>
                          <th>
                            Sub
                            <br />
                            Category
                          </th>
                          <th>MRP</th>
                          <th>Tax</th>
                          <th>
                            Shipping <br />
                            Charge
                          </th>
                          <th>
                            Manufacturing <br /> Date
                          </th>
                          {/* <th>Status</th> */}
                          {/* <th>Info</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.length > 0 &&
                          products.map((product) => {
                            return (
                              <tr>
                                <td>
                                  <div className="div1">
                                    <div className="o_div_img">
                                      <img
                                        src={product?.product?.productPicture}
                                      />
                                    </div>
                                    <div className="o_div_txt">
                                      <h4>{product?.product._id}</h4>
                                      <h5>{product?.product.name}</h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{product?.product?.brand?.name}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{product?.product?.category?.name}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>
                                      {product?.product?.subCategory?.name}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{product?.product?.MRP}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{product?.product?.tax}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{product?.product?.shippingCharge}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>
                                      {product?.product?.manufacturingDate.slice(
                                        0,
                                        10
                                      )}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      size="2xl"
                                      style={{ color: "#da0b20" }}
                                    />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}

                        {/* <tr>
                          <td>
                            <div className="div1">
                              <div className="o_div_img">
                                <img
                                  src={require("../../assets/images/ordr_img2.png")}
                                />
                              </div>
                              <div className="o_div_txt">
                                <h5>#907654</h5>
                                <p>Crispy Calamari</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="div2">
                              <h5>Mar 17,2023</h5>
                            </div>
                          </td>
                          <td>
                            <div className="div2">
                              <h5>T2</h5>
                            </div>
                          </td>
                          <td>
                            <div className="div2">
                              <h5>₹640.0</h5>
                            </div>
                          </td>
                          <td>
                            <div className="div2">
                              <span>
                                <h6>PAID</h6>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="colon">
                              <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                size="2xl"
                              />
                            </span>
                          </td>
                          <td>
                            <span>
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="2xl"
                                style={{ color: "#da0b20" }}
                              />
                            </span>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* pagination */}
                <div className="pagination">
                  <a href="javascript:void(0);">«</a>
                  <a href="javascript:void(0);">01</a>
                  <a href="javascript:void(0);" className="active">
                    02
                  </a>
                  <a href="javascript:void(0);">03</a>
                  <a href="javascript:void(0);">04</a>
                  <a href="javascript:void(0);">»</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* moumi 12.2.24 */}
    </>
  );
};

export default ProductList;
