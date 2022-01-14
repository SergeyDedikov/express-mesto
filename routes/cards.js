const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

// -- Обработаем ошибки роута карточек

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    res
      .status(400)
      .send({ message: "Переданы некорректные данные карточки" });
  } else if (err.name === "CastError") {
    res.status(404).send({ message: "Карточка не найдена" });
  } else {
    res.status(500).send({ message: "На сервере произошла ошибка" });
  }
  //next();
});

module.exports = router;
