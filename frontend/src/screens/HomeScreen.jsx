import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const { onboardingStatus } = userInfo;
  useEffect(() => {
    if (userInfo && userInfo.onboardingStatus !== "Approved") {
      navigate("/onboarding");
    }
  }, [userInfo]);
  const navigate = useNavigate();

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return <h3 className="fw-semibold">Welcome, {userInfo.username} !</h3>;
};

export default HomeScreen;
