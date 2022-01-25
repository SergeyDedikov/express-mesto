const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Необходима авторизация" });
};

const auth = (req, res, next) => {
  const token = req.cookies.jwt; // извлекаем токен из куков

  if (!token) {
    return handleAuthError(res);
  }

  let payload;

  try {
    // проверяем токен на подлинность
    payload = jwt.verify(token, "secret-string");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;
