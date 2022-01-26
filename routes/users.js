const router = require("express").Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.get('/users/me', getCurrentUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
