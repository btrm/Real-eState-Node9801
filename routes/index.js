const authRoutes = require("./Auth.route");
const homeRoutes = require("./Home.route");
const userRoutes = require("./User.route");
const commonRoutes = require("./Common.route");
const auth = require("../handlers/Auth");

module.exports = app => {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", auth, userRoutes);
  app.use("/common", auth, commonRoutes);
  // app.use('/music', musicRoutes);
};
