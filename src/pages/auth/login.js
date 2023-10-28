import React, { useState } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* COMPONENT IMPORTS */
import AuthFooter from "../../components/auth-footer";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import actions from "../../redux/actions/userAction";
import { adminLogin } from "../../service/api";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required."),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /* FORM VALUES HANDLING */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      adminLogin(values)
        .then((res) => {
          console.log("res", res);
          if (res?.status) {
            toast.success(res?.message);
            dispatch(actions.setToken(res?.data?.token));
            dispatch(actions.setUser(res?.data?.userData));
            dispatch(actions.setLoggedIn(true));
            navigate("/users");
          } else {
            toast.error(res?.message);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log("er",e?.response?.data?.message)
          if(e?.response?.data?.message){
            toast.error(e?.response?.data?.message);
          }else{
            toast.error(e?.message);
          }
          
        })
        .finally((res) => {
          setLoading(false);
        });
    },
  });

  return (
    <section className="authentication">
      <div className="authentication-form">
        <div className="container h-100">
          <Row className="justify-center align-center h-100">
            <Col lg="4" md="4" sm="12">
              <div className="login-form">
                <div className="form-heading">
                  <h1>Sign in to your account</h1>
                  <p>Manage your website easily through the admin panel.</p>
                </div>
                <form className="form-details" onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col lg="12" sm="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="emailAddress">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          name="email"
                          id="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                          <small style={{ color: "red" }}>
                            {formik.errors.email}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col lg="12" sm="12">
                      <div className="form-group mb-0">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          id="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                          <small style={{ color: "red" }}>
                            {formik.errors.password}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col lg="12" sm="12">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="primary-btn mt-3"
                      >
                        {loading ? <Spinner size="sm" /> : "Sign in"}
                      </Button>
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
    </section>
  );
};

export default Login;
