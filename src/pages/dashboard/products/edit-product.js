/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router";

/* BootStrap Components Import */
import { Row, Col, Button, Card, Spinner, Tab, Nav } from "react-bootstrap";

/* Custom Select Import */
import Select from 'react-select';

/* ICON IMPORTS */
import ImportIcon from "@iconscout/react-unicons/icons/uil-import";
import UilTrash from "@iconscout/react-unicons/icons/uil-trash";
import ArrowLeft from "@iconscout/react-unicons/icons/uil-arrow-left";

/* Form Control */
import { useFormik } from "formik";
import * as yup from "yup";

/* Custom Toast Notification */
import { toast } from "react-toastify";

/* API IMPORTS */
import {
    editProductDetailsById,
    getProductDetailsById,
    deleteProductImageByProductImageId,
    addProductImageByProductId
} from "../../../service/api";


/* Validation Schema  */
const validationSchema = yup.object().shape({
    name: yup.string().required("Product Name is Required"),
    price: yup.number().required("Price is Required"),
    description: yup.string().required("Description is Required"),
    status: yup.string().required("Status is Required")
});

const options = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'comingSoon', label: 'Coming Soon' },
];

const EditProductComponent = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();

    // States
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [key, setKey] = useState('productImages');

    // Functions
    /* FORM VALUES HANDLING */
    const formikFunction = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            status: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            editProductDetailsById(id, values)
                .then((res) => {
                    if (res?.status) {
                        toast.success(res?.message);
                        formikFunction.handleReset();
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((e) => {
                    setLoading(false);
                    toast.error(e?.response?.data?.message);
                })
                .finally((res) => {
                    getProductDetailsFunction();
                    setLoading(false);
                });
        },
    });

    const getProductDetailsFunction = () => {
        getProductDetailsById(id).then((res) => {
            if (res?.status) {
                setProductDetails(res?.data);
            } else {
                toast.error(res?.message);
            }
        }).catch((error) => {
            toast.error("Error While Fetching Product Details");
            console.log("Error While Fetching Product Details", error);
        })
    }

    // UseEffect
    useEffect(() => {
        getProductDetailsFunction();
    }, [id])

    useEffect(() => {
        if (productDetails !== null) {
            Object.entries(productDetails).forEach((entry) => {
                const [key, value] = entry;
                if (validationSchema?.fields?.hasOwnProperty(key)) {
                    formikFunction.setFieldValue(key, value);
                }
            });

            setSelectedOption(options.find((element) => element.value === productDetails?.status));
        }
    }, [productDetails]);

    useEffect(() => {
        formikFunction.setFieldValue('status', selectedOption?.value)
    }, [selectedOption])

    const ProductImageComponent = () => {
        const [file, setFile] = useState(null);
        const [previewUrl, setPreviewUrl] = useState(null);


        const handleFileUpload = (e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            if (selectedFile) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                };
            } else {
                setPreviewUrl(null);
            }
        };

        const handleUpload = (e) => {
            if (file) {
                setLoading(true)
                let formData = new FormData();
                if (file) {
                    formData.append("image", file)
                };
                addProductImageByProductId(id, formData).then((res) => {
                    if (res?.status) {
                        toast.success(res?.message);
                        getProductDetailsFunction();
                        setKey('productImages');
                        handleDeleteClick();
                    } else {
                        toast.error(res?.message);
                    }
                }).catch((e) => {
                    toast.error(e?.response?.data?.message);
                }).finally(() => {
                    setLoading(false)
                })
            } else {
                toast.error("Please select any image file.");
            }

        }

        /* DELETE HANDLER FUNCTION */
        const handleDeleteClick = () => {
            setFile(null);
            setPreviewUrl(null);
        };

        const handleDeleteImage = (deleteId) => {
            deleteProductImageByProductImageId(id, deleteId)
                .then((res) => {
                    if (res?.status) {
                        toast.success(res?.message);
                        getProductDetailsFunction();
                        setKey('productImages');
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((e) => {
                    toast.error(e?.response?.data?.message);
                })

        };
        return <>
            <Row>

                {/* Preview Existing Product Images */}
                <Col sm={12} className="py-3 border-bottom">
                    <div className="file-uploader d-block">
                        <p style={{ fontSize: "15px", fontWeight: 600 }}>
                            Glance through your products images
                        </p>
                        <div className="d-flex">
                            {productDetails?.image && (productDetails?.image?.length > 0) ? (productDetails?.image?.map((element, index) => {
                                return <div key={index} className="uploaded-image">
                                    <img src={`${element?.url}`} alt="Profile" />
                                    <div className="action-btns">
                                        <Button
                                            className="remove-btn"
                                            onClick={() => {
                                                handleDeleteImage(element?._id)
                                            }}
                                        >
                                            <UilTrash size="15" color="#323232" />
                                        </Button>
                                    </div>
                                </div>
                            })) : "No Images added"}
                        </div>
                    </div>
                </Col>
                {/* Upload New Product Image */}
                <Col sm={12} className="pt-4">
                    <div className="file-uploader">
                        <div className="custom-file-input-css">
                            <div className="img-selection-box">
                                <div>
                                    <ImportIcon size="20" color="#323232" />
                                    <p>Upload from local computer</p>
                                </div>
                            </div>
                            <input
                                type="file"
                                className="image-control"
                                name="image"
                                id="image"
                                placeholder="Product Name"
                                onChange={handleFileUpload}
                            />
                        </div>
                        {previewUrl ? (
                            previewUrl.startsWith("data:image") ? (
                                <div className="uploaded-image">
                                    <img src={previewUrl} alt="Profile" />
                                    <div className="action-btns">
                                        <Button
                                            className="remove-btn"
                                            onClick={handleDeleteClick}
                                        >
                                            <UilTrash size="15" color="#323232" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="uploaded-image">
                                    <img src={`${previewUrl}`} alt="Profile" />
                                    <div className="action-btns">
                                        <Button
                                            className="remove-btn"
                                            onClick={handleDeleteClick}
                                        >
                                            <UilTrash size="15" color="#323232" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        ) : null}
                    </div>
                </Col>
                {/* Submit Button */}
                <Col sm={12}>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="primary-btn mt-2"
                        onClick={handleUpload}
                    >
                        {loading ? <Spinner size="sm" /> : "Upload Image"}
                    </Button>
                </Col>
            </Row>
        </>
    }
    return <section className="users">
        {/* BACKGROUND BANNER */}
        <div className="product-details-page" />

        <div className="container">
            {/* PAGE HEADING */}
            <div className="page-head  pt-4 pb-3">
                <Row className="align-center">
                    <Col lg="12" sm="12">
                        <h1>Add New Product Details</h1>
                    </Col>
                </Row>
            </div>

            <div className="users-table">
                <Card className="users-list">
                    <Tab.Container activeKey={key}>
                        <Card.Header className="users-header pt-3 ps-4 ">
                            <Row className="align-center">
                                <Col lg="10" sm="12">
                                    <Nav variant="tabs" activeKey={key} >
                                        <Nav.Item>
                                            <Nav.Link eventKey="productDetails" onClick={() => { setKey('productDetails') }}>
                                                <h5 className="text-black"> Product Details</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="productImages" onClick={() => { setKey('productImages') }}>
                                                <h5 className="text-black"> Product Images</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg="2" sm="12">
                                    <div className="d-flex resp-start">
                                        <Button
                                            className="import-btn bg-black border-0"
                                            onClick={() => {
                                                navigate("/products/");
                                            }}
                                        >
                                            <ArrowLeft size="20" color="#f8f8f8" />

                                        </Button>
                                    </div>
                                </Col>
                            </Row>


                        </Card.Header>
                        <Card.Body className="users-list-body">
                            <div className="px-4 py-4 pt-2">
                                <Tab.Content>
                                    <Tab.Pane eventKey="productDetails">
                                        <form onSubmit={formikFunction.handleSubmit}>
                                            <Row className="align-center py-2">
                                                <Col lg={3} sm={12}>
                                                    <div className="form-group">
                                                        <label className="form-label d-inline" htmlFor="name">
                                                            Product Name
                                                            {formikFunction.errors.name && formikFunction.touched.name && (
                                                                <small style={{ color: "red", float: 'right' }}>
                                                                    {formikFunction.errors.name}
                                                                </small>
                                                            )}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={formikFunction.errors.name && formikFunction.touched.name ? "form-control border-danger" : "form-control"}
                                                            placeholder="Product Name"
                                                            name="name"
                                                            id="name"
                                                            onChange={formikFunction.handleChange}
                                                            value={formikFunction.values.name}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={3} sm={12}>
                                                    <div className="form-group">
                                                        <label className="form-label d-inline" htmlFor="price">
                                                            Price
                                                            {formikFunction.errors.price && formikFunction.touched.price && (
                                                                <small style={{ color: "red", float: 'right' }}>
                                                                    {formikFunction.errors.price}
                                                                </small>
                                                            )}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className={formikFunction.errors.price && formikFunction.touched.price ? "form-control border-danger" : "form-control"}
                                                            placeholder="Product Price"
                                                            name="price"
                                                            id="price"
                                                            onChange={formikFunction.handleChange}
                                                            value={formikFunction.values.price}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={4} sm={12}>
                                                    <div className="form-group">
                                                        <label className="form-label d-inline" htmlFor="description">
                                                            Description
                                                            {formikFunction.errors.description && formikFunction.touched.description && (
                                                                <small style={{ color: "red", float: 'right' }}>
                                                                    {formikFunction.errors.description}
                                                                </small>
                                                            )}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={formikFunction.errors.description && formikFunction.touched.description ? "form-control border-danger" : "form-control"}
                                                            placeholder="Product Price"
                                                            name="description"
                                                            id="description"
                                                            onChange={formikFunction.handleChange}
                                                            value={formikFunction.values.description}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={2} sm={12}>
                                                    <div className="form-group">
                                                        <label className="form-label" htmlFor="description">
                                                            Status
                                                        </label>
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={(event) => {
                                                                setSelectedOption(event)
                                                            }}
                                                            options={options}
                                                        />
                                                        {formikFunction.errors.description &&
                                                            formikFunction.touched.description && (
                                                                <small style={{ color: "red" }}>
                                                                    {formikFunction.errors.description}
                                                                </small>
                                                            )}
                                                    </div>
                                                </Col>
                                                <Col sm={12}>
                                                    <Button
                                                        type="submit"
                                                        disabled={false}
                                                        className="primary-btn mt-2"
                                                    >
                                                        {loading ? <Spinner size="sm" /> : "Submit Details"}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="productImages">
                                        <ProductImageComponent />
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Card.Body>
                    </Tab.Container>


                </Card>
            </div>
        </div>
    </section>
}
export default EditProductComponent