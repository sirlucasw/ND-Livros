const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/LivroController');



router.get('/', LivroController.listarLivro);
router.get('/:id', LivroController.umLivro);
router.post('/', LivroController.criarLivro);  // Rota para criar um novo livro, direcionando as requisições POST para o método criarLivro do LivroController
router.put('/:id', LivroController.editarLivro); // Rota para editar um livro existente, direcionando as requisições PUT para o método editarLivro do LivroController, onde :id é um parâmetro que representa o ID do livro a ser editado
router.delete('/:id', LivroController.deletarLivro);
router.patch('/:id/emprestar', LivroController.emprestarLivro); // Rota para emprestar um livro, direcionando as requisições PATCH para o método emprestarLivro do LivroController, onde :id é um parâmetro que representa o ID do livro a ser emprestado

module.exports = router;