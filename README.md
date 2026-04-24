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

## 🎓 Aprendizados Aplicados

- ✅ Arquitetura MVC (Model-View-Controller)
- ✅ RESTful API Design
- ✅ Banco de dados NoSQL (MongoDB)
- ✅ PWA e Service Workers
- ✅ Desenvolvimento Fullstack
- ✅ Deploy em produção

