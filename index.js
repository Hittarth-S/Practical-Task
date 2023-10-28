const express = require("express");

const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const config = require("./config/config");
const router = require("./router");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.use(express.static(__dirname + "public"));
app.use(express.static(path.resolve(__dirname, "./public")));

// Database Config
require("./config/db.config");

app.use("/", router);

//custom 404 page added
app.use(function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send({ success: false, message: "404 Not Found" });
});

app.use(function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.json({ success: false, message: "500 Server Error", data: err.stack });
    next(err);
});

app.listen(config.PORT, () => {
    console.log(`Practical Task Backend running on http://localhost:${config.PORT}`);
});
