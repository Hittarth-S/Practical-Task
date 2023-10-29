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

/* ACCOUNT */
app.get("/account", (request, response) => {
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
app.get("/shop", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* CART */
app.get("/cart", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* PRODUCT DETAIL */
app.get("/product/:id", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data;
    response.send(result);
  });
});

/* ERROR PAGE  */
app.get("/:id", (request, response) => {
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