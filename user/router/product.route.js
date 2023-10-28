const express = require("express");
const router = express.Router();

const { verifyJWTToken } = require("../../middleware/jwt.middleware");

const productController = require("../controller/product.controller");  //Product Controller
const productValidation = require("../validator/product.validator");    //Product Validator

// Get All Products List
router.get("/", productValidation.getProductList,  productController.getProduct);

// Get Product Details By Id
router.get("/:id",  productController.getProductById);

module.exports = router;