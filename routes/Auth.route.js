const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Auth.controller");

router.post("/login", Controller.userLogin); //login
router.post("/register", Controller.userRegistration); //registration

//admin
router.get("/admin/userList", Controller.userList); //users List
//router.put('/admin/changePass', Controller.changePass)// cahnge user password
//router.put('/admin/deleteUser', Controller.deleteUser)//delete user by id
module.exports = router;
