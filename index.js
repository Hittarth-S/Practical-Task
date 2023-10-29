const express = require("express");
const app = express();
const config = require("./config/config");
const path = require("path");

const router = require("./routes");
app.use("/", router);
app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(config.PORT, () => console.log("Website available at " + config.PORT));
