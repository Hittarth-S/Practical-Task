const express = require("express");
const router = express.Router();

const { verifyJWTToken } = require("../../middleware/jwt.middleware");

const productController = require("../controller/product.controller");  //Product Controller
const productValidation = require("../validator/product.validator");    //Product Validator

// Add New Product
router.post("/", productValidation.addProduct, verifyJWTToken, productController.addProduct);

// Update Product
router.put("/:id", productValidation.updateProduct, verifyJWTToken, productController.updateProduct);

// Get All Products List
router.get("/", productValidation.getProductList, verifyJWTToken, productController.getProduct);

// Get Product Details By Id
router.get("/:id", verifyJWTToken, productController.getProductById);

// Delete Product Details By Id
router.delete("/:id", verifyJWTToken, productController.deleteProduct);


/* IMAGE RELATED ROUTES */
// Upload Image For Product By Id
router.patch("/image/:id", productValidation.addProductImage, verifyJWTToken, productController.addProductImage);

// Update Image For Product By Id
router.patch("/image/:id/:productImageId", productValidation.updateProductImage, verifyJWTToken, productController.updateProductImage);

// Remove Image For Product By Id
router.delete("/image/:id/:productImageId", productValidation.deleteProductImage, verifyJWTToken, productController.deleteProductImage);

module.exports = router;