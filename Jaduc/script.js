document.addEventListener('DOMContentLoaded', () => {
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
});