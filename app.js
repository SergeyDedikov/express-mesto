const express = require("express");
const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cardsRoutes = require("./routes/cards");

const app = express();
app.use(bodyParser.json());
app.use(cardsRoutes);

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
