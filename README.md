# Практическая работа №14: Место.Backend

- Описание
- Особенности

---

**Описание**

Практическая работа №14 курса "Веб-разработчик" Яндекс.Практикума — продолжаем изучать серверную часть разработки на базе MongoDB и Express.JS

---

**Особенности**

Добавили в схему пользователя электронную почту с валидацией и пароль

```javascript
// models/users.js
email: {
    type: String,
    required: [true, "Поле email не должно быть пустым"],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
```

Расширили возможности контроллера создания пользователя. Хешируем пароль криптомодулем **bcriptjs** 

```javascript
// controllers/users.js
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(CREATED_SUCCESS_CODE).send(user))
    .catch(next);
};
```

Создаём новый контроллер для авторизации пользователя login. Создаём _cookie_ с токеном

```javascript
// controllers/users.js
// сравниваем хеши паролей
      return bcrypt.compare(password, user.password)
...
// аутентификация успешна — создадим токен на 7 дней
        const token = jwt.sign({ _id: user._id }, "secret-string", {
          expiresIn: "7d",
        });
        // вернём куку с токеном
        return res
          .cookie("jwt", token, {
            httpOnly: true,
          })
```

Сделали middleware для авторизации

```javascript
// middlewares/auth.js

// извлекаем токен из куков запроса
  const token = req.cookies.jwt;
...
let payload;
  try {
    // проверяем токен на подлинность
    payload = jwt.verify(token, "secret-string");
  } catch (err) {
    return next(new Unauthorized("Некорректный токен"));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
```

Все запросы к базе данных валидируются. Ошибки обрабатываются централизованно

```javascript
// middlewares/error-handler.js
const errorHandler = (err, req, res, next) => {
  const { code, name, message } = err;

  if (
    (name === "MongoServerError" || name === "MongoError") &&
    code === 11000
  ) {
    res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: "Пользователь с данным email уже существует" });
  } else {
    switch (name) {
      case "CastError":
        res
          .status(BADREQUEST_ERROR_CODE)
          .send({ message: "Переданы некорректные данные" });
        break;
      case "ValidationError":
        res.status(BADREQUEST_ERROR_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(". ")}`,
        });
        break;
...
```

Для валидации ссылок на аватар и карточек создаём свой валидатор на основе регулярных выражений RegEx

```javascript
// utils/check-url.js
function checkUrl(str) {
  return /^https?:\/\/w?w?w?\.?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]#?/gi.test(str);
}

module.exports = checkUrl;

```

Используем свой валидатор в схемах

```javascript
// models/cards.js
...
link: {
    type: String,
    required: [true, "Должна быть указана ссылка"],
    validate: {
      validator: (v) => checkUrl(v),
      message: "Неправильный формат ссылки",
    },
...
```

---

Это — backend. Поэтому ссылок нет. Пока нет.
