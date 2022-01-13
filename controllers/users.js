const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    res.status(200).send(users);
  });
};

const getUser = (req, res) => {
  const { _id } = req.params;

  return User.findById(_id).then((user) => response.status(200).send(user));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar }).then((user) =>
    res.status(201).send(user)
  );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
