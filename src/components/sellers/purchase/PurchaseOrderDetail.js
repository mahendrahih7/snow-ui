import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";

import NavBar from "../../common/Nav/NavBar";
import {
  allPurchaseOrder,
  POdetail,
} from "../../../redux/features/sellers/sellerPurchaseSlice";

const PurchaseOrderDetail = () => {
  const { id } = useParams();
  console.log(id, "id000");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);

  const { loading, purchaseOrderDetail } = useSelector(
    (state) => state.sellerPurchase
  );
  console.log(purchaseOrderDetail, "purchaseOrderDetail");

  useEffect(() => {
    dispatch(POdetail(id)).then((res) => {
      console.log(res, "resOrderDetail");
      const { products } = res.payload;
      let result = 0;
      for (let product of products) {
        // console.log(product, "product666");
        result += product.totalCost;
      }
      console.log(result, "result");
      setTotalAmount(result);
    });
  }, []);

  return (
    <>
      <div className="ttl_mdl"></div>
      {!loading && (
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
                <div className="outr-right-content splr_frm_cntnt nw_prchs_ordr">
                  <div className="splr_frm_ttl">
                    {!purchaseOrderDetail?.isBilled && (
                      <div className="sply_edcvt_btns">
                        <button
                          className="edit"
                          onClick={() => navigate(`/purchase/bill/${id}`)}
                        >
                          {" "}
                          Convert to Bill
                        </button>
                      </div>
                    )}
                    <div className="splr_frm_main">
                      <form>
                        <div className="splr_frm_flx">
                          <div className="prch_ordtl_flx">
                            <div className="form-group">
                              <div className="td_hdr">
                                <h3>PURCHASE ORDER</h3>
                              </div>
                              <label>
                                Purchase Order #
                                <span>
                                  <b>
                                    {purchaseOrderDetail?.purchaseOrderNumber}
                                  </b>
                                </span>
                              </label>
                              <div className="ord_bl_otr">
                                {/* <h6>STATUS</h6> */}
                                <div className="ord_bl_prts">
                                  {/* <div className="ord_bl_flxs">
                                  <span className="spn_lft">Order</span>
                                  <span className="spn_rght bx">CLOSED</span>
                                </div> */}
                                  <div className="ord_bl_flxs">
                                    <span className="spn_lft">Bill</span>
                                    <span className="spn_rght">
                                      {purchaseOrderDetail?.isBilled
                                        ? "Billed"
                                        : "Not Billed"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="prch_ordr_blfull">
                                <div className="ord_bl_prts">
                                  <div className="ord_bl_flxs">
                                    <span className="blfull_lft">
                                      ORDER DATE
                                    </span>
                                    <span className="blfull_rght">
                                      {purchaseOrderDetail?.dateOfPurchaseOrder
                                        ?.slice(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                    </span>
                                  </div>
                                  <div className="ord_bl_flxs">
                                    <span className="blfull_lft">
                                      DELIVERY DATE
                                    </span>
                                    <span className="blfull_rght">
                                      {purchaseOrderDetail?.expectedDeliveryDate
                                        ?.slice(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                    </span>
                                  </div>
                                  <div className="ord_bl_flxs">
                                    <span className="blfull_lft">
                                      PAYMENT TERMS
                                    </span>
                                    <span className="blfull_rght">
                                      {purchaseOrderDetail?.paymentTerm}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="bnds_adrs">
                                <div className="adrs_dtls">
                                  <h6>SUPPLIER ADDRESS</h6>
                                  <span style={{ color: "#408dfb" }}>
                                    {purchaseOrderDetail?.supplierId?.name}
                                  </span>
                                  <p>
                                    {
                                      purchaseOrderDetail?.supplierId
                                        ?.address[0].street
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.supplierId
                                        ?.address[0].city
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.supplierId
                                        ?.address[0].state
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.supplierId
                                        ?.address[0].country
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.supplierId
                                        ?.address[0].zipCode
                                    }
                                    <br />
                                  </p>
                                </div>
                              </div>
                              <div className="bnds_adrs">
                                <div className="adrs_dtls">
                                  <h6>DELIVERY ADDRESS</h6>
                                  <span style={{ color: "#408dfb" }}>
                                    {
                                      purchaseOrderDetail?.warehouseId
                                        ?.warehouseName
                                    }
                                  </span>
                                  <p>
                                    {
                                      purchaseOrderDetail?.warehouseId?.address
                                        .street
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.warehouseId?.address
                                        .city
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.warehouseId?.address
                                        .state
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.warehouseId?.address
                                        .country
                                    }
                                    <br />
                                    {
                                      purchaseOrderDetail?.warehouseId?.address
                                        .zipcode
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="prchs_itm_tbl">
                      <table>
                        <thead>
                          <tr>
                            <th>ITEMS &amp; DESCRIPTION</th>
                            <th>ORDERED QUANTITY</th>
                            <th>RATE</th>
                            <th>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchaseOrderDetail?.products?.length > 0 &&
                            purchaseOrderDetail?.products?.map((product) => {
                              return (
                                <tr key={product._id}>
                                  <td>
                                    {product.productId.productInfo.name}
                                    <br />
                                    {`Price: ${product.variantId.variant.Price}`}{" "}
                                    {`Color: ${product.variantId.variant.Color}`}
                                  </td>
                                  <td>{product.quantity}</td>
                                  <td>{product.unitCost}</td>
                                  <td>{product.totalCost}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="prchs_rows">
                      {/* <div className="prchs_add_btn">
                      <a className="prchs_add_row" href="javascript:void(0);">
                        <i className="fas fa-plus-circle" /> Add New Row
                      </a>
                    </div> */}
                      <div className="prchs_ordr_bl_ttl">
                        <div className="prchs_ordr_bl_top">
                          {/* <div className="prchs_ttl prchs_ordr_bl">
                          <span className="prchs_ordr_bl_left">
                            Sub Total
                            <div className="prchs_ttl_qntnt">
                              Total Quantity : <span>10</span>
                            </div>
                          </span>
                          <span className="prchs_ordr_bl_right">
                            ₹10,000.00
                          </span>
                        </div> */}
                          {/* <div className="prchs_ttl prchs_ordr_bl grey">
                          <span className="prchs_ordr_bl_left">Discount</span>
                          <span className="prchs_ordr_bl_right">₹1,000.00</span>
                        </div> */}
                        </div>
                        <div className="prchs_ordr_bl_bttm">
                          <div className="prchs_ttl prchs_ordr_bl">
                            <span className="prchs_ordr_bl_left">Total</span>
                            <span className="prchs_ordr_bl_right">
                              ₹{totalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default PurchaseOrderDetail;
