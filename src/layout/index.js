import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
