import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import BlogContext from "../content/blogs/BlogContext";
import { useReducer } from "react";

export default function NavBar(props) {
  const context = useContext(BlogContext);
  const {
    state: { cart },
  } = context;

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="./home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./blogs">
                  Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./reduce">
                  Reduce
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./checkout">
                  <button
                    type="button"
                    className="btn btn-primary position-relative"
                  >
                    <FaShoppingCart />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <button
              className="btn btn-outline-success"
              type=""
              onClick={props.setMode}
            >
              {props.text}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
