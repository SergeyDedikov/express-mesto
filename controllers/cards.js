const NotFoundError = require("../errors/not-found-error");
const Card = require("../models/card");
const { OK_SUCCESS_CODE, CREATED_SUCCESS_CODE } = require("../utils/constants");

const getCards = (req, res, next) =>
  Card.find({})
    .then((cards) => {
      res.status(OK_SUCCESS_CODE).send(cards);
    })
    .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_SUCCESS_CODE).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .orFail(new NotFoundError(`Карточка с указанным _id ${cardId} не найдена`))
    .then((card) => res.status(OK_SUCCESS_CODE).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new NotFoundError(`Карточка с указанным _id ${cardId} не найдена`))
    .then((card) => res.status(OK_SUCCESS_CODE).send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new NotFoundError(`Карточка с указанным _id ${cardId} не найдена`))
    .then((card) => res.status(OK_SUCCESS_CODE).send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
