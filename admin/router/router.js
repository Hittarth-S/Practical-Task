const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");

const productRouter = require("./product.route");
const usersRouter = require("./users.route");


router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/product", productRouter);



module.exports = router;