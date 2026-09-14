/**
 * JADUC - Página de Comunidade
 * Script de Autenticação, Interatividade e Filtros
 */

// ==========================================
// AUTENTICAÇÃO E PROTEÇÃO DE ROTA
// ==========================================

/**
 * Verificar se o usuário está autenticado
 */
function checkAuthentication() {
    const user = JSON.parse(localStorage.getItem('jaducUser'));
    
    if (!user || !user.isAuthenticated) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = '../Página de Login e Cadastro/index.html';
        return null;
    }
    
    return user;
}

/**
 * Carregar informações do usuário na interface
 */
function loadUserInfo(user) {
    if (!user) return;
    
    // Atualizar nome do usuário
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && user.username) {
        userNameElement.textContent = user.username;
    }
    
    // Atualizar localização
    const userLocationElement = document.getElementById('user-location');
    const heroLocationElement = document.getElementById('hero-location');
    
    if (user.location) {
        if (userLocationElement) {
            userLocationElement.textContent = user.location.substring(0, 18) + '...';
        }
        if (heroLocationElement) {
            heroLocationElement.textContent = user.location;
        }
    }
}

/**
 * Logout do usuário
 */
function logout() {
    localStorage.removeItem('jaducUser');
    window.location.href = '../Página de Login e Cadastro/index.html';
}

// ==========================================
// MENU DO USUÁRIO
// ==========================================

/**
 * Inicializar menu dropdown do usuário
 */
function initUserMenu() {
    const userAvatarBtn = document.getElementById('user-avatar-btn');
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (userAvatarBtn && userMenu) {
        // Toggle menu ao clicar no avatar
        userAvatarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('show');
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target) && e.target !== userAvatarBtn) {
                userMenu.classList.remove('show');
            }
        });
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// ==========================================
// MENU MOBILE
// ==========================================

/**
 * Inicializar menu mobile hambúrguer
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
            
            // Animar as linhas do hambúrguer
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('is-active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(9px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fechar menu ao clicar em um item
        const navItems = mainNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                }
            });
        });
    }
}

// ==========================================
// SISTEMA DE FILTROS
// ==========================================

/**
 * Inicializar filtros de categoria
 */
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.post-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos os botões
            filterButtons.forEach(b => b.classList.remove('filter-btn--active'));
            
            // Adicionar active no botão clicado
            btn.classList.add('filter-btn--active');
            
            // Obter filtro selecionado
            const filter = btn.dataset.filter;
            
            // Filtrar posts
            filterPosts(filter, posts);
        });
    });
}

/**
 * Filtrar posts por categoria
 */
function filterPosts(filter, posts) {
    posts.forEach(post => {
        const category = post.dataset.category;
        
        if (filter === 'all') {
            // Mostrar todos
            post.classList.remove('hidden');
            post.style.animation = 'slideInUp 0.5s ease';
        } else if (category === filter) {
            // Mostrar posts da categoria
            post.classList.remove('hidden');
            post.style.animation = 'slideInUp 0.5s ease';
        } else {
            // Ocultar posts de outras categorias
            post.classList.add('hidden');
        }
    });
}

// ==========================================
// INTERAÇÕES DOS POSTS
// ==========================================

/**
 * Inicializar botões de curtir
 */
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const counter = btn.querySelector('.like-count');
            const currentCount = parseInt(counter.textContent);
            
            if (btn.classList.contains('liked')) {
                // Descurtir
                counter.textContent = currentCount - 1;
                btn.classList.remove('liked');
            } else {
                // Curtir
                counter.textContent = currentCount + 1;
                btn.classList.add('liked');
            }
        });
    });
}

/**
 * Inicializar botões de comentar
 */
function initCommentButtons() {
    const commentButtons = document.querySelectorAll('.comment-btn');
    
    commentButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Placeholder para funcionalidade futura
            alert('Funcionalidade de comentários em desenvolvimento!');
        });
    });
}

/**
 * Inicializar botões "Leia mais"
 */
function initReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const postContent = btn.previousElementSibling;
            
            if (postContent.classList.contains('expanded')) {
                // Recolher
                postContent.classList.remove('expanded');
                btn.textContent = 'Leia mais';
            } else {
                // Expandir
                postContent.classList.add('expanded');
                btn.textContent = 'Leia menos';
            }
        });
    });
}

// ==========================================
// TIMESTAMPS DINÂMICOS
// ==========================================

/**
 * Atualizar timestamps dos posts
 */
function updateTimestamps() {
    const timestamps = document.querySelectorAll('.post-timestamp');
    
    timestamps.forEach(timestamp => {
        const postTime = new Date(timestamp.dataset.time);
        const now = new Date();
        const diffInSeconds = Math.floor((now - postTime) / 1000);
        
        timestamp.textContent = formatTimeDiff(diffInSeconds);
    });
}

/**
 * Formatar diferença de tempo
 */
function formatTimeDiff(seconds) {
    if (seconds < 60) {
        return `${seconds} segundo${seconds !== 1 ? 's' : ''} atrás`;
    }
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`;
    }
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hora${hours !== 1 ? 's' : ''} atrás`;
    }
    
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} dia${days !== 1 ? 's' : ''} atrás`;
    }
    
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
    }
    
    const years = Math.floor(months / 12);
    return `${years} ano${years !== 1 ? 's' : ''} atrás`;
}

// ==========================================
// ANIMAÇÕES E EFEITOS
// ==========================================

/**
 * Adicionar efeito de parallax sutil no scroll
 */
function initParallaxEffect() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('.hero-section');
                
                if (heroSection && scrolled < 300) {
                    heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
                    heroSection.style.opacity = 1 - (scrolled / 300);
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Adicionar classe ao header quando rolar a página
 */
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 4px rgba(0, 0, 0, 0.25)';
        }
    });
}

/**
 * Smooth scroll para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

/**
 * Inicializar todas as funcionalidades ao carregar a página
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar autenticação (CRÍTICO - deve ser primeiro)
    const user = checkAuthentication();
    
    if (user) {
        // 2. Carregar informações do usuário
        loadUserInfo(user);
        
        // 3. Inicializar menus
        initUserMenu();
        initMobileMenu();
        
        // 4. Inicializar filtros
        initFilters();
        
        // 5. Inicializar interações dos posts
        initLikeButtons();
        initCommentButtons();
        initReadMoreButtons();
        
        // 6. Atualizar timestamps
        updateTimestamps();
        setInterval(updateTimestamps, 30000); // Atualizar a cada 30 segundos
        
        // 7. Inicializar efeitos visuais
        initParallaxEffect();
        initHeaderScroll();
        initSmoothScroll();
        
        // 8. Log de sucesso
        console.log('✅ Página de Comunidade carregada com sucesso!');
        console.log('👤 Usuário:', user.username);
        console.log('📍 Localização:', user.location);
    }
});

/**
 * Prevenir FOUC (Flash of Unstyled Content)
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/**
 * Log de inicialização
 */
console.log('🎨 JADUC - Página de Comunidade');
console.log('📊 Sistema de autenticação ativo');
console.log('🔒 Verificando credenciais...');
