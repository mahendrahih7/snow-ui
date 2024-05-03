import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/custom.css";
import "./assets/css/responsive.css";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/verification" element={<Verification />}></Route>

          {/* seller login */}
          <Route path="/seller-login" element={<SellerLogin />}></Route>
          <Route path="/update-password" element={<UpdatePassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
