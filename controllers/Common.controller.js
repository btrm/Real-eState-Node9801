//const User = require("../models/User.model");
const City = require("../models/City.model");
const State = require("../models/State.model");
const API = require("../handlers/API");
const { respond } = API;

module.exports = {
  getStateList: async (req, res) => {
    try {
      const state = await State.find({ is_active: true });
      res.json(respond(true, "List of all activated states!", state));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  addOneState: async (req, res) => {
    try {
      const data = req.body;
      if (!data.name) throw new error();
      try {
        const state = new State(data);
        const newState = await state.save();
        res.json(respond(true, "One new state added successfuly!", newState));
      } catch (e) {
        res.json(respond(false, "Error: Failed to save the data!"));
      }
    } catch (e) {
      res.json(respond(false, "Error: Wrong data!"));
    }
  },
  getAllCities: async (req, res) => {
    try {
      const city = await City.find({ is_active: true }).populate(
        "state_id",
        "name"
      );
      res.json(respond(true, "List of all activated cities!", city));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  getCitiesByState: async (req, res) => {
    try {
      const city = await City.find({
        state_id: req.params.state_id,
        is_active: true
      }).populate("state_id", "name");

      res.json(respond(true, "List of all activated cities!", city));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  addOneCity: async (req, res) => {
    try {
      const data = req.body;
      try {
        const city = new City(data);
        const newCity = await city.save();
        res.json(respond(true, "One new city added successfuly!", newCity));
      } catch (e) {
        res.json(respond(false, "Oops, unable to save the data!"));
      }
    } catch (e) {
      res.json(respond(false, "there is no data!"));
    }
  },
  removeCity: async (req, res) => {
    try {
      const city = await City.remove({ _id: req.params.cityId });
      res.json(respond(true, "City removed successfully!", city));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  }
  //   checkeMailAvailability: (req, res) => {}
};
