const validator = require('../helpers/validator');

const createProfile = (req, res, next) => {
  const validationRule = {
    userName: 'required|string',
    password: 'required|string',
    email: 'required|email',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createProfile,
};
