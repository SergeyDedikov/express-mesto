const Card = require("../models/card");

const getCards = (req, res, next) => {
  return Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  return Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
