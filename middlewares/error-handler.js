const {
  BADREQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  const { name, message } = err;

  switch (name) {
    case "CastError":
    case "ValidationError":
      res
        .status(BADREQUEST_ERROR_CODE)
        // .send({ message: "Переданы некорректные данные" });
        .send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(". ")}`,
        });
      break;
    case "NotFoundError":
      res.status(NOTFOUND_ERROR_CODE).send({ message });
      break;
    case "Unauthorized":
      res.status(UNAUTHORIZED_ERROR_CODE).send({ message });
      break;
    case "Forbidden":
      res.status(FORBIDDEN_ERROR_CODE).send({ message });
      break;
    default:
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
  }
  next();
};

module.exports = errorHandler;
