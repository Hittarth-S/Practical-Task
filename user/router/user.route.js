const express = require("express");
const router = express.Router();

const { verifyJWTToken } = require("../../middleware/jwt.middleware");

const userController = require("../controller/user.controller");  //User Controller

// Get User Details By Id
router.get("/", verifyJWTToken, userController.getUserById);

module.exports = router;