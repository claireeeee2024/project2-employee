import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { validateForm } from "../utils/validation";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      console.log("Token:", token);
    }
  }, [token, location.search]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "hr") {
        navigate("/onboarding-management"); // Redirect to hiring management page for HR
      } else if (userInfo.role === "employee") {
        navigate("/onboarding"); // Redirect to onboarding page for Employee
      } else {
        navigate("/"); // Default redirect path
      }
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(username, password, email);
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }
    try {
      const res = await register({ username, email, password, token }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error.data?.message || "Registration failed");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AuthForm
      mode="register"
      title="Sign up an account"
      onSubmit={submitHandler}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default RegisterScreen;
