const jwt = require("jsonwebtoken");
const API = require("../handlers/API");

const { respond } = API;
module.exports = (req, res, next) => {
  if ("auth" in req.headers && req.headers.auth) {
    jwt.verify(req.headers.auth, req.app.get("secretKey"), function(
      err,
      result
    ) {
      if (!err) {
        req.any = result;
        // console.log(req.any);
        next();
      }
    });
  } else {
    res.status(401).send({
      status: false,
      msg: "Authentication failed!!!"
    });
    next();
  }

  // if (!req.headers.auth) {
  //   return res.status(401).json(respond(false, "Unauthorized request"));
  // }
  // const token = req.headers.auth;
  // jwt.verify(token, req.app.get("secretKey"), (err, user) => {
  //   if (!err) {
  //     req.session = user;
  //     next();
  //   }
  //   return res.status(401).json(respond(false, "Unauthorized request"));
  // });
};
