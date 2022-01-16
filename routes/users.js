const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");
const {
  BADREQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/constants");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

// -- Обработаем ошибки роута пользователя

router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res
      .status(BADREQUEST_ERROR_CODE)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.name === "CastError") {
    res.status(NOTFOUND_ERROR_CODE).send({ message: "Пользователь не найден" });
  } else {
    res
      .status(DEFAULT_ERROR_CODE)
      .send({ message: "На сервере произошла ошибка" });
  }
  next();
});

module.exports = router;
