const express = require("express");
const config = require("config");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const secret = config.get("JWT.secretKey");
const port = config.get("WEBSERVER.port");

module.exports = app => {
  // view engine setup
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");
  //secret key
  app.set("secretKey", secret);

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use(cors());
  app.use(helmet());

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
