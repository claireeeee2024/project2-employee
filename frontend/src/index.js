import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import "./index.css";
import HrRoute from "./components/HrRoute";
import OnboardingManagementScreen from "./screens/hr/OnboardingManagementScreen";
import RegistrationManagementScreen from "./screens/hr/RegistrationManagementScreen";
import Test from "./screens/Test";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ErrorScreen from "./screens/ErrorScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />
      <Route path="/personalinfo" element={<PersonalInfoScreen />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="" element={<HrRoute />}>
        <Route
          path="/onboarding-management"
          element={<OnboardingManagementScreen />}
        ></Route>
        <Route
          path="/registration-management"
          element={<RegistrationManagementScreen />}
        ></Route>
      </Route>
      <Route path="*" element={<ErrorScreen />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
