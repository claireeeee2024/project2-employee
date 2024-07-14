import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const { onboardingStatus } = userInfo;
  useEffect(() => {
    if (userInfo && userInfo.onboardingStatus !== "Approved") {
      navigate("/onboarding");
    }
  }, [userInfo]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  if (!userInfo) {
    return <Button onClick={handleClick}>Log In</Button>;
  }

  return <h3 className="fw-semibold">Welcome, {userInfo.username} !</h3>;
};

export default HomeScreen;
