# 📚 ND Livros - Gerenciador de Biblioteca

Uma aplicação **fullstack** completa para gerenciar uma biblioteca pessoal com **PWA** (Progressive Web App) frontend e **API REST** backend.

## 🎯 Características

- ✅ **CRUD completo** - Criar, ler, atualizar e deletar livros
- ✅ **Progressive Web App** - Funciona offline com Service Worker
- ✅ **Responsivo** - Interface mobile-first
- ✅ **API REST** - Backend estruturado com Express.js
- ✅ **MongoDB** - Banco de dados robusto e escalável
- ✅ **Deploy pronto** - Render (backend) e Vercel (frontend)

---

## 🏗️ Arquitetura

```
ND-Livros/
├── backend/          # API Node.js + Express
│   ├── src/
│   │   ├── config/   # Configuração do MongoDB
│   │   ├── models/   # Schemas do Mongoose
│   │   ├── controllers/ # Lógica de negócio
│   │   └── routes/   # Endpoints da API
│   ├── server.js     # Entrada do servidor
│   └── package.json
│
├── frontend/         # PWA com HTML, CSS, JS
│   ├── index.html    # Interface principal
│   ├── js/app.js     # Lógica e integração com API
│   ├── css/style.css # Estilos responsivos
│   ├── manifest.json # Configuração PWA
│   ├── service-worker.js # Cache offline
│   └── icons/        # Ícones da aplicação
│
└── README.md
```

---

## 🚀 Como Rodar em Desenvolvimento

### **Pré-requisitos**
- Node.js >= 14.x
- MongoDB (local ou Atlas)
- Git

### **1. Clonar repositório**
```bash
git clone https://github.com/seu-usuario/ND-Livros.git
cd ND-Livros
```

### **2. Configurar Backend**

```bash
cd backend
npm install
```

Criar arquivo `.env`:
```env
# Para MongoDB local:
MONGO_URI=mongodb://localhost:27017/nd-livros
PORT=5000
NODE_ENV=development

# Para MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nd-livros?retryWrites=true&w=majority
```

### **3. Iniciar MongoDB** (em um terminal)

```bash
# Se usar MongoDB local
mongod

# Ou configure MongoDB Atlas no .env
```

### **4. Rodar o Backend** (em outro terminal)

```bash
cd backend
npm run dev
```

Servidor rodará em: `http://localhost:5000`

### **5. Abrir Frontend**

```bash
# Abra em seu navegador:
file:///caminho/para/ND-Livros/frontend/index.html

# Ou use um servidor HTTP local:
cd frontend
npx http-server
```

Frontend rodará em: `http://localhost:8080`

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/Livro` | Listar todos os livros |
| `GET` | `/api/Livro/:id` | Obter um livro específico |
| `POST` | `/api/Livro` | Criar novo livro |
| `PUT` | `/api/Livro/:id` | Atualizar livro |
| `DELETE` | `/api/Livro/:id` | Deletar livro |
| `PATCH` | `/api/Livro/:id/emprestar` | Marcar livro como emprestado |

### **Exemplo de uso:**

```bash
# Criar um livro
curl -X POST http://localhost:5000/api/Livro \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code",
    "descricao": "A Handbook of Agile Software Craftsmanship",
    "autor": "Robert C. Martin"
  }'

# Listar todos
curl http://localhost:5000/api/Livro
```

---

## 🔧 Tecnologias Utilizadas

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Mongoose** - ODM para MongoDB
- **MongoDB** - Banco de dados
- **Nodemon** - Auto-reload em desenvolvimento
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

### **Frontend**
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos
- **JavaScript (Vanilla)** - Lógica e integração
- **Service Worker** - Funcionamento offline
- **PWA** - Progressive Web App

---

## 📦 Como Fazer Deploy

### **Option 1: Deploy Automático (Recomendado)**

Siga o guia em [DEPLOY.md](./DEPLOY.md) para:
- Deploy do backend no **Render**
- Deploy do frontend na **Vercel**
- Configuração do **MongoDB Atlas**

### **Option 2: Deploy Manual**

#### **Backend (Render)**
1. Push para GitHub
2. Acesse https://render.com
3. Conecte seu repositório
4. Configure variáveis de ambiente `.env`
5. Deploy automático a cada push

#### **Frontend (Vercel)**
1. Acesse https://vercel.com
2. Importe seu repositório GitHub
3. Configure `Root Directory: frontend`
4. Deploy automático

---

## 🔒 Variáveis de Ambiente

### **Backend (.env)**
```env
MONGO_URI=seu_mongo_uri_aqui
PORT=5000
NODE_ENV=production
```

**Nunca commite o `.env` no Git!** Use `.env.example` como referência.

---

## 📝 Scripts NPM

### **Backend**
```bash
npm start    # Rodar em produção
npm run dev  # Rodar em desenvolvimento com nodemon
npm test     # Rodar testes (não configurado ainda)
```

---

## 🐛 Troubleshooting

### **Erro: `ECONNREFUSED` no MongoDB**
```bash
# Certifique-se que MongoDB está rodando
mongod

# Ou use MongoDB Atlas atualizando o .env
```

### **Erro: CORS**
```bash
# Atualize a URL do frontend em frontend/js/app.js:
const API_URL = 'https://seu-backend-render.onrender.com/api/Livro'
```

### **Frontend não carrega dados**
```bash
# Abra o Console do navegador (F12)
# Verifique se a API_URL está correta
# Verifique se o backend está rodando
```

---

## 📚 Estrutura do Banco de Dados

### **Modelo: Livro**
```javascript
{
  _id: ObjectId,
  titulo: String (obrigatório),
  descricao: String (obrigatório),
  autor: String,
  disponivel: Boolean (padrão: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **ISC**. Veja o arquivo LICENSE para mais detalhes.

---

## 👤 Autor

**Lucas Souza**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@example.com

---

## 🎓 Aprendizados Aplicados

- ✅ Arquitetura MVC (Model-View-Controller)
- ✅ RESTful API Design
- ✅ Banco de dados NoSQL (MongoDB)
- ✅ PWA e Service Workers
- ✅ Desenvolvimento Fullstack
- ✅ Deploy em produção

---

## 📞 Suporte

Encontrou um problema? Abra uma [Issue](https://github.com/seu-usuario/ND-Livros/issues).

---

## 🌟 Dê uma estrela!

Se este projeto foi útil, não esqueça de dar uma ⭐ no GitHub!

---

**Última atualização:** Abril de 2026
