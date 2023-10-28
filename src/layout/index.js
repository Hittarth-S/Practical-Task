import React from "react";
import DashboardHeader from "./header";
import DashboardFooter from './footer';

const DashboardLayout = ({ children }) => {
    return (
      <main>
        <DashboardHeader />
        <div className="main">
            {children}
        </div>
        <DashboardFooter />
      </main>
    );
};

export default DashboardLayout;