import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";

/* IMAGE IMPORTS */
import Logo from "../../assets/logo.jpg";

/* COMPONENT IMPORTS */
import AuthFooter from "../../components/auth-footer";

const Register = () => {
  /* STATE */
  const [phoneNumber, setPhoneNumber] = useState();
  const [verifyModal, setVerifyModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  return (
    <section className="authentication">
      <div className="authentication-form">
        <div className="container h-100">
          <Row className="justify-center align-center h-100">
            <Col lg="4" md="4" sm="12">
              <div className="login-form">
                <div className="logo">
                  <img src={Logo} className="company-logo" alt="Company Logo" />
                </div>
                <div className="form-heading">
                  <h1>Create your account</h1>
                  <p>
                    Leverage rewards and incentives to improve customer
                    engagement and help everyone stay connected virtually.
                  </p>
                </div>
                <form className="form-details">
                  <Row>
                    <Col lg="12" sm="12">
                      <div className="form-group">
                        <label
                          className="form-label"
                          htmlFor="organizationName"
                        >
                          Organization Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="RoundTechSquare"
                          name="organizationName"
                          id="organizationName"
                        />
                      </div>
                    </Col>
                    <Col lg="6" sm="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="fName">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Katherine"
                          name="fName"
                          id="fName"
                        />
                      </div>
                    </Col>
                    <Col lg="6" sm="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="lName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Smith"
                          name="lName"
                          id="lName"
                        />
                      </div>
                    </Col>
                    <Col lg="12" sm="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">
                          Phone
                        </label>
                        <PhoneInput
                          placeholder="Phone Number"
                          defaultCountry="US"
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                          className="phone-control"
                        />
                      </div>
                    </Col>
                    <Col lg="12" sm="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="emailAddress">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="placeholder@roundtechsquare.com"
                          name="emailAddress"
                          id="emailAddress"
                        />
                      </div>
                    </Col>
                    <Col lg="12" sm="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="roundtechsquare"
                          name="password"
                          id="password"
                        />
                      </div>
                    </Col>
                    <Col lg="12" sm="12">
                      <Button className="primary-btn" onClick={() => setVerifyModal(!verifyModal)}>Create account</Button>
                    </Col>
                    <Col lg="12" sm="12">
                      <p className="small-text">
                        Already have an account ?{" "}
                        <a href="/">Sign in to your account</a>
                      </p>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* FOOTER */}
      <AuthFooter />

      <Modal
        show={verifyModal}
        onHide={() => setVerifyModal(!verifyModal)}
        backdrop="static"
        centered
        className="verification-modal"
      >
        <Modal.Header className="verification-header">
          <h5>Verify your Email</h5>
        </Modal.Header>
        <Modal.Body className="verification-body">
          <div className="email">
            <div>
              <p>Email Address</p>
              <h5>darsh@roundtechsquare.com</h5>
            </div>
            <Button className="change-email-btn">Change</Button>
          </div>
          <p>
            <b style={{ color: "#323232" }}>Thanks for signing up.</b> An
            account verification email has been sent to your email{" "}
            <b style={{ color: "#323232" }}>darsh@roundtechsquare.com</b>.
            Please enter the
            <b style={{ color: "#323232" }}> 6 digit verification code</b> to
            complete your registration.
          </p>
          <p>
            Please check your spam or junk folder just in case the verification
            email got delivered there.
          </p>
          <div className="otp-input">
            <label htmlFor="code">Enter Code</label>
            <OtpInput
              value={otpInput}
              onChange={() => setOtpInput(otpInput)}
              numInputs={6}
              className="otp-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="verification-footer">
          <Button className="resend-code-btn">Resend Code</Button>
          <Button
            className="verify-email-btn"
            onClick={() => setVerifyModal(!verifyModal)}
          >
            Verify Email
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Register;
