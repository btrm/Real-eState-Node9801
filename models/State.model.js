const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const stateSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    is_active: {
      type: Boolean,
      default: true
    },
    created_on: {
      type: Date,
      default: Date.now
    }
  },

  { collection: "States", timestamps: true }
);

module.exports = mongoose.model("States", stateSchema);
