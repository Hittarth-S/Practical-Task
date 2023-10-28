/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper';

import { toast } from "react-toastify";

/* API IMPORTS */
import {
  getProductList,
} from "../service/api.js";

const ProductBox = (props) => {
  return (
    <div className="product-box">
      <img
        src={props?.productImg}
        alt={props?.productName}
      />
      <div className="bg-overlay">
        <div className="info-box">
          <div>
            <h5>{props?.productName}</h5>
            <p>{props?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActiveListings = () => {

  // States
  const [productList, setProductList] = useState(0);

  /* GET PRODUCTS LIST */
  const getProductData = () => {
    const obj = {
      page: 1,
      sizePerPage: 10
    };
    getProductList(obj)
      .then((res) => {
        if (res.status) {
          setProductList(res.data?.docs);
        } else {
          toast.error(res?.message);
        }
      }).catch((e) => {
        if (e?.response?.data?.message) {
          toast.error(e?.response?.data?.message);
        } else {
          toast.error(e?.message);
        }

      })
  };

  useEffect(() => {
    getProductData()
  }, [])
  return (
    <section className="active-listings">
      <div className="container">
        <div className="heading">
          <h2>PRODUCTS</h2>
          <Link to={'/shop'} className="listings-link">View all products</Link>
        </div>
      </div>
      <div className="row mt-4">
        <Swiper
          spaceBetween={30}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 6,
            },
          }}
          autoplay
          modules={[Autoplay]}
        >

          {productList?.length > 0 ? (
            productList?.map((product, index) => {
              return <SwiperSlide key={index}>
                <div className="col-xl-12 col-sm-12">
                  <ProductBox
                    productImg={product?.image?.[0]?.url ? product?.image?.[0]?.url : require("../assets/image-not-found-1.png")}
                    productName={product?.name}
                    description={product?.description}
                  />
                </div>
              </SwiperSlide>
            })) : "No Products Found"}

        </Swiper>
      </div>
    </section>
  );
};

export default ActiveListings;