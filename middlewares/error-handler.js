const {
  BADREQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/constants");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  switch (err.name) {
    case "CastError":
    case "ValidationError":
      res
        .status(BADREQUEST_ERROR_CODE)
        .send({ message: "Переданы некорректные данные" });
      break;
    case "TypeError":
    case "BadRequestError":
      res.status(BADREQUEST_ERROR_CODE).send({ message: err.message });
      break;
    case "NotFoundError":
      res.status(NOTFOUND_ERROR_CODE).send({ message: err.message });
      break;
    default:
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
  }
};

module.exports = errorHandler;