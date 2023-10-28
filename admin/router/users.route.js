const express = require("express");
const router = express.Router();

const { verifyJWTToken } = require("../../middleware/jwt.middleware");

const usersController = require("../controller/users.controller");  //Users Controller
const usersValidation = require("../validator/users.validator");    //Users Validator

// Update Users
router.put("/:id", usersValidation.updateUser, verifyJWTToken, usersController.updateUser);

// Get All Userss List
router.get("/", usersValidation.getUsersList, verifyJWTToken, usersController.getUsers);

// Get Users Details By Id
router.get("/:id", verifyJWTToken, usersController.getUserById);

// Delete Users Details By Id
router.delete("/:id", verifyJWTToken, usersController.deleteUser);


module.exports = router;