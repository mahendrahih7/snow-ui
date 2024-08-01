import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";

import NavBar from "../../common/Nav/NavBar";
import { allPurchaseOrder } from "../../../redux/features/sellers/sellerPurchaseSlice";

const PurchaseOrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const { loading, POList } = useSelector((state) => state.sellerPurchase);

  console.log(POList, "POList");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = POList?.slice(firstIndex, lastIndex);
  console.log(records, "records");

  const npage = POList?.length > 0 && Math.ceil(POList.length / recordsPerPage);
  console.log(npage, "npage");
  const numbers = [...Array(npage + 1).keys()].slice(1);
  console.log(numbers, "numbers");

  useEffect(() => {
    dispatch(allPurchaseOrder());
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
      <div className="ttl_mdl"></div>
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

            <div className="outr-right-content">
              <div className="oder_history">
                <div className="order_hdr">
                  <div className="ordre_lft">
                    <h6>List Of Purchase Order</h6>
                  </div>
                  <div className="ordre_rght">
                    {/* <div className="ordr_srch_bx">
                      <input type="search" placeholder="Search Order Id" />
                      <span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                      </span>
                    </div> */}
                    {/* <div className="ordr_date_bx">
                      <input type="date" />
                    </div> */}
                  </div>
                </div>
                <div className="orders">
                  <button
                    type="submit"
                    href="javascript:void(0);"
                    className="edit"
                    onClick={() => navigate("/purchase/purchase-order")}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Create Purchase Order
                  </button>
                  <div className="ordr_tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Purchase Order</th>
                          <th>Supplier Name</th>
                          <th>Payment Terms</th>
                          <th>Status</th>
                          <th>Amount</th>
                          <th>Expected Delivery Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records &&
                          records.length > 0 &&
                          records.map((po) => {
                            return (
                              <tr key={po?._id}>
                                <td>
                                  <div className="div1">
                                    <div className="o_div_txt">
                                      <h5>
                                        {po?.dateOfPurchaseOrder
                                          .slice(0, 10)
                                          .split("-")
                                          .reverse()
                                          .join("/")}
                                      </h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{po?.purchaseOrderNumber}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{po?.supplierId?.name}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{po?.paymentTerm}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    {po.isBilled ? (
                                      <h5 style={{ color: "blue" }}>Billed</h5>
                                    ) : (
                                      <h5 style={{ color: "red" }}>
                                        Not Billed
                                      </h5>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{po?.totalAmount}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>
                                      {po?.expectedDeliveryDate
                                        .slice(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <span>
                                      <FontAwesomeIcon
                                        style={{
                                          cursor: "pointer",
                                          color: "black",
                                        }}
                                        icon={faEye}
                                        size="2xl"
                                        onClick={() =>
                                          navigate(
                                            `/purchase/purchase-order-detail/${po._id}`
                                          )
                                        }
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
    </>
  );
};

export default PurchaseOrderList;
