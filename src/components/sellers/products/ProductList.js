import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEye,
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
import NavBar from "../../common/Nav/NavBar";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [toggleClick, setToggleClick] = useState(false);

  const { loading, products } = useSelector((state) => state.sellerProducts);
  console.log(products, "productsList");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products?.slice(firstIndex, lastIndex);
  console.log(records, "records");

  const npage = Math.ceil(products.length / recordsPerPage);
  console.log(npage, "npage");
  const numbers = [...Array(npage + 1).keys()].slice(1);
  console.log(numbers, "numbers");

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

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo(0, 0);
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo(0, 0);
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
                          <th>Brand</th>
                          <th>Category</th>
                          <th>
                            Sub
                            <br />
                            Category
                          </th>
                          <th>
                            Shipping <br />
                            Charge
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records &&
                          records.length > 0 &&
                          records.map((product) => {
                            console.log(product, "99");
                            return (
                              <tr key={product?._id}>
                                <td>
                                  <div className="div1">
                                    <div className="o_div_txt">
                                      <h5>{product?.productInfo?.name}</h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{product?.productInfo?.brand?.name}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>
                                      {product?.productInfo?.category?.name}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>
                                      {product?.productInfo?.subCategory?.name}
                                    </h5>
                                  </div>
                                </td>

                                <td>
                                  <div className="div2">
                                    <h5>
                                      {
                                        product?.productInfo?.shippingDetails
                                          ?.shippingCharge
                                      }
                                    </h5>
                                  </div>
                                </td>

                                <td>
                                  <div className="div2">
                                    <span>
                                      <FontAwesomeIcon
                                        style={{ cursor: "pointer" }}
                                        icon={faEye}
                                        size="2xl"
                                        onClick={() =>
                                          navigate(
                                            `/products/product-detail/${product?._id}`
                                          )
                                        }
                                      />
                                    </span>
                                    <span style={{ marginLeft: "20px" }} />
                                    <span>
                                      <FontAwesomeIcon
                                        style={{
                                          color: "#da0b20",
                                          cursor: "pointer",
                                        }}
                                        icon={faTrash}
                                        size="2xl"
                                      />
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* pagination */}
                <div className="pagination">
                  <a href="javascript:void(0);" onClick={prePage}>
                    «
                  </a>
                  {numbers.map((n, i) => (
                    <a
                      href="javascript:void(0);"
                      key={i}
                      onClick={() => changeCPage(n)}
                      className={`${currentPage === n ? "active" : ""}`}
                    >
                      {n}
                    </a>
                  ))}

                  {/* <a href="javascript:void(0);" className="active">
                    02
                  </a>
                  <a href="javascript:void(0);">03</a>
                  <a href="javascript:void(0);">04</a> */}
                  <a href="javascript:void(0);" onClick={nextPage}>
                    »
                  </a>
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
