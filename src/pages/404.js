import React from "react";
import { Col, Row } from "react-bootstrap";

function Error404() {
  return (
    <>
      <Row className="error-404">
        <Col xl="12" sm="12">
          <div className="content">
            <img
              src={require("../assets/error-img.jpg")}
              alt="404 Illustration"
            />
            <h2>Page not found!</h2>
          </div>
        </Col>
        <Col xl="6" sm="12">
          <h5>
            It seems that the page you are looking for cannot be found, it
            might have been removed or the url might be incorrect.
          </h5>
        </Col>
      </Row>
    </>
  );
}

export default Error404;