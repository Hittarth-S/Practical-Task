/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Navbar, Nav, Offcanvas } from "react-bootstrap";

import MenuIcon from "@iconscout/react-unicons/icons/uil-bars";

import { useDispatch, useSelector } from "react-redux";

import actions from "../../redux/actions/userAction";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  return (
    <header className="dashboard-header">
      <Navbar expand="lg">
        <div className="container" style={{ display: "block" }}>
          <div className="navigation">
            <div className="left-navigation">
              <div className="logo-box">
                <Link to="/dashboard" className="text-decoration-none text-black">
                  Logo
                </Link>
              </div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav">
                <MenuIcon color="#FFF" size="25" />
              </Navbar.Toggle>
              <Navbar.Offcanvas
                id="responsive-navbar-nav"
                className="mobile-menu"
              >
                <Offcanvas.Header className="mobile-menu-header" closeButton>
                  Logo
                </Offcanvas.Header>
                <Offcanvas.Body className="mobile-menu-body">
                  <Nav className="navigation-options">
                    <Nav.Link
                      href="/users"
                      className="navigation-item"
                      active={
                        window.location.pathname === "/users"
                          ? true
                          : false
                      }
                    >
                      Users
                    </Nav.Link>
                    <Nav.Link
                      href="/products"
                      className="navigation-item"
                      active={
                        window.location.pathname === "/products"
                          ? true
                          : false
                      }
                    >
                      Products
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
            {/* RIGHT NAVIGATION */}
            <div className="right-navigation">
              <Dropdown className="profile-dropdown">
                <Dropdown.Toggle>
                  <div className="profile-avatar">
                    <div className="admin-details">
                      <p>Administrator</p>
                      <h5>{user?.user?.firstName} {user?.user?.lastName}</h5>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="profile-dropdown-menu">
                  <Dropdown.Item href="/" onClick={() => {
                    dispatch(actions.setLoggedIn(false))
                    dispatch(actions.setToken(null))
                    dispatch(actions.setLoggedIn(false))
                    dispatch(actions.setUser(null))
                  }} className="menu-item">
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default DashboardHeader;