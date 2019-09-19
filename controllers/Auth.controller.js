const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User.model");
//const validation = require("../handlers/Validation");
const API = require("../handlers/API");
var secretKey = config.get("JWT.secretKey");

module.exports = {
  userRegistration: async (req, res) => {
    const { respond } = API;
    let data = req.body;
    try {
      //const newUser = validation(data, "register");
      newUser = data;
      //console.log(data);
      try {
        const user = new User(newUser);
        let data = await user.save();
        res.json(respond(true, "Register user successful!", data));
      } catch (e) {
        res.json(respond(false, "Error registering user"));
      }
    } catch (e) {
      res.json(respond(false, "Invalid user data"));
    }
  },
  userLogin: async (req, res) => {
    const { respond } = API;
    try {
      //const loginData = await validate(req.body, 'login');
      const loginData = req.body;
      try {
        const { email, password } = loginData;
        const user = await User.findOne({ email });
        user.comparePassword(password, (error, isMatch) => {
          if (error && !isMatch) {
            return res.json(respond(false, "Invalid email or password!"));
          }
          const { lname, fname, email, isAdmin } = user;
          const id = user._id;
          const payload = { id, lname, fname, email, isAdmin };
          const claims = {
            expiresIn: "6h",
            issuer: "btrm"
          };
          jwt.sign(payload, secretKey, claims, (err, token) => {
            if (err) throw new Error("Email or password is not correct!");
            res.json(respond(true, "Login Successful!", token));
          });
        });
      } catch (e) {
        return res.json(respond(false, "Invalid email or password!"));
      }
    } catch (e) {
      res.json(respond(false, "Invalid login data!"));
    }
  },
  userList: async (req, res) => {
    const { respond } = API;
    try {
      const users = await User.find({});
      res.json(respond(true, "List users successful", users));
    } catch (e) {
      res.json(respond(false, "Failed to list users"));
    }
  }
};
