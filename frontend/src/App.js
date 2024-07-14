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
  const getNavStructure = (userRole) => {

    const navStructure = [
      { label: "Home", link: "/", icon: "bi-house" },
      { label: "My Visa Status", link: "/employeeVisaManagement", icon: "bi-speedometer2" },
      { label: "Personal Info", link: "/personalinfo", icon: "bi-person" },
      { label: "Onboarding", link: "/onboarding", icon: "bi-person" },
    ];

    if (userRole === "hr") {
      navStructure.push( 
        { label: "Employee Profiles", link: "/profiles", icon: "bi-people" },
        { label: "Visa Status Management", link: "/visa-management", icon: "bi-table" },
        {
          label: "Hiring Management",
          link: "/registration-management",
          icon: "bi-ui-checks-grid",
          subItems: [
            { label: "Registration History", link: "/registration-management" },
            { label: "Onboarding Applications", link: "/onboarding-management" },
          ],
        },);
      
    }
    return navStructure;
  }

  const navStructure = getNavStructure(userInfo?.role);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <ToastContainer autoClose={2000} />
      <div className="d-flex flex-grow-1">
        {userInfo && <SideBar navStructure={navStructure} />}
        <main className="p-4 flex-fill bg-light">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
