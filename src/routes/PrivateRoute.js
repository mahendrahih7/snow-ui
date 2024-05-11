import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authToken = localStorage.getItem("token");
  console.log(authToken, "authToken");
  return authToken ? <Outlet /> : <Navigate to="/seller-login" />;
};

export default PrivateRoute;
