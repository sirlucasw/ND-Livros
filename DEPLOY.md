# 📋 Guia de Deploy - ND Livros

## **PASSO 1: Fazer Push no GitHub**

```powershell
cd "c:\Users\lukin\OneDrive\Documentos\GitHub\ND-Livros"
git add .
git commit -m "Preparar para deploy: Render + Vercel"
git push origin main
```

---

## **PASSO 2: Deploy do Backend no Render**

1. Acesse https://render.com
2. Clique em **"New +"** → **"Web Service"**
3. Selecione seu repositório GitHub
4. Configure:
   - **Name:** `nd-livros-api`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Root Directory:** `backend`

5. Clique em **"Environment"** e adicione:
   - **MONGO_URI:** `mongodb+srv://lucasssouza_db_user:VWmMMfgFbYQTxB1e@cluster0.cjyw8kk.mongodb.net/nd-livros?retryWrites=true&w=majority`
   - **PORT:** `5000`
   - **NODE_ENV:** `production`

6. Clique em **"Create Web Service"**
7. Aguarde ~3-5 minutos (Rendering)
8. Copie a URL gerada (algo como: `https://nd-livros-api.onrender.com`)

---

## **PASSO 3: Atualizar URL do Frontend**

Depois que o Render gerar a URL, você precisa:

1. Abra `frontend/js/app.js`
2. Altere a linha:
```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api/Livro'
  : 'https://seu-backend-render.onrender.com/api/Livro';
```

Substitua `seu-backend-render.onrender.com` pela URL real que o Render gerou.

3. Faça commit:
```powershell
git add .
git commit -m "Atualizar URL do backend para Render"
git push
```

---

## **PASSO 4: Deploy do Frontend na Vercel**

1. Acesse https://vercel.com
2. Clique em **"Add New"** → **"Project"**
3. Selecione seu repositório GitHub
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Other`
   - **Build Command:** (deixe em branco)
   - **Install Command:** `npm install` (ou deixe default)

5. Clique em **"Deploy"**
6. Aguarde ~2-3 minutos
7. Você receberá uma URL (algo como: `https://nd-livros.vercel.app`)

---

## **Resumo Final:**

| Serviço | URL |
|---------|-----|
| **API Backend** | https://seu-backend-render.onrender.com |
| **Frontend PWA** | https://nd-livros.vercel.app |
| **Banco de Dados** | MongoDB Atlas (já configurado) |

---

**Tudo pronto! 🚀**
