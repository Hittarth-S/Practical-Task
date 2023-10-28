import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";

import Login from "../../components/login";
import Register from "../../components/register";
import AccountDetails from "../../components/account-details";

const ContactUs = () => {
  const userDetails = useSelector((state) => state?.user?.user);

  // States
  const [currentTab, setCurrentTab] = useState('login');

  useEffect(() => {
    if (userDetails?._id) {
      setCurrentTab('accountDetails')
    } else {
      setCurrentTab('login')
    }
  }, [userDetails])


  return (
    <section className="contact-us">
      <Helmet>
        <title>Account | Website</title>
      </Helmet>

      {/* PAGE BANNER */}
      <div className="page-banner">
        <div className="overlay-text">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-sm-12">
                <h1>ACCOUNT</h1>
                <h2>Login or Register to view your details.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION MAP */}
      <div className="details">
        <div className="container">
          {currentTab === 'login' && <Login stateManage={setCurrentTab} />}
          {currentTab === 'register' && <Register stateManage={setCurrentTab} />}
          {currentTab === 'accountDetails' && <AccountDetails />}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;