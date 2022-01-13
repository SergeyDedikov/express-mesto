const Card = require("../models/card");

const getCards = (req, res) => {
  return Card.find({}).then((cards) => {
    res.status(200).send(cards);
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id }).then((card) =>
    res.status(201).send(card)
  );
};

const deleteCard = (req, res) => {
  return Card.findByIdAndRemove(req.params.cardId).then((card) =>
    res.send(card)
  );
};

const likeCard = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  ).then((card) => res.send(card));
};

const dislikeCard = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  ).then((card) => res.send(card));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
