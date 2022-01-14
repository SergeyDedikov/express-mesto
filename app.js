const express = require("express");
const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");

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

app.use((req, res) => {
  res.status(404).send({ message: "Был запрошен несуществующий роут" });
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  // useCreateIndex: true, // закомментировать для MongoDB <=v.4.2
  // useFindAndModify: false, // закомментировать для MongoDB <=v.4.2
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
