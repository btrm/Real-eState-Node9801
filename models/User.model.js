const bcrypt = require("bcrypt");
const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    phoneNo: { type: String, required: true },
    avatar: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    updatedOn: { type: Date, default: Date.now() },
    createdOn: { type: Date },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    state: { type: Schema.Types.ObjectId, ref: "States" }
  },
  {
    collection: "Users",
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(error, hashedPass) {
        if (error) return next(err);
        user.password = hashedPass;
        return next();
      });
    });
  } else {
    next(new Error("User already exist!"));
  }
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (!err && isMatch) return cb(null, isMatch);
    return cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
