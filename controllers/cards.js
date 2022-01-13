const Card = require("../models/card");

const getCards = (req, res) => {
  return Card.find({}).then((cards) => {
    res.status(200).send(cards);
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  return Card.create({ name, link }).then((card) =>
    res.status(201).send(card)
  );
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) => res.send(card));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
