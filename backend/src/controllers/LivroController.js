const Livro = require('../models/Livro');


// LISTAR LIVROS
exports.listarLivro = async (req, res) => {
    try {
        const livros = await Livro.find();
        res.json(livros);
    }   catch (error) {
        res.status(500).json({ error: error.message});

    }
};

// UM LIVRO
exports.umLivro = async (req, res) => {
    try {
        const livros = await Livro.findById(req.params.id);
        if (!livros) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// CRIAR LIVRO
exports.criarLivro = async (req, res) => {
    try {
        // Validação básica
        const { titulo, descricao, autor } = req.body;
        if (!titulo || !descricao) {
            return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
        }
        const livros = await Livro.create(req.body);
        res.status(201).json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// EDITAR LIVRO
exports.editarLivro = async (req, res) => {
    try {
        const livros = await Livro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!livros) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETAR LIVRO
exports.deletarLivro = async (req, res) => {
    try {
        const livros = await Livro.findByIdAndDelete(req.params.id);
        if (!livros) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json({ mensagem: 'Livro foi deletado da biblioteca' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// EMPRESTAR LIVRO
exports.emprestarLivro = async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        if (!livro.disponivel) {
            return res.status(400).json({ error: 'Livro não está disponível para empréstimo' });
        }

        // Marcar como indisponível
        livro.disponivel = false;
        await livro.save();

        res.json({ mensagem: 'Livro emprestado com sucesso', livro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};