import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { validateForm } from "../utils/validation";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useVerifyTokenMutation } from "../slices/usersApiSlice";
const RegisterScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  // console.log(token);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const [verifyToken, { isLoading: tokenLoading, error: tokenError }] =
    useVerifyTokenMutation();

  const [showTokenMessage, setShowTokenMessage] = useState(true);

  useEffect(() => {
    let timeoutId;
    async function verify(token) {
      try {
        await verifyToken({ token }).unwrap();
      } catch (error) {
        setTimeout(() => {
          navigate("/invalid-token");
        }, 1000);
      } finally {
        timeoutId = setTimeout(() => {
          setShowTokenMessage(false);
        }, 1000);
      }
    }
    if (token) {
      verify(token);
    }

    return () => clearTimeout(timeoutId);
  }, [token, verifyToken, navigate]);

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
  // if (tokenError) {
  //   return <div>Token verification failed</div>;
  // }

  return showTokenMessage ? (
    <Row className="justify-content-center">
      <Col className="my-4 mx-4 text-center">
        <i className="bi bi-key-fill" style={{ fontSize: "100px" }}></i>
        <h4>Verifying your token . . . </h4>
      </Col>
    </Row>
  ) : isLoading ? (
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
