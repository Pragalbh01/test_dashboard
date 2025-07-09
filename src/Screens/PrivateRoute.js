import React from "react";
import { Navigate } from "react-router-dom";
import useAutoLogout from "../config/useLogout";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  useAutoLogout();

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
