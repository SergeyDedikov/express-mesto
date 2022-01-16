const {
  BADREQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "BadRequestError") {
    res.status(BADREQUEST_ERROR_CODE).send({ message: err.message });
  } else if (err.name === "CastError" || err.name === "NotFoundError") {
    res.status(NOTFOUND_ERROR_CODE).send({ message: err.message });
  } else {
    res
      .status(DEFAULT_ERROR_CODE)
      .send({ message: "На сервере произошла ошибка" });
  }
  next();
};

module.exports = errorHandler;
