import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to='/login' replace />;
  }
  return <h3 className="fw-semibold">Welcome, {userInfo.username} !</h3>;
};

export default HomeScreen;
