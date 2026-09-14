/**
 * JADUC - Página de Login e Cadastro
 * Sistema de Autenticação e Redirecionamento
 */

// ==========================================
// VERIFICAÇÃO DE AUTENTICAÇÃO
// ==========================================

/**
 * Verificar se o usuário já está logado ao carregar a página
 */
function checkExistingAuth() {
    const user = JSON.parse(localStorage.getItem('jaducUser'));
    
    if (user && user.isAuthenticated) {
        // Usuário já está logado, redirecionar para comunidade
        console.log('✅ Usuário já autenticado, redirecionando...');
        window.location.href = '../Página de Comunidade/index.html';
    }
}

// ==========================================
// SISTEMA DE LOGIN
// ==========================================

/**
 * Credenciais válidas (simulação - em produção usar API)
 */
const VALID_CREDENTIALS = {
    email: 'usuario@jaduc.com',
    password: 'jaduc2026'
};

/**
 * Validar credenciais de login
 */
function validateLogin(email, password) {
    return email === VALID_CREDENTIALS.email &&
           password === VALID_CREDENTIALS.password;
}

/**
 * Processar login do usuário
 */
function processLogin(email, password) {
    if (validateLogin(email, password)) {
        // Login bem-sucedido
        const userData = {
            isAuthenticated: true,
            username: 'Usuario',
            email: email,
            location: 'Pimentas, Guarulhos - SP',
            loginTime: Date.now()
        };
        
        // Salvar no localStorage
        localStorage.setItem('jaducUser', JSON.stringify(userData));
        
        console.log('✅ Login bem-sucedido!');
        console.log('👤 Usuário:', userData.username);
        
        // Redirecionar para comunidade
        window.location.href = '../Página de Comunidade/index.html';
        
        return true;
    } else {
        // Login falhou
        console.log('❌ Credenciais inválidas');
        return false;
    }
}

/**
 * Mostrar mensagem de erro
 */
function showError(message) {
    // Criar elemento de erro se não existir
    let errorElement = document.getElementById('login-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'login-error';
        errorElement.className = 'error-message';
        
        const loginForm = document.querySelector('.form-login .login-form');
        const firstFormGroup = loginForm.querySelector('.form-group');
        loginForm.insertBefore(errorElement, firstFormGroup);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.animation = 'shake 0.5s ease';
    
    // Ocultar após 4 segundos
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 4000);
}

/**
 * Inicializar formulário de login
 */
function initLoginForm() {
    const loginForm = document.querySelector('.form-login .login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                showError('Por favor, preencha todos os campos.');
                return;
            }
            
            const success = processLogin(email, password);
            
            if (!success) {
                showError('Email ou senha incorretos. Tente novamente.');
                
                // Limpar campo de senha
                document.getElementById('login-password').value = '';
            }
        });
    }
}

// ==========================================
// TRANSIÇÃO ENTRE LOGIN E CADASTRO
// ==========================================

/**
 * Inicializar transição entre formulários
 */
function initFormTransition() {
    const card = document.querySelector('.login-card');
    const toRegisterBtn = document.getElementById('to-register-btn');
    const toLoginBtn = document.getElementById('to-login-btn');

    // Ao clicar em "Não está cadastrado? Clique aqui"
    if (toRegisterBtn) {
        toRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            card.classList.add('is-signup');
        });
    }

    // Ao clicar em "Já possui uma conta? Clique aqui"
    if (toLoginBtn) {
        toLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            card.classList.remove('is-signup');
        });
    }
}

// ==========================================
// SISTEMA DE CADASTRO (PLACEHOLDER)
// ==========================================

/**
 * Inicializar formulário de cadastro
 */
function initRegisterForm() {
    const registerForm = document.querySelector('.form-register .login-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const lastname = document.getElementById('reg-lastname').value;
            const email = document.getElementById('reg-email').value;
            const terms = document.getElementById('terms').checked;
            
            if (!name || !lastname || !email) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!terms) {
                alert('Você deve aceitar os termos de privacidade.');
                return;
            }
            
            // Simular cadastro bem-sucedido
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            
            // Voltar para tela de login
            const card = document.querySelector('.login-card');
            card.classList.remove('is-signup');
        });
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 JADUC - Sistema de Autenticação');
    
    // 1. Verificar se já está logado
    checkExistingAuth();
    
    // 2. Inicializar formulários
    initLoginForm();
    initRegisterForm();
    initFormTransition();
    
    console.log('✅ Sistema de login inicializado');
    console.log('📧 Email de teste: usuario@jaduc.com');
    console.log('🔑 Senha de teste: jaduc2026');
});