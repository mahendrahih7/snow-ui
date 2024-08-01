import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/custom.css";
import "./assets/css/responsive.css";
import "react-image-crop/dist/ReactCrop.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SignUp from "./components/users/SignUp";
import Verification from "./components/users/Verification";
import Login from "./components/users/Login";
import SellerLogin from "./components/sellers/SellerLogin";
import ForgotPassword from "./components/sellers/ForgotPassword";
import ResetPassword from "./components/sellers/ResetPassword";
import UpdatePassword from "./components/sellers/UpdatePassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./routes/PrivateRoute";

import ProductList from "./components/sellers/products/ProductList";
import AddProduct from "./components/sellers/products/AddProduct";
import ProductDetail from "./components/sellers/products/ProductDetail";
import SupplierList from "./components/sellers/purchase/SupplierList";
import AddSupplier from "./components/sellers/purchase/AddSupplier";
import WarehouseList from "./components/sellers/warehouse/WarehouseList";
import AddWarehouse from "./components/sellers/warehouse/AddWarehouse";
import PurchaseOrder from "./components/sellers/purchase/PurchaseOrder";
import PurchaseOrderList from "./components/sellers/purchase/PurchaseOrderList";
import PurchaseOrderDetail from "./components/sellers/purchase/PurchaseOrderDetail";
import Bill from "./components/sellers/purchase/Bill";
import InventorySummery from "./components/sellers/inventory/InventorySummery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*................ user login.............................. */}
          {/* <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/verification" element={<Verification />}></Route> */}

          {/* seller login */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout />}></Route>
            <Route path="/update-password" element={<UpdatePassword />}></Route>
            {/* <Route path="/dashboard/default" element={<DefaultPage />}></Route> */}
            <Route
              path="/products/product-list"
              element={<ProductList />}
            ></Route>
            <Route
              path="/products/add-product"
              element={<AddProduct />}
            ></Route>
            <Route
              path="/products/product-detail/:id"
              element={<ProductDetail />}
            ></Route>
            <Route
              path="/purchase/supplier-list"
              element={<SupplierList />}
            ></Route>
            <Route
              path="/purchase/add-supplier"
              element={<AddSupplier />}
            ></Route>
            <Route
              path="/purchase/purchase-order-list"
              element={<PurchaseOrderList />}
            ></Route>
            <Route
              path="/purchase/purchase-order"
              element={<PurchaseOrder />}
            ></Route>
            <Route
              path="/purchase/purchase-order-detail/:id"
              element={<PurchaseOrderDetail />}
            ></Route>
            <Route path="/purchase/bill/:id" element={<Bill />}></Route>
            <Route
              path="/warehouse/warehouse-list"
              element={<WarehouseList />}
            ></Route>
            <Route
              path="/warehouse/add-warehouse"
              element={<AddWarehouse />}
            ></Route>
            <Route
              path="/inventory/inventory-summery"
              element={<InventorySummery />}
            ></Route>
          </Route>
          <Route path="/seller-login" element={<SellerLogin />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          ></Route>
          {/* <Route path="/add-product" element={<AddProduct />}></Route> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
