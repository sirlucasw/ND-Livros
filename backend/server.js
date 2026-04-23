// Arquivo onde o servidor é configurado e iniciado

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectDB = require('./src/config/db');

// Validação de variáveis de ambiente obrigatórias
if (!process.env.MONGO_URI) {
    console.error('❌ Erro: A variável de ambiente MONGO_URI não está definida no arquivo .env');
    console.error('   Certifique-se de que o arquivo backend/.env contém: MONGO_URI=sua_uri_aqui');
    process.exit(1);
}

const PORT = process.env.PORT || 5000;

const app = express(); //Cria uma instância do Express para configurar o servidor
app.use(cors()); //Habilita o CORS para permitir requisições de diferentes origens
app.use(express.json()); //Usa padrão de escrita JSON para as requisições
app.use('/api/Livro', require('./src/routes/LivroRoutes'));

// Conectar ao MongoDB e iniciar o servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}!`);
    });
});
