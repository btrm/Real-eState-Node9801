const User = require("../models/User.model");
const API = require("../handlers/API");
const { respond } = API;

module.exports = {
  getUserDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      res.json(respond(true, "User's info is ready!", user));
    } catch (e) {
      res.json(respond(false, "Couldn't find the user!"));
    }
  },

  getProfile: async (req, res) => {
    // console.log(req.any);
    try {
      const { id } = req.any;
      const user = await User.findOne({ _id: id });
      //.populate("city", "name")
      // .populate("state", "name");
      res.json(respond(true, "User's info is prepared!", user));
    } catch (e) {
      res.json(respond(false, "Couldn't find the user!"));
    }
  }
  //   patchUserInfo: (req,res)=>{

  //   },
  //   deleteUser:(req,res)=>{
  //}
};
