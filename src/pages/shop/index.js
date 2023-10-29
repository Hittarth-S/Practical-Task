/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Button, Spinner, Modal } from "react-bootstrap";

import { useNavigate } from "react-router";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

/* Date / Time Fromatter */
import moment from 'moment'

/* ICONS */
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import ReactPaginate from "react-paginate";

/* API IMPORTS */
import {
  getProductList,
} from "../../service/api";

const Shop = () => {
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [productList, setProductList] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [status, setStatus] = useState(0);

  const [viewModalShow, setViewModalShow] = useState(false);
  const [viewData, setViewData] = useState(null);

  // Functions
  /* GET PRODUCTS LIST */
  const getProductData = () => {
    setLoading(true);
    const obj = {
      page: page,
      sizePerPage: pageSize,
    };
    if (status) {
      obj.status = status
    }
    getProductList(obj)
      .then((res) => {
        if (res.status) {
          setTotalProducts(res.data.totalDocs);
          setProductList(res.data?.docs);
          setTotalPages(res?.data?.totalPages);
        } else {
          toast.error(res?.message);
        }
      }).catch((e) => {
        setLoading(false);
        if (e?.response?.data?.message) {
          toast.error(e?.response?.data?.message);
        } else {
          toast.error(e?.message);
        }

      }).finally((res) => {
        setLoading(false);
      });
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setLoading(true);
    setProductList([]);
    setPage(selectedPage);
  };

  const handleClear = () => {
    setStatus(null)
  }
  const handleClose = () => setViewModalShow(false);

  /* USE EFFECT */
  useEffect(() => {
    getProductData();
  }, [page, status]);

  return (
    <section className="shop">
      <Helmet>
        <title>Shop | Website</title>
      </Helmet>

      {/* PAGE BANNER */}
      <div className="page-banner">
        <div className="overlay-text">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-sm-12">
                <h1>SHOP</h1>
                <h2>Explore a world of products tailored just for you.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">

          <div className="row">
            <p>
              Showing <b>{totalProducts ? totalProducts : 0}</b> Products
            </p>

            {/* FILTERS APPLIED BOX */}
            {status ? (
              <div className="filters-applied">
                <p>Filters:</p>
                <div className="applied-filters-list">
                  <div className="applied-filter">
                    <p>
                      <b style={{ fontWeight: "600", textTransform: 'capitalize' }}>
                        {status}
                      </b>
                    </p>
                    <Button className="close-btn" onClick={handleClear}>
                      <AiOutlineClose size="14" color="#0d0d12" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}

            {loading && (<p> <Spinner /> Please wait...</p>)}
            {!loading && productList?.length === 0 && ("No Products Found")}

            {/* PRODUCTS LIST */}
            <div className="col-xl-9 col-sm-12">
              <div className="row">
                {productList?.length > 0 && (
                  productList?.map((product, index) => {
                    return <div key={index} className="col-xl-4 col-sm-12 pb-3" onClick={() => {

                      navigate('/product/' + product?._id)

                    }}>
                      <div className="product-card">
                        <img
                          src={product?.image?.[0]?.url ? product?.image?.[0]?.url : require("../../assets/image-not-found-1.png")}
                          alt={product?.name}
                        />
                        <div className="details">
                          <div className="row pb-0 mb-0">
                            <div className="col-xl-9 col-sm-12">
                              <h2 className="title">
                                {product?.name}
                              </h2>
                            </div>
                            <div className="col-xl-3 col-sm-12 d-flex justify-content-end">
                              <h2 className="title">
                                ₹{product?.price}
                              </h2>
                            </div>
                          </div>
                          <div className="row pb-0 mb-0">
                            <div className="col-xl-9 col-sm-12">
                              <div className="posting-details pt-0 mt-2">
                                <h2>{product?.description}</h2>
                              </div>
                            </div>
                            <div className="col-xl-3 col-sm-12 d-flex justify-content-end">
                              <p className={product?.status === 'active' ? "text-capitalize pt-1 pb-0 mb-0" :
                                product?.status === 'inactive' ? "text-capitalize pt-1 pb-0 mb-0 text-warning" :
                                  product?.status === 'comingSoon' ? "text-capitalize pt-1 pb-0 mb-0 text-success" : "text-capitalize pt-1 pb-0 mb-0"}
                                style={{ fontSize: '12px', fontWeight: 600 }}>
                                {product?.status}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  })
                )}

              </div>
              <ReactPaginate
                className="products-pagination"
                previousLabel={
                  <Button className="product-pagination-btn">
                    <AiOutlineLeft color="#323232" size="20" />
                  </Button>
                }
                nextLabel={
                  <Button className="product-pagination-btn">
                    <AiOutlineRight color="#323232" size="20" />
                  </Button>
                }
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={3}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                activeClassName={"active"}
              />
            </div>

            {/* STATUS SIDEBAR */}
            <div className="col-xl-3 col-sm-12">
              <div className="product-sidebar">
                <h2>Product Status</h2>
                <div className="categories-link">
                  <Link className="link-item" onClick={() => { setProductList(null); setStatus(null) }}>All</Link>
                  <Link className="link-item" onClick={() => { setProductList(null); setStatus('active') }}>Active</Link>
                  <Link className="link-item" onClick={() => { setProductList(null); setStatus('inactive') }} >Inactive</Link>
                  <Link className="link-item" onClick={() => { setProductList(null); setStatus('comingSoon') }} >Coming Soon</Link>
                </div>
              </div>
            </div>

            {/* PRODUCT MODAL */}
            <Modal show={viewModalShow} backdrop="static" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Product Name: </strong>{viewData?.name}</p>
                <p><strong>Price: </strong>₹{viewData?.price}</p>

                <p><strong>Description: </strong>{viewData?.description}</p>
                <p><strong>Created At: </strong> {moment(viewData?.createdAt).format('MMM, DD YYYY, hh:mm A')}</p>


                <h6>Images</h6>

                <div className="row file-uploader">
                  {viewData?.image?.length > 0 ? (
                    viewData?.image?.map((element, index) => {
                      return <div className="col-xl-4 col-sm-12  uploaded-image mb-2">
                        <a href={`${element?.url}`} target="_blank" rel="noreferrer" >
                          <img src={`${element?.url}`} alt="Profile" />
                        </a>

                      </div>
                    })
                  ) : <p>No Images Found</p>}

                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;