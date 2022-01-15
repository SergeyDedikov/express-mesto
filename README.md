# Практическая работа №13: Место.Backend

- Описание
- Особенности

---

**Описание**

Практическая работа №13 курса "Веб-разработчик" Яндекс.Практикума — начало курса по бэкенду — создаём сервер в среде Node для проекта Mesto, работаем с базами данных.

---

**Особенности**

Подключили фреймворк **Express.js** для работы с сервером и создали точку входа.

```javascript
// package.json
"dependencies": {
    "body-parser": "^1.19.1",
    "express": "^4.17.2",
    "mongoose": "^6.1.6"
  }
...
// app.js
const express = require("express");
const app = express();
```

Создаём порт локального сервера и прослушиваем его:

```javascript
// app.js
const { PORT = 3000 } = process.env;
...
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
```

Устанавливаем сервер для базы данных **MongoDB** и подключаемся к нему:

```javascript
// app.js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  // следующие опции нужно закомментировать для MongoDB <=v.4.2
  useCreateIndex: true,
  useFindAndModify: false,
});
```

Создаём модели для БД, используя схемы:

```javascript
// /models/user.js
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});
module.exports = model('user', userSchema);
```

Используем контроллеры запросов к базе данных для рутов пользователя и карточки:

```javascript
// /controllers/users.js
const User = require("../models/user");
const { OK_SUCCESS_CODE, CREATED_SUCCESS_CODE } = require("../utils/constants");

const getUsers = (req, res, next) => {
  return User.find({})
    .then((users) => {
      res.status(OK_SUCCESS_CODE).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  return User.findById(req.params.userId)
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};
...
```

Обрабатываем руты для пользователей и карточек:

```javascript
// /routes/cards.js
const router = require("express").Router();

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);
...
```

Обрабатываем ошибки на сервере:

```javascript
// /routes/users.js
router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res
      .status(BADREQUEST_ERROR_CODE)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.name === "CastError") {
    res.status(NOTFOUND_ERROR_CODE).send({ message: "Пользователь не найден" });
  } else {
    res
      .status(DEFAULT_ERROR_CODE)
      .send({ message: "На сервере произошла ошибка" });
  }
});
...
```

Временно хардкодим ID нашего пользователя при помощи мидлвары:

```javascript
// app.js
app.use((req, res, next) => {
  req.user = {
    _id: "61e00e9e632223a4fc65b762",
  };

  next();
});
...
```

---
