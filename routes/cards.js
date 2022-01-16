const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const {
  BADREQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/constants");

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

// -- Обработаем ошибки роута карточек

router.use((err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "BadRequestError") {
    res.status(BADREQUEST_ERROR_CODE).send({ message: err.message });
  } else if (err.name === "CastError" || err.name === "NotFoundError") {
    res.status(NOTFOUND_ERROR_CODE).send({ message: err.message });
  } else {
    res
      .status(DEFAULT_ERROR_CODE)
      .send({ message: "На сервере произошла ошибка" });
  }
  next();
});

module.exports = router;
