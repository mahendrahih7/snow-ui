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
import { inventoryDetail } from "../../../redux/features/sellers/sellerInventorySlice";

const InventorySummery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const { loading, inventory } = useSelector((state) => state.sellerInventory);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = inventory?.slice(firstIndex, lastIndex);
  console.log(records, "records");

  const npage =
    inventory?.length > 0 && Math.ceil(inventory.length / recordsPerPage);
  console.log(npage, "npage");
  const numbers = [...Array(npage + 1).keys()].slice(1);
  console.log(numbers, "numbers");

  useEffect(() => {
    dispatch(inventoryDetail());
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
                    <h6>Inventory Summery</h6>
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
                  {/* <button
                    type="submit"
                    href="javascript:void(0);"
                    className="edit"
                    onClick={() => navigate("/purchase/purchase-order")}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Create Purchase Order
                  </button> */}
                  <div className="ordr_tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>SKU</th>
                          <th>Reorder Level</th>
                          <th>Quantity Ordered</th>
                          <th>Quantity In</th>
                          <th>Quantity Out</th>
                          <th>Stock On Hand</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {records &&
                          records.length > 0 &&
                          records.map((invent, i) => {
                            console.log(invent, "invent");

                            return (
                              <tr key={i}>
                                <td>
                                  <div className="div1">
                                    <div className="o_div_txt">
                                      <h5>
                                        {invent.productId.productInfo.name}
                                        <br />
                                        {`Price: ${invent.variant.Price} Color: ${invent.variant.Color}`}
                                      </h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{invent.variant.sku}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{invent.variant.Reordered_Level}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{invent.quantityOrdered}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{invent.quantityIn}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    <h5>{invent.quantityOut}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="div2">
                                    {invent.variant.Reordered_Level >
                                    invent.quantityIn - invent.quantityOut ? (
                                      <span
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <h5
                                          style={{
                                            // color: "red",
                                            marginRight: "30px",
                                          }}
                                        >
                                          {invent.quantityIn -
                                            invent.quantityOut}
                                        </h5>
                                        <h5 style={{ color: "red" }}>
                                          (Low Stock)
                                        </h5>
                                      </span>
                                    ) : (
                                      <h5>
                                        {invent.quantityIn - invent.quantityOut}
                                      </h5>
                                    )}
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

export default InventorySummery;
