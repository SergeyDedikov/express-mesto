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

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу "${req.path}" не найден` });
});

module.exports = router;
