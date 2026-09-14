/**
 * JADUC - Página de Transparência
 * Script de Interatividade e Animações
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initDonutChart();
    initProgressBars();
    initChartInteractions();
    initScrollAnimations();
});

/**
 * Menu Mobile Hambúrguer
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
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

/**
 * Animação do Gráfico de Rosca (Donut Chart)
 */
function initDonutChart() {
    const chartSegments = document.querySelectorAll('.chart-segment');
    const circumference = 2 * Math.PI * 80; // raio = 80
    
    // Configurar segmentos inicialmente
    chartSegments.forEach(segment => {
        segment.style.strokeDasharray = `0 ${circumference}`;
    });

    // Observar quando o gráfico entra no viewport
    const chartContainer = document.querySelector('.donut-chart-container');
    
    if (chartContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateDonutChart(chartSegments, circumference);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(chartContainer);
    }
}

/**
 * Animar os segmentos do gráfico de rosca
 */
function animateDonutChart(segments, circumference) {
    let currentRotation = 0;
    const percentages = [35, 25, 20, 10, 10]; // Saúde, Educação, Infraestrutura, Segurança, Outros
    
    segments.forEach((segment, index) => {
        const percentage = percentages[index];
        const segmentLength = (percentage / 100) * circumference;
        const gap = circumference - segmentLength;
        
        // Calcular rotação para posicionar corretamente
        const rotation = -90 + currentRotation;
        segment.style.transform = `rotate(${rotation}deg)`;
        segment.style.transformOrigin = '100px 100px';
        
        // Animar com delay
        setTimeout(() => {
            segment.style.transition = 'stroke-dasharray 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
            segment.style.strokeDasharray = `${segmentLength} ${gap}`;
        }, index * 200);
        
        // Atualizar rotação para o próximo segmento
        currentRotation += (percentage / 100) * 360;
    });
}

/**
 * Animação das Barras de Progresso dos Projetos
 */
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    if (progressFills.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const progress = fill.dataset.progress;
                    
                    // Animar após um pequeno delay
                    setTimeout(() => {
                        fill.style.width = `${progress}%`;
                    }, 100);
                    
                    observer.unobserve(fill);
                }
            });
        }, { threshold: 0.5 });

        progressFills.forEach(fill => observer.observe(fill));
    }
}

/**
 * Interações do Gráfico (Hover e Click)
 */
function initChartInteractions() {
    const legendItems = document.querySelectorAll('.legend-item');
    const chartSegments = document.querySelectorAll('.chart-segment');
    
    // Mapear categorias para segmentos
    const categoryMap = {
        'health': 0,
        'education': 1,
        'infrastructure': 2,
        'security': 3,
        'others': 4
    };

    legendItems.forEach(item => {
        const category = item.dataset.category;
        const segmentIndex = categoryMap[category];
        const segment = chartSegments[segmentIndex];

        if (segment) {
            // Hover na legenda destaca o segmento
            item.addEventListener('mouseenter', () => {
                highlightSegment(segment, chartSegments);
            });

            item.addEventListener('mouseleave', () => {
                resetSegments(chartSegments);
            });

            // Click na legenda
            item.addEventListener('click', () => {
                showCategoryDetails(category);
            });
        }
    });

    // Hover direto nos segmentos
    chartSegments.forEach((segment, index) => {
        segment.addEventListener('mouseenter', () => {
            highlightSegment(segment, chartSegments);
            highlightLegendItem(index, legendItems);
        });

        segment.addEventListener('mouseleave', () => {
            resetSegments(chartSegments);
            resetLegendItems(legendItems);
        });
    });
}

/**
 * Destacar segmento do gráfico
 */
function highlightSegment(activeSegment, allSegments) {
    allSegments.forEach(segment => {
        if (segment !== activeSegment) {
            segment.style.opacity = '0.3';
        } else {
            segment.style.opacity = '1';
            segment.style.filter = 'brightness(1.2) drop-shadow(0 0 10px currentColor)';
        }
    });
}

/**
 * Resetar todos os segmentos
 */
function resetSegments(segments) {
    segments.forEach(segment => {
        segment.style.opacity = '1';
        segment.style.filter = 'none';
    });
}

/**
 * Destacar item da legenda
 */
function highlightLegendItem(index, legendItems) {
    if (legendItems[index]) {
        legendItems[index].style.backgroundColor = 'rgba(74, 140, 176, 0.15)';
        legendItems[index].style.transform = 'translateY(-2px) scale(1.05)';
    }
}

/**
 * Resetar itens da legenda
 */
function resetLegendItems(legendItems) {
    legendItems.forEach(item => {
        item.style.backgroundColor = 'transparent';
        item.style.transform = 'none';
    });
}

/**
 * Mostrar detalhes da categoria (pode ser expandido)
 */
function showCategoryDetails(category) {
    const categoryNames = {
        'health': 'Saúde',
        'education': 'Educação',
        'infrastructure': 'Infraestrutura',
        'security': 'Segurança',
        'others': 'Outros'
    };

    // Scroll suave até a seção de detalhes
    const budgetDetails = document.querySelector('.budget-details');
    if (budgetDetails) {
        const categoryElement = Array.from(budgetDetails.children).find(item => {
            return item.textContent.includes(categoryNames[category]);
        });

        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Efeito de destaque temporário
            categoryElement.style.backgroundColor = 'rgba(74, 140, 176, 0.1)';
            categoryElement.style.transform = 'scale(1.02)';
            categoryElement.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                categoryElement.style.backgroundColor = 'transparent';
                categoryElement.style.transform = 'scale(1)';
            }, 2000);
        }
    }
}

/**
 * Animações ao Scroll (Intersection Observer)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .project-card, .budget-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Contador Animado para Números (opcional - pode ser ativado)
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/**
 * Smooth Scroll para Links Internos
 */
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

/**
 * Adicionar efeito de parallax sutil no scroll (opcional)
 */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection && scrolled < 500) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroSection.style.opacity = 1 - (scrolled / 500);
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

/**
 * Adicionar classe ao header quando rolar a página
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 4px rgba(0, 0, 0, 0.25)';
    }
});

/**
 * Prevenir FOUC (Flash of Unstyled Content)
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/**
 * Log de inicialização (pode ser removido em produção)
 */
console.log('🎨 JADUC - Página de Transparência carregada com sucesso!');
console.log('📊 Gráfico de rosca e animações inicializados.');
