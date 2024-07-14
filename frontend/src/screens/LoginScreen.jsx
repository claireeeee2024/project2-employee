import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm";
import { validateForm } from "../utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) || null;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "hr") {
        navigate("/onboarding-management"); // Redirect to hiring management page for HR
      } else if (userInfo.role === "employee") {
        if (
          userInfo.onboardingStatus === "Not Submitted" ||
          userInfo.onboardingStatus === "Pending" ||
          userInfo.onboardingStatus === "Rejected"
        ) {
          navigate("/onboarding");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(username, password);
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <AuthForm
      mode="login"
      title="Sign in to your account"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={submitHandler}
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default LoginScreen;
