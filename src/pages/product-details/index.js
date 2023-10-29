/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Row, Col, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router";

import { Helmet } from "react-helmet";

import { toast } from "react-toastify";

import Select from "react-select";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Pagination } from "swiper";

/* ICONS */
import {
  BiArrowBack
} from "react-icons/bi";

/* SWIPER STYLES */
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import { getProductDetailsById } from "../../service/api";
import actions from "../../redux/actions/productAction";


const quantity = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const ContactUs = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userDetails = useSelector((state) => state?.user?.user);
  const cart = useSelector((state) => state.products?.cart);

  // States
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [activeImage, setActiveImage] = useState(null)
  const [count, setCount] = useState(1);


  // UseEffect
  useEffect(() => {
    getProductDetails();
  }, [id])


  // Functions
  const getProductDetails = () => {
    if (id) {
      getProductDetailsById(id).then((res) => {
        if (res?.status) {
          setProductDetails(res?.data);
          if (res?.data?.image?.[0]?.url) {
            setActiveImage(res?.data?.image?.[0])
          } else {
            setActiveImage({ url: require("../../assets/image-not-found-1.png") })

          }
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
    } else {
      return

    }

  }

  /* QUANTITY INCREMENT FUNCTION */
  function increment() {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }

  /* QUANTITY DECREMENT FUNCTION */
  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }

  /* ADD TO CART */
  const handleAddToCart = () => {

    if (count === 0) {
      toast.warn("Add the Quantity you want to buy.");
      return;
    }

    if (cart?.filter((obj) => obj.product?._id === productDetails?._id)?.length > 0) {
      let data = cart?.filter((obj) => (obj?.product?._id !== productDetails?._id));

      let product = cart?.filter((obj) => (obj?.product?._id === productDetails?._id))[0];

      product.quantity = product.quantity + count;

      data.push(product);

      dispatch(actions.setCartData(data));
      toast.success("Your product has been added to cart successfully.");

    } else {
      dispatch(actions.setCartData([...cart,
      {
        product: productDetails,
        quantity: count,
        amount: productDetails?.price,
      },]));
      toast.success("Your product has been added to cart successfully.");
    }
  }
  const ProductDetailComponent = () => {
    return <section className="contact-us product-detail">
      <Helmet>
        <title>Product | Website</title>
      </Helmet>

      {/* LOCATION MAP */}
      <div className="details">
        <div className="container ">

          <Row className="justify-content-between">

            {/* IMAGES */}
            <Col xl="6" sm="12">
              <Row className="images-list">
                <Col lg="12" sm="12">
                  <div className="primary-img">
                    <img
                      src={`${activeImage?.url}`}
                      alt={"Buy " + productDetails?.name}
                    />
                  </div>
                </Col>
                <Col lg="12" sm="12" className="">
                  <div className="product-small-images">
                    <Swiper
                      modules={[Scrollbar, Navigation, Pagination]}
                      navigation={true}
                      slidesPerView={5}
                      spaceBetween={10}
                    >
                      {productDetails?.image?.length
                        ? productDetails?.image?.map((imgLink, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <div className="product-detail-img-slider">
                                <img
                                  src={`${imgLink?.url}`}
                                  onClick={() => {
                                    setActiveImage(imgLink);
                                  }}
                                  alt={
                                    "Buy " + productDetails?.name
                                  }
                                />
                              </div>
                            </SwiperSlide>
                          );
                        })
                        : null}
                    </Swiper>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* PRODUCT DETAIL */}
            <Col xl="6" sm="12">
              <div className="product-description">
                <Row>
                  <Col xl={10} sm={12}>
                    <h3>{productDetails?.name}</h3>

                    {/* REVIEWS AND STOCK UPDATE */}
                    <div className="d-flex align-items-center">
                      <div className="in-stock">In stock</div>

                      <Link className="review-link">3 reviews</Link>
                    </div>

                    {/* ADD TO CART */}
                    <Row className="mt-3">
                      <Col xl="2" sm="12">
                        <div className="quantity-counter">
                          <Button className="minus-counter" onClick={decrement}>
                            -
                          </Button>
                          <div className="count">
                            <p>{count}</p>
                          </div>
                          <Button className="plus-counter" onClick={increment}>
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col xl="5" sm="12">
                        <Button
                          className="add-to-bag"
                          onClick={handleAddToCart}
                        >
                          Add to Bag - ₹{productDetails?.price}
                        </Button>
                      </Col>

                    </Row>

                    <div className="product-detail-description-body pt-4">
                      {productDetails?.description}
                    </div>
                  </Col>
                  <Col sm={2} >
                    <Button className="back-btn" onClick={() => navigate(-1)}>
                      <BiArrowBack style={{ fontSize: "18px" }} />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  }

  return productDetails ? <ProductDetailComponent /> : <section className="contact-us cart">
    <Helmet>
      <title>Product | Website</title>
    </Helmet>

    <div className="details">
      <div className="container">
        <Row>
          <Col lg="12" sm="12">
            {!loading ? <h2>Please wait...</h2> : <h2>No Product Found</h2>}

          </Col>
        </Row>
      </div>
    </div>
  </section>
};

export default ContactUs;