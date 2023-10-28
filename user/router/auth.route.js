const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");  // Auth Controller
const authValidation = require("../validator/auth.validator");   // Auth Validator

router.post("/register", authValidation.register, authController.register);
router.post("/login", authValidation.login, authController.login);

module.exports = router;
