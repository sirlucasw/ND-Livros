// Configuração da API
const API_URL = 'http://localhost:5000/api/Livro';

// Elementos DOM
const form = document.getElementById('livro-form');
const formTitle = document.getElementById('form-title');
const livroIdInput = document.getElementById('livro-id');
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const autorInput = document.getElementById('autor');
const disponivelInput = document.getElementById('disponivel');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const livrosList = document.getElementById('livros-list');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

// Estado
let isEditing = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadLivros();
    form.addEventListener('submit', handleSubmit);
    btnCancel.addEventListener('click', resetForm);
});

// Buscar todos os livros
async function loadLivros() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar livros');
        const livros = await response.json();
        renderLivros(livros);
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao carregar livros. Verifique se o backend está rodando.', 'error');
        renderLivros([]);
    } finally {
        showLoading(false);
    }
}

// Renderizar lista de livros
function renderLivros(livros) {
    livrosList.innerHTML = '';

    if (livros.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    livros.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        
        const statusClass = livro.disponivel ? 'status-disponivel' : 'status-indisponivel';
        const statusText = livro.disponivel ? 'Disponível' : 'Indisponível';

        card.innerHTML = `
            <h3>${escapeHtml(livro.titulo)}</h3>
            <p class="autor">${livro.autor ? escapeHtml(livro.autor) : 'Autor desconhecido'}</p>
            <p class="descricao">${escapeHtml(livro.descricao)}</p>
            <span class="status ${statusClass}">${statusText}</span>
            <div class="livro-actions">
                <button class="btn btn-edit" onclick="startEdit('${livro._id}')">✏️ Editar</button>
                <button class="btn btn-delete" onclick="deleteLivro('${livro._id}')">🗑️ Excluir</button>
                ${livro.disponivel ? `<button class="btn btn-loan" onclick="emprestarLivro('${livro._id}')">📖 Emprestar</button>` : ''}
            </div>
        `;

        livrosList.appendChild(card);
    });
}

// Criar ou atualizar livro
async function handleSubmit(e) {
    e.preventDefault();

    const livroData = {
        titulo: tituloInput.value.trim(),
        descricao: descricaoInput.value.trim(),
        autor: autorInput.value.trim(),
        disponivel: disponivelInput.checked
    };

    const url = isEditing ? `${API_URL}/${livroIdInput.value}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na operação');
        }

        showToast(isEditing ? 'Livro atualizado com sucesso!' : 'Livro cadastrado com sucesso!', 'success');
        resetForm();
        loadLivros();
    } catch (error) {
        console.error('Erro:', error);
        showToast(error.message, 'error');
    }
}

// Iniciar edição
async function startEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar livro');
        const livro = await response.json();

        livroIdInput.value = livro._id;
        tituloInput.value = livro.titulo;
        descricaoInput.value = livro.descricao;
        autorInput.value = livro.autor || '';
        disponivelInput.checked = livro.disponivel;

        isEditing = true;
        formTitle.textContent = 'Editar Livro';
        btnSubmit.textContent = 'Atualizar';
        btnCancel.style.display = 'inline-block';

        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao carregar dados do livro', 'error');
    }
}

// Resetar formulário
function resetForm() {
    form.reset();
    livroIdInput.value = '';
    isEditing = false;
    formTitle.textContent = 'Novo Livro';
    btnSubmit.textContent = 'Cadastrar';
    btnCancel.style.display = 'none';
}

// Deletar livro
async function deleteLivro(id) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao excluir livro');

        showToast('Livro excluído com sucesso!', 'success');
        loadLivros();
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao excluir livro', 'error');
    }
}

// Emprestar livro
async function emprestarLivro(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/emprestar`, {
            method: 'PATCH'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao emprestar livro');
        }

        showToast('Livro emprestado com sucesso!', 'success');
        loadLivros();
    } catch (error) {
        console.error('Erro:', error);
        showToast(error.message, 'error');
    }
}

// Utilitários
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
    if (show) livrosList.innerHTML = '';
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

