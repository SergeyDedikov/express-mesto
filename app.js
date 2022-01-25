const express = require("express");

const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");

const app = express();

// -- Midleware for userId

app.use((req, res, next) => {
  req.user = {
    _id: "61e00e9e632223a4fc65b762",
  };

  next();
});

app.use(bodyParser.json());
app.use(usersRoutes);
app.use(cardsRoutes);
app.use((req, res, next) => {
  next(new NotFoundError("Был запрошен несуществующий роут"));
});
app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  // следующие опции нужно закомментировать для MongoDB <=v.4.2
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
