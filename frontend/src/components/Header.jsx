import { useNavigate, Link, useLocation } from "react-router-dom";
import React from "react";

import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Management{" "}
              <span style={{ fontSize: "10px" }} className="chuwa">
                Chuwa
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
