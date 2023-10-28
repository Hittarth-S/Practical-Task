const express = require("express");
const router = express.Router();

const { verifyJWTToken } = require("../../middleware/jwt.middleware");
const authController = require("../controller/auth.controller");
const authValidation = require("../validator/auth.validator");

router.post("/register", authValidation.register, authController.register);
router.post("/login", authValidation.login, authController.login);

router.put(
  "/password",
  authValidation.changePassword,
  verifyJWTToken,
  authController.changePassword
);

router.put(
  "/forgot/password",
  authValidation.login,
  authController.forgotPassword
);

router.put("user/:id", authValidation.userPass, authController.userPass);

module.exports = router;
