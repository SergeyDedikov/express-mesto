const { Schema, model } = require("mongoose");
const { isEmail, isURL } = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) =>
        isURL(v, {
          require_protocol: true, // валидируем ссылку
        }),
      message: "Неправильный формат ссылки",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.toJSON = function noShowProtectedKeys() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = model("user", userSchema);
