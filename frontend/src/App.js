import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  let navStructure;
  if (userInfo && userInfo.role === "hr") {
    navStructure = [
      { label: "Home", link: "/", icon: "bi-house" },

      { label: "Employee Profiles", link: "/profiles", icon: "bi-people" },
      {
        label: "Visa Status Management",
        link: "/visa-management",
        icon: "bi-table",
      },
      {
        label: "My Visa Status",
        link: "/employeeVisaManagement",
        icon: "bi-speedometer2",
      },
      {
        label: "Hiring Management",
        link: "/registration-management",
        icon: "bi-ui-checks-grid",
        subItems: [
          { label: "Registration History", link: "/registration-management" },
          { label: "Onboarding Applications", link: "/onboarding-management" },
        ],
      },
      { label: "Logout", link: "/", icon: "bi-box-arrow-right" },
    ];
  } else if (userInfo && userInfo.role === "employee") {
    navStructure = [
      { label: "Home", link: "/", icon: "bi-house" },

      {
        label: "Personal Information",
        link: "/personalinfo",
        icon: "bi-speedometer2",
      },
      {
        label: "My Visa Status",
        link: "/employeeVisaManagement",
        icon: "bi-speedometer2",
      },
      { label: "Logout", link: "/", icon: "bi-box-arrow-right" },
    ];
  } else {
    navStructure = [];
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <ToastContainer autoClose={2000} />
      <div className="d-flex flex-grow-1">
        {userInfo &&
          ((userInfo.role === "employee" &&
            userInfo.onboardingStatus === "Approved") ||
            userInfo.role === "hr") && <SideBar navStructure={navStructure} />}
        <main className="p-4 flex-fill bg-light">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
