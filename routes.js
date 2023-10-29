const express = require("express");
const app = express.Router();
const path = require("path");
const fs = require("fs");
const axios = require("axios");

/* HOMEPAGE */
app.get("/", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* PRODUCTS */
app.get("/products", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* ADD PRODUCTS  */
app.get("/products/add", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* EDIT PRODUCTS  */
app.get("/products/edit/:id", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* SHOP */
app.get("/users", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

module.exports = app;