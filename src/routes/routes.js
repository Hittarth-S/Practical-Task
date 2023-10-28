import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";

/* STYLES */
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";

/* LAYOUT IMPORTS */
import Layout from '../layout/index';

/* PAGES IMPORT */
import Home from '../pages/index';
import Account from "../pages/account";
import Shop from "../pages/shop";

import PageNotFound from "../pages/404";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const WebsiteRoutes = () => {
  return (
    <ThemeProvider breakpoints={["xl", "lg", "md", "sm"]} minBreakpoint="sm">
      <div className="app">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Layout><Home /></Layout>} />
            <Route path='/account' element={<Layout><Account /></Layout>} />
            <Route path='/shop' element={<Layout><Shop /></Layout>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default WebsiteRoutes;
