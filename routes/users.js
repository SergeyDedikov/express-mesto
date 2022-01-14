const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

// -- Обработаем ошибки роута пользователя

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    res
      .status(400)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.name === "CastError") {
    res.status(404).send({ message: "Пользователь не найден" });
  } else {
    res.status(500).send({ message: "На сервере произошла ошибка" });
  }
  //next();
});

module.exports = router;
