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
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ErrorScreen from "./screens/ErrorScreen";
import ProfileScreen from "./screens/hr/ProfileScreen";
import VisaMangamentScreen from "./screens/hr/VisaMangamentScreen";
import { Profile } from "./components/Profile";
import { EmployeeVisaManagement } from "./screens/EmployeeVisaScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import TokenInvalidScreen from "./screens/TokenInvalidScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/personalinfo" element={<PersonalInfoScreen />} />
        <Route
          path="/employeeVisaManagement"
          element={<EmployeeVisaManagement />}
        />
        <Route path="" element={<HrRoute />}>
          <Route path="/profiles/:employeeId" element={<Profile />}></Route>
          <Route path="/profiles" element={<ProfileScreen />}></Route>
          <Route
            path="/visa-management"
            element={<VisaMangamentScreen />}
          ></Route>
          <Route
            path="/onboarding-management"
            element={<OnboardingManagementScreen />}
          ></Route>
          <Route
            path="/registration-management"
            element={<RegistrationManagementScreen />}
          ></Route>
        </Route>
      </Route>
      <Route path="/invalid-token" element={<TokenInvalidScreen />} />
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
