const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { OK_SUCCESS_CODE, CREATED_SUCCESS_CODE } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-error");
const User = require("../models/user");

const getUsers = (req, res, next) =>
  User.find({})
    .then((users) => {
      res.status(OK_SUCCESS_CODE).send(users);
    })
    .catch(next);

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail(
      new NotFoundError(`Пользователь с указанным _id ${userId} не найден`)
    )
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
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
    }
  )
    .orFail(new NotFoundError(`Пользователь с указанным ID не найден`))
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
      runValidators: true,
    }
  )
    .orFail(new NotFoundError(`Пользователь с указанным ID не найден`))
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      // сравниваем хеши паролей
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        // аутентификация успешна — вернём токен
        return res.send({
          token: jwt.sign(
            { _id: user._id },
            "super-strong-secret",
            { expiresIn: "7d" }
          ),
        });
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
