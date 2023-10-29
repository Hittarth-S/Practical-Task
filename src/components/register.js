import React, { useState } from "react";


import { Button, Spinner } from "react-bootstrap";

import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-toastify";

import { register } from "../service/api";

const validationSchema = yup.object().shape({
    firstName: yup.string().required("Password is required."),
    lastName: yup.string().required("Password is required."),
    mobile: yup.string().required("Password is required."),
    email: yup.string().email().required("Email is required."),
    password: yup.string().required("Password is required."),
});

const Register = (props) => {

    // States
    const [loading, setLoading] = useState(false);

    /* FORM VALUES HANDLING */
    const formikFunction = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            register(values)
                .then((res) => {
                    if (res?.status) {
                        toast.success(res?.message);
                        props.stateManage('login')
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
                            <h2>Create an Account</h2>
                            <p>Create an account so that you can checkout quickly, manage preferences, save your addresses, track your orders, and more!</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="form-group mb-0">
                            <label className="form-label d-inline" htmlFor="firstName">
                                First Name <span>*</span>
                                {formikFunction.errors.firstName && formikFunction.touched.firstName && (
                                    <small style={{ color: "red", float: 'right' }}>
                                        {formikFunction.errors.firstName}
                                    </small>
                                )}
                            </label>
                            <input
                                type="text"
                                className={formikFunction.errors.firstName && formikFunction.touched.firstName ? "form-control border-danger" : "form-control"}
                                placeholder="Joe"
                                name="firstName"
                                id="firstName"
                                value={formikFunction.values.firstName}
                                onChange={formikFunction.handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="form-group mb-0">
                            <label className="form-label d-inline" htmlFor="lastName">
                                Last Name <span>*</span>
                                {formikFunction.errors.lastName && formikFunction.touched.lastName && (
                                    <small style={{ color: "red", float: 'right' }}>
                                        {formikFunction.errors.lastName}
                                    </small>
                                )}
                            </label>
                            <input
                                type="text"
                                className={formikFunction.errors.lastName && formikFunction.touched.lastName ? "form-control border-danger" : "form-control"}
                                placeholder="Walter"
                                name="lastName"
                                id="lastName"
                                value={formikFunction.values.lastName}
                                onChange={formikFunction.handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
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
                    <div className="col-lg-6 col-sm-12">
                        <div className="form-group mb-0">
                            <label className="form-label d-inline" htmlFor="mobile">
                                Phone Number <span>*</span>
                                {formikFunction.errors.mobile && formikFunction.touched.mobile && (
                                    <small style={{ color: "red", float: 'right' }}>
                                        {formikFunction.errors.mobile}
                                    </small>
                                )}
                            </label>
                            <input
                                type="text"
                                className={formikFunction.errors.mobile && formikFunction.touched.mobile ? "form-control border-danger" : "form-control"}
                                placeholder="Phone Number"
                                name="mobile"
                                id="mobile"
                                value={formikFunction.values.mobile}
                                onChange={formikFunction.handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
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
                        <Button className="submit-btn" disabled={loading} type="submit"> {loading ? <Spinner size="sm" /> : "Register"}</Button>
                    </div>
                    <div className="col-lg-5 col-sm-12 d-flex">
                        <p className="submit-btn bg-transparent border-0 justify-content-end align-content-end">Already have an account? <strong style={{ cursor: 'pointer' }} onClick={() => {
                            props.stateManage('login')
                        }} >Sign In</strong></p>
                    </div>

                </div>
            </form>
        </div>
        <div className="col-xl-6 col-sm-12" >
            <img
                className="register-image"
                src={require("../assets/register.png")}
                alt="Register"
            />
        </div>
    </div>
}
export default Register;