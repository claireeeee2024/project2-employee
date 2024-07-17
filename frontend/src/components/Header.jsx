import { useNavigate, Link, useLocation } from "react-router-dom";
import React from "react";

import "./Header.css";

import { useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
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
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {userInfo && (
                  <li className="nav-item">
                    <button
                      className="nav-link active btn btn-link"
                      onClick={logoutHandler}
                    >
                      <i className="bi bi-person"></i> Sign Out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
