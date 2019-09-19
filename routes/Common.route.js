const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Common.controller");

router.get("/states", Controller.getStateList);
router.post("/states", Controller.addOneState);
//router.post("", Controller);

router.get("/cities", Controller.getAllCities);
router.get("/cities/:state_id", Controller.getCitiesByState);
router.post("/cities", Controller.addOneCity);

module.exports = router;
