import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { GiWhiteBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";
import { BsMoon, BsSun } from "react-icons/bs";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <b>
              <GiWhiteBook /> &nbsp; TODO
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/">
                  Меню
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/about">
                  О нас
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/todo">
                  ToDo
                </Link>
              </li>
              <li className="nav-item mx-2">
                <button
                  className="theme-toggle"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <BsSun /> : <BsMoon />}
                </button>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn-nav" to="/signup">
                      Регистрация
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn-nav" to="/signin">
                      Войти
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-2" onClick={logout}>
                  <Link className="nav-link btn-nav" to="#">
                    Выйти
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
