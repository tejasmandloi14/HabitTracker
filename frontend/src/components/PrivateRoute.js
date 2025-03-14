import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ token, component }) => {
  return token ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
