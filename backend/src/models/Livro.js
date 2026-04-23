const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },

  descricao: {
    type: String,
    required: true
  },

  autor: {
    type: String
  },

  disponivel: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Livro', livroSchema);
