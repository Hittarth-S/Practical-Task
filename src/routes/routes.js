import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";

/* PAGES */
import DashboardLayout from "../layout/index";
import Login from "../pages/auth/login";

import Users from "../pages/dashboard/users";
import Products from "../pages/dashboard/products";
import AddProduct from "../pages/dashboard/products/add-product";
import EditProduct from "../pages/dashboard/products/edit-product";

import PageNotFound from "../pages/404";



/* STYLES */
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider breakpoints={["xl", "lg", "md", "sm"]} minBreakpoint="sm">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>

        {/* DASHBOARD ROUTES */}
        <Routes>
          <Route
            path="/users"
            element={
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            }
          />
          <Route
            path="/products"
            element={
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            }
          />
          <Route
            path="/products/add"
            element={
              <DashboardLayout>
                <AddProduct />
              </DashboardLayout>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <DashboardLayout>
                <EditProduct />
              </DashboardLayout>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;