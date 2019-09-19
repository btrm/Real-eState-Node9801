const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Users.controller");

//router.get("", Controller);
//router.post("", Controller);
//router.post("", Controller);
router.get("/:id", Controller.getUserDetails);
router.post("/profile", Controller.getProfile);
module.exports = router;
