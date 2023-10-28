import React, { useState } from "react";


import { Button, Spinner } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-toastify";

import actions from "../redux/actions/userAction";

import { login } from "../service/api";

const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
    password: yup.string().required("Password is required."),
});

const Login = (props) => {

    const dispatch = useDispatch();

    // States
    const [loading, setLoading] = useState(false);

    /* FORM VALUES HANDLING */
    const formikFunction = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            login(values)
                .then((res) => {
                    if (res?.status) {
                        toast.success(res?.message);
                        dispatch(actions.setToken(res?.data?.token));
                        dispatch(actions.setUser(res?.data?.userData));
                        dispatch(actions.setLoggedIn(true));
                        props.stateManage('accountDetails')
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((e) => {
                    setLoading(false);
                    if (e?.response?.data?.message) {
                        toast.error(e?.response?.data?.message);
                    } else {
                        toast.error(e?.message);
                    }

                })
                .finally((res) => {
                    setLoading(false);
                });
        },
    });

    return <div className="row flex-column-reverse flex-md-row">
        <div className="col-xl-6 col-sm-12" >
            <form className="contact-form" onSubmit={formikFunction.handleSubmit}>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-sm-12">
                        <div className="form-heading">
                            <h2>Login to your Account</h2>
                            <p>If you are a registered user, please enter your email and password.</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label className="form-label d-inline" htmlFor="email">
                                Email Address <span>*</span>
                                {formikFunction.errors.email && formikFunction.touched.email && (
                                    <small style={{ color: "red", float: 'right' }}>
                                        {formikFunction.errors.email}
                                    </small>
                                )}
                            </label>
                            <input
                                type="email"
                                className={formikFunction.errors.email && formikFunction.touched.email ? "form-control border-danger" : "form-control"}
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                value={formikFunction.values.email}
                                onChange={formikFunction.handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mb-0">
                            <label className="form-label d-inline" htmlFor="password">
                                Password <span>*</span>
                                {formikFunction.errors.password && formikFunction.touched.password && (
                                    <small style={{ color: "red", float: 'right' }}>
                                        {formikFunction.errors.password}
                                    </small>
                                )}
                            </label>
                            <input
                                type="password"
                                className={formikFunction.errors.password && formikFunction.touched.password ? "form-control border-danger" : "form-control"}
                                placeholder="Password"
                                name="password"
                                id="password"
                                value={formikFunction.values.password}
                                onChange={formikFunction.handleChange}
                            />

                        </div>
                    </div>

                    <div className="col-lg-7 col-sm-12">
                        <Button className="submit-btn" disabled={loading} type="submit"> {loading ? <Spinner size="sm" /> : "Login"}</Button>
                    </div>
                    <div className="col-lg-5 col-sm-12 d-flex">
                        <p className="submit-btn bg-transparent border-0 justify-content-end align-content-end">Don't have an account? <strong style={{ cursor: 'pointer' }} onClick={() => {
                            props.stateManage('register')
                        }} >Sign Up</strong></p>
                    </div>

                </div>
            </form>
        </div>
        <div className="col-xl-6 col-sm-12" >
            <img
                className="login-image"
                src={require("../assets/login.png")}
                alt="Login"
            />
        </div>
    </div>
}
export default Login;