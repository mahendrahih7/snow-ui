import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "../../common/Sidebar";

import NavBar from "../../common/Nav/NavBar";
import {
  addBill,
  allSuppliers,
  POdetail,
} from "../../../redux/features/sellers/sellerPurchaseSlice";
import { allWarehouse } from "../../../redux/features/sellers/sellerWarehouseSlice";

const Bill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState({
    supplierId: "",
    warehouseId: "",
    purchaseOrderNumber: "",
    billNumber: "",
    paymentTerm: "",
    billDate: "",
    dueDate: "",
    products: [],
    totalAmount: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  useEffect(() => {
    dispatch(allSuppliers());
  }, []);

  useEffect(() => {
    dispatch(allWarehouse());
  }, []);

  useEffect(() => {
    dispatch(POdetail(id)).then((res) => {
      console.log(res, "resPODetail");
      setSelectedValue(res.payload.supplierId?.name);
      setSelectedWarehouse(res.payload.warehouseId?.warehouseName);
      setOrderDetail({
        ...orderDetail,
        supplierId: res.payload.supplierId._id,
        warehouseId: res.payload.warehouseId._id,
        purchaseOrderNumber: res.payload.purchaseOrderNumber,
        paymentTerm: res.payload.paymentTerm,
        products: res.payload.products,
        totalAmount: res.payload.totalAmount,
      });
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

  const changeInputHandler = (e) => {
    if (e.target.name === "purchase_order_number") {
      setOrderDetail({ ...orderDetail, purchaseOrderNumber: e.target.value });
    } else if (e.target.name === "bill") {
      setOrderDetail({ ...orderDetail, billNumber: e.target.value });
    } else if (e.target.name === "paymentTerm") {
      setOrderDetail({ ...orderDetail, paymentTerm: e.target.value });
    } else if (e.target.name === "billDate") {
      console.log(e.target.value, "biildate");
      setOrderDetail({ ...orderDetail, billDate: e.target.value });
      if (orderDetail.paymentTerm === "COD") {
        setOrderDetail({
          ...orderDetail,
          billDate: e.target.value,
          dueDate: e.target.value.split("-").reverse().join("-"),
        });
      } else {
        const inputDate = new Date(e.target.value);
        // console.log(inputDate, "bkjghhg");
        const futureDate = new Date(inputDate);
        futureDate.setDate(
          inputDate.getDate() + Number(orderDetail.paymentTerm.split(" ")[1])
        );
        // console.log(futureDate, "futureDate");
        const formattedFutureDate = futureDate
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-");
        // console.log(formattedFutureDate, "formattedFutureDate");
        setOrderDetail({
          ...orderDetail,
          billDate: e.target.value,
          dueDate: formattedFutureDate,
        });
      }
    }
  };

  const saveOrderBill = (e) => {
    e.preventDefault();

    const newObj = {
      ...orderDetail,
      dueDate: orderDetail.dueDate.split("-").reverse().join("-"),
    };
    dispatch(addBill(newObj));
    // .then((res) => {
    //   console.log(res, "response");
    //   if (res.meta.requestStatus === "fulfilled") {
    //     navigate("/purchase/purchase-order-list");
    //   }
    // });
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

            <div className="outr-right-content splr_frm_cntnt nw_prchs_ordr">
              <form onSubmit={(e) => saveOrderBill(e)}>
                <div className="splr_frm_ttl">
                  <div className="splr_frm_main">
                    <div className="splr_frm_flx">
                      <div className="form-group">
                        <label>Supplier Name</label>
                        <input
                          disabled
                          type="text"
                          name="supplierName"
                          value={selectedValue}
                          className="form-control"
                          onChange={(e) => changeInputHandler(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Delivery Address</label>
                        <input
                          disabled
                          type="text"
                          name="deliveryAddress"
                          value={selectedWarehouse}
                          className="form-control"
                          onChange={(e) => changeInputHandler(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Order Number</label>
                        <input
                          disabled
                          type="text"
                          name="purchaseOrderNumber"
                          value={orderDetail.purchaseOrderNumber}
                          className="form-control"
                          onChange={(e) => changeInputHandler(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Bill</label>
                        <input
                          type="text"
                          name="bill"
                          className="form-control"
                          onChange={(e) => changeInputHandler(e)}
                        />
                      </div>
                      <div className="forpmnt">
                        <div className="form-group">
                          <label>Payment Terms</label>
                          <input
                            disabled
                            type="text"
                            name="paymentTerm"
                            value={orderDetail.paymentTerm}
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          />
                        </div>
                      </div>
                      <div className="fordate">
                        <div className="form-group">
                          <label>Bill Date</label>
                          <input
                            type="date"
                            name="billDate"
                            value={orderDetail.billDate}
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Due Date</label>
                          <input
                            type="text"
                            name="dueDate"
                            value={orderDetail.dueDate}
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          />
                        </div>
                      </div>
                    </div>
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
                        {orderDetail.products?.length > 0 &&
                          orderDetail.products.map((product) => {
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
                    <div className="prchs_ttl">
                      <span className="prchs_ttl_left">
                        <b>Total</b>
                      </span>
                      <span className="prchs_ttl_right">
                        <b>{totalAmount}</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <button type="submit" className="edit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Bill;
