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
  faXmark,
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
import {
  allProducts,
  allVariants,
} from "../../../redux/features/sellers/sellerProductSlice";
import axios from "axios";
import NavBar from "../../common/Nav/NavBar";
import {
  addSupplierInfo,
  allSuppliers,
  createPurchaseOrder,
} from "../../../redux/features/sellers/sellerPurchaseSlice";
import {
  addWarehouse,
  allWarehouse,
} from "../../../redux/features/sellers/sellerWarehouseSlice";
import { Seller_products } from "../../../constants/Api/Api";
import { VerticalAlignBottom } from "@mui/icons-material";
import uniqid from "uniqid";

const PurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState({
    supplierId: "",
    warehouseId: "",
    purchaseOrderNumber: "",
    dateOfPurchaseOrder: "",
    expectedDeliveryDate: "",
    paymentTerm: "",
    paymentType: "",
    products: [],
  });

  const [supplierData, setSupplierData] = useState();
  const [warehouseData, setWarehouseData] = useState();
  const [variantPrice, setVariantPrice] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  // const [selectedValue, setSelectedValue] = useState();

  const { suppliers } = useSelector((state) => state.sellerPurchase);
  const { warehouseDetail } = useSelector((state) => state.sellerWarehouse);
  console.log(warehouseDetail);
  const { products, allVariant } = useSelector((state) => state.sellerProducts);

  const [tableRow, setTableRow] = useState([
    {
      id: uniqid(),
      products: [],
      productId: "",
      variants: [],
      variantId: "",
      quantity: 0,
      rate: 0.0,
      amount: 0,
    },
  ]);

  console.log(tableRow, "tableRow");

  const addedRow = () => {
    setTableRow([
      ...tableRow,
      {
        id: uniqid(),
        products: tableRow[0].products,
        productId: "",
        variants: [],
        variantId: "",
        quantity: 0,
        rate: 0.0,
        amount: 0.0,
      },
    ]);
  };

  useEffect(() => {
    dispatch(allSuppliers());
  }, []);

  useEffect(() => {
    dispatch(allWarehouse());
  }, []);

  useEffect(() => {
    dispatch(allProducts()).then((res) => {
      console.log(res, "res888");
      setTableRow((prevData) => {
        const tableInfo = [...prevData];
        tableInfo[0].products = res.payload?.map(
          (product) => product.productInfo.name
        );

        return tableInfo;
      });
    });
  }, []);

  const supplierHandler = (e) => {
    console.log(e.target.value, "valueSupplier");
    const obj = suppliers.find((supplier) => supplier.name === e.target.value);
    console.log(obj, "obj111");
    setOrderDetail({ ...orderDetail, supplierId: obj._id });
    setSupplierData(obj);
  };

  const deliveryHandler = (e) => {
    console.log(warehouseDetail[0], "999");
    const obj = warehouseDetail.find(
      (warehouse) => warehouse.warehouseName === e.target.value
    );
    console.log(obj, "obj222");
    setOrderDetail({ ...orderDetail, warehouseId: obj._id });
    setWarehouseData(obj);
  };

  const changeInputHandler = (e) => {
    if (e.target.name === "purchase_order_number") {
      setOrderDetail({ ...orderDetail, purchaseOrderNumber: e.target.value });
    } else if (e.target.name === "purchase_order_date") {
      setOrderDetail({ ...orderDetail, dateOfPurchaseOrder: e.target.value });
    } else if (e.target.name === "expected_delivery_date") {
      setOrderDetail({ ...orderDetail, expectedDeliveryDate: e.target.value });
    } else if (e.target.name === "paymentTerm") {
      setOrderDetail({ ...orderDetail, paymentTerm: e.target.value });
    } else if (e.target.name === "paymentType") {
      setOrderDetail({ ...orderDetail, paymentType: e.target.value });
    }
  };

  const selectHandler = (e, ind) => {
    if (e.target.name === "product") {
      console.log("called product");
      // setSelectedValue(e.target.value);

      const targetProd = products.find(
        (product) => product.productInfo.name === e.target.value
      );

      //FOR UPDATING PRODUCT ID IN SATE
      setTableRow((prevData) => {
        const tableInfo = [...prevData];
        tableInfo[ind].productId = targetProd?._id;
        return tableInfo;
      });
      dispatch(allVariants(targetProd._id)).then((res) => {
        console.log(res, "resVar");
        setTableRow((prev) => {
          const tableInfo = [...prev];
          tableInfo[ind].variants = res.payload?.map(
            (variant) => variant.variant
          );
          return tableInfo;
        });
      });
    } else if (e.target.name === "variant") {
      console.log("called variant");
      console.log(e.target.value, "variantValue");
      // setVariantPrice(e.target.value);
      const targetVarObj = allVariant.find(
        (variant) =>
          // console.log(variant, "variant")
          variant.variant.Price === e.target.value
      );
      console.log(targetVarObj, "targetVarObj");
      setTableRow((prevData) => {
        const tableInfo = [...prevData];
        console.log(tableInfo[ind], "tableInfo");
        tableInfo[ind].variantId = targetVarObj?._id;
        tableInfo[ind].rate = targetVarObj?.variant.Price;
        return tableInfo;
      });
    }
  };

  const quantityHandler = (e, ind) => {
    setTableRow((prevData) => {
      const tableInfo = [...prevData];
      tableInfo[ind].quantity = e.target.value;
      tableInfo[ind].amount = tableInfo[ind].rate * e.target.value;
      return tableInfo;
    });

    setTimeout(() => {
      let result = 0;
      for (let elem of tableRow) {
        result += elem.amount;
      }
      setTotalAmount(result.toFixed(2));
    }, 100);
  };

  const deleteProduct = (e, index) => {
    if (tableRow.length > 1) {
      const arr = tableRow.filter((_, i) => i !== index);
      console.log(arr, "deleteAfterArr");
      setTableRow((prevRows) => prevRows.filter((_, i) => i !== index));

      let result = 0;
      for (let elem of arr) {
        result += elem.amount;
      }
      setTotalAmount(result);
    }
  };

  const submitOrder = (e) => {
    e.preventDefault();

    const newArr = tableRow.map((elem) => {
      return {
        productId: elem.productId,
        variantId: elem.variantId,
        quantity: elem.quantity,
        unitCost: elem.rate,
        totalCost: elem.amount,
      };
    });
    const newObj = {
      supplierId: orderDetail.supplierId,
      warehouseId: orderDetail.warehouseId,
      purchaseOrderNumber: orderDetail.purchaseOrderNumber,
      dateOfPurchaseOrder: orderDetail.dateOfPurchaseOrder,
      expectedDeliveryDate: orderDetail.expectedDeliveryDate,
      paymentTerm: orderDetail.paymentTerm,
      paymentType: orderDetail.paymentType,
      products: newArr,
      totalAmount: totalAmount,
    };

    console.log(newObj, "newObj");
    dispatch(createPurchaseOrder(newObj)).then((res) => {
      navigate("/purchase/purchase-order-list");
    });
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
              <form onSubmit={(e) => submitOrder(e)}>
                <div className="splr_frm_ttl">
                  <div className="splr_frm_main">
                    <div className="splr_frm_flx">
                      <div className="form-group">
                        <label>Supplier Name</label>
                        <select
                          className="form-control"
                          onChange={(e) => supplierHandler(e)}
                        >
                          <option value="">Select supplier name</option>
                          {suppliers &&
                            suppliers.map((supplier, i) => {
                              console.log(supplier, "supplier");
                              return (
                                <option key={i} value={supplier.name}>
                                  {supplier.name}
                                </option>
                              );
                            })}
                        </select>
                        <div className="bnds_adrs">
                          {supplierData && (
                            <div className="adrs_dtls">
                              <h6>
                                <b>SUPPLIER ADDRESS</b>
                              </h6>
                              <p>
                                {supplierData?.address?.length > 0 &&
                                  supplierData?.address[0]?.street}
                                <br />
                                {supplierData?.address?.length > 0 &&
                                  supplierData?.address[0]?.city}
                                <br />
                                {supplierData?.address?.length > 0 &&
                                  supplierData?.address[0]?.state}
                                <br />
                                {supplierData?.address?.length > 0 &&
                                  supplierData?.address[0]?.country}
                                <br />
                                Phone: {supplierData?.phoneNumber}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Delivery Address</label>
                        <select
                          className="form-control"
                          onChange={(e) => deliveryHandler(e)}
                        >
                          <option value="">Select delivery address</option>
                          {warehouseDetail &&
                            warehouseDetail.map((warehouse, i) => {
                              console.log(warehouse, "warehouse");
                              return (
                                <option key={i} value={warehouse.warehouseName}>
                                  {warehouse.warehouseName}
                                </option>
                              );
                            })}
                        </select>
                        <div className="bnds_adrs">
                          {warehouseData && (
                            <div className="adrs_dtls">
                              <h6>
                                <b>DELIVERY ADDRESS</b>
                              </h6>
                              <p>
                                {warehouseData?.address?.street}
                                <br />
                                {warehouseData?.address?.city}
                                <br />
                                {warehouseData?.address?.state}
                                <br />
                                {warehouseData?.address?.country}
                                <br />
                                Phone: {warehouseData?.phone}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Purchase Order Number</label>
                        <input
                          type="text"
                          name="purchase_order_number"
                          className="form-control"
                          onChange={(e) => changeInputHandler(e)}
                        />
                      </div>
                      <div className="fordate">
                        <div className="form-group">
                          <label>Purchase Order Date</label>
                          <input
                            type="date"
                            name="purchase_order_date"
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Expected Delivery Date</label>
                          <input
                            type="date"
                            name="expected_delivery_date"
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          />
                        </div>
                      </div>
                      <div className="forpmnt">
                        <div className="form-group">
                          <label>Payment Terms</label>
                          <select
                            name="paymentTerm"
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          >
                            <option value="">Select payment terms</option>
                            <option value="COD">COD</option>
                            <option value="Net 30">Net 30</option>
                            <option value="Net 45">Net 45</option>
                            <option value="Net 60">Net 60</option>
                            <option value="Net 75">Net 75</option>
                          </select>
                        </div>
                        {/* <div className="form-group">
                          <label>Shipment Preference</label>
                          <input type="text" className="form-control" />
                        </div> */}
                        <div className="form-group">
                          <label>Payment Type</label>
                          <select
                            name="paymentType"
                            className="form-control"
                            onChange={(e) => changeInputHandler(e)}
                          >
                            <option value="">Select payment types</option>
                            <option value="COD">COD</option>
                            <option value="cash">Cash</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                            <option value="check">Check</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="prchs_itm_tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <b>PRODUCTS</b>
                          </th>
                          <th>
                            <b>QUANTITY</b>
                          </th>
                          <th>
                            <b>RATE</b>
                          </th>
                          <th>
                            <b>AMOUNT</b>
                          </th>
                          <th>
                            <b>ACTION</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRow &&
                          tableRow.map((data, index) => {
                            console.log(data, "data111");
                            return (
                              <tr key={data.id}>
                                <td>
                                  <select
                                    name="product"
                                    // value={selectedValue}
                                    onChange={(e) => selectHandler(e, index)}
                                  >
                                    <option value="">Select product</option>
                                    {data.products?.map((elem, i) => {
                                      return (
                                        <option key={i} value={elem}>
                                          {elem}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <select
                                    name="variant"
                                    onChange={(e) => selectHandler(e, index)}
                                  >
                                    <option value="">Select variant</option>
                                    {data.variants?.map((elem, i) => {
                                      return (
                                        <option key={i} value={elem.Price}>
                                          {`Price: ${elem.Price} Color: ${elem.Color}`}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={data.quantity}
                                    onChange={(e) => quantityHandler(e, index)}
                                  />
                                </td>
                                <td>{data.rate}</td>

                                <td>{data.amount}</td>

                                <td>
                                  <FontAwesomeIcon
                                    icon={faXmark}
                                    size="2xl"
                                    style={{
                                      color: "#e00b0b",
                                      cursor: "pointer",
                                    }}
                                    onClick={(e) => deleteProduct(e, index)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="prchs_rows">
                    <div className="prchs_add_btn">
                      <button type="button" className="edit" onClick={addedRow}>
                        Add New Row
                      </button>
                    </div>
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
                    Submit
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

export default PurchaseOrder;
