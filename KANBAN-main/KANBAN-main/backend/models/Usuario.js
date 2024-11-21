const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  given_name: String,
  family_name: String,
  nickname: String,
  name: String,
  picture: String,
  locale: String,
  updated_at: Date,
  email: String,
  email_verified: Boolean,
  sub: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
