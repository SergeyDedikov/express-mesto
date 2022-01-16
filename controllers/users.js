const User = require("../models/user");
const { OK_SUCCESS_CODE, CREATED_SUCCESS_CODE } = require("../utils/constants");

const getUsers = (req, res, next) => User.find({})
    .then((users) => {
      res.status(OK_SUCCESS_CODE).send(users);
    })
    .catch(next);

const getUser = (req, res, next) => User.findById(req.params.userId)
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_SUCCESS_CODE).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
    }
  )
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
