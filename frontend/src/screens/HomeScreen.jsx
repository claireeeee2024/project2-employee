import React from "react";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return <h3 className="fw-semibold">Welcome, {userInfo.username} !</h3>;
};

export default HomeScreen;
