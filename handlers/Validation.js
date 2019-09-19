const Joi = require("@hapi/joi");

const register = Joi.object().keys({
  password: Joi.string().required(),
  fname: Joi.string().required(),
  lname: Joi.string().required()
  // email: Joi.string()
  //   .email()
  //   .required(),
  // phoneNo: Joi.string()
  //   .trim()
  //   .regex(/^[0-9]{7,10}$/)
  //   .required()
  // state: Joi.string().required(),
  // city: Joi.string().required()
});

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string().required()
});

const schemas = {
  //register: registerSchema,
  login: loginSchema
};

const validation = async (data, schema) => {
  const promise = await Joi.validate(data, schema);
  console.log(promis.value);
  console.log(promis.error);
  if (!error) {
    resolve(value);
  } else {
    reject(error);
  }
};

module.exports = validation;
