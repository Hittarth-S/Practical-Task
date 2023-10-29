/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Row, Col, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";

import { Helmet } from "react-helmet";

import Select from "react-select";

import { updateCart } from "../../service/api";
import actions from "../../redux/actions/productAction";

import { IMG_URL } from "../../config";
import { toast } from "react-toastify";

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
  const userDetails = useSelector((state) => state?.user?.user);
  const cartValue = useSelector((state) => (state?.products?.cart));
  const [cart, setCart] = useState(null);

  // States
  const [total, setTotal] = useState(0);

  // const { setUpdateCart } = useUpdateCart();

  const loadCart = (cartValue) => {
    setCart(null)
    setCart(cartValue);
    let totalPrice = 0;
    cartValue?.map((obj) => {
      totalPrice = totalPrice + obj?.quantity * obj?.amount;
    });
    setTotal(totalPrice);
  }


  useEffect(() => {
    loadCart(cartValue)
    // setUpdateCart(true);

  }, [cartValue]);

  const updateCartQuantity = (id, quantity, index) => {
    cart[index].quantity = parseInt(quantity);

    dispatch(actions.setCartData(cart));
    loadCart(cart);
    toast.success("The quantity has been updated in the cart?.");
  };

  const handleRemoveCart = (data) => {

    let index = cart?.indexOf(data);
    let data1 = cart;
    dispatch(actions.setCartData(data1.filter((obj, i) => index !== i)));
    toast.warn("Product Removed From Cart")

  };


  return (
    <section className="contact-us cart">
      <Helmet>
        <title>Cart | Website</title>
      </Helmet>

      {/* PAGE BANNER */}
      <div className="page-banner">
        <div className="overlay-text">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-sm-12">
                <h1>CART</h1>
                <h2>The items you have added to your shopping cart?.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION MAP */}
      <div className="details">
        <div className="container">
          <Row>
            <Col lg="12" sm="12">
              <h2>Shopping Bag</h2>
            </Col>

            {/* ITEMS LIST */}
            <Col lg="8" sm="12">
              <div className="cart-items">
                <table className="shopping-items">
                  <thead>
                    <tr className="table-head">
                      <td>Items</td>
                      <td></td>
                      <td>Item Price</td>
                      <td>Quantity</td>
                      <td>Total Price</td>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {cart?.length === 0 ? (
                      <tr>
                        <td className="product-details ptb-10" colSpan={5}>
                          <p>
                            <b>Your cart is empty!</b>
                          </p>
                        </td>
                      </tr>
                    ) : (
                      cart &&
                      cart?.map((data, i) => {
                        return (
                          <tr>
                            <td className="product-image ptb-10">
                              <div className="d-flex">
                                {console.log("data?.product?.images", data?.product?.image)}
                                <img

                                  src={
                                    (data?.product?.image?.length > 0
                                      ? data?.product?.image?.[0]?.url
                                      : require("../../assets/image-not-found-1.png"))
                                  }
                                  className="product-img-bought"
                                  alt="Bombshell Brow Kit - Medium"
                                />
                              </div>
                            </td>
                            <td className="product-details ptb-10">
                              <div className="ml-2 py-2 ">
                                <h4 className="product-name">
                                  {data?.product?.name}
                                </h4>
                                <p>
                                  <b>Price: </b>₹{data?.product?.price}
                                </p>
                              </div>
                            </td>
                            <td>
                              <p className="product-price">₹{data?.product?.price}</p>
                            </td>
                            <td>
                              <Select
                                options={quantity}
                                classNamePrefix="select-control"
                                className="qty-width"
                                placeholder="1"
                                name={"quantity" + i}
                                id="quantity"
                                onChange={(e) => {
                                  console.log("CART", cart);
                                  console.log("e: ", e, data);
                                  console.log("i: ", i);
                                  updateCartQuantity(data, e.value, i);
                                }}
                                value={{
                                  value: data?.quantity,
                                  label: data?.quantity,
                                }}
                              />
                              <Button
                                className="remove-product-link"
                                onClick={() => handleRemoveCart(data)}

                              >
                                Remove
                              </Button>
                            </td>
                            <td>
                              <p className="product-price">
                                ₹{data?.amount * data?.quantity}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Col>

            {/* ORDER SUMMARY */}
            <Col lg="4" sm="12">
              <h5 className="summary-heading">Summary</h5>
              <div className="order-summary">
                <div className="items">
                  <p>Items ({cart?.length})</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
                <hr />
                <div className="items">
                  <p>
                    <b>Estimated Total</b>
                  </p>
                  <p>
                    <b>₹{total.toFixed(2)}</b>
                  </p>
                </div>
                {/* <p className="after-pay-link">
                Or 4 interest free installments of $26.00 with <b>Afterpay</b>
              </p> */}
              </div>
              <Button
                onClick={() =>
                  cart?.length === 0
                    ? // enqueueSnackbar('Your Cart is Empty!', { variant: "error" })
                    ""
                    : navigate("/checkout")
                }
                className="checkout-btn"
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;