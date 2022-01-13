const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    res.status(200).send(users);
  });
};

const getUser = (req, res) => {
  return User.findById(req.params.userId).then((user) =>
    res.status(200).send(user)
  );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar }).then((user) =>
    res.status(201).send(user)
  );
};

const updateUser = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, ...req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  }).then((user) => res.status(200).send(user));
};

const updateAvatar = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, ...req.body, {
    new: true,
  }).then((avatar) => res.status(200).send(avatar));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
