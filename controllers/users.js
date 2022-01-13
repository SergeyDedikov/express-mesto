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
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  ).then((user) => res.status(200).send(user));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
    }
  ).then((user) => res.status(200).send(user));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
