// ==========================================
// TRANSPARENCY PAGE INTERACTIVE FEATURES
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeChartInteractions();
    initializeScrollAnimations();
    initializeProgressBars();
    initializeNavigationEffects();
});

// ==========================================
// CHART INTERACTIONS
// ==========================================
function initializeChartInteractions() {
    const chartSegments = document.querySelectorAll('.chart-segment');
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Add hover effects to chart segments
    chartSegments.forEach((segment, index) => {
        segment.addEventListener('mouseenter', function() {
            const category = this.getAttribute('data-category');
            highlightCategory(category);
        });
        
        segment.addEventListener('mouseleave', function() {
            resetCategoryHighlight();
        });
        
        segment.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategoryDetails(category);
        });
    });
    
    // Add hover effects to legend items
    legendItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            const segment = chartSegments[index];
            if (segment) {
                segment.style.opacity = '0.8';
                segment.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const segment = chartSegments[index];
            if (segment) {
                segment.style.opacity = '1';
                segment.style.transform = 'scale(1)';
            }
        });
    });
}

function highlightCategory(category) {
    const allSegments = document.querySelectorAll('.chart-segment');
    allSegments.forEach(segment => {
        if (segment.getAttribute('data-category') !== category) {
            segment.style.opacity = '0.3';
        } else {
            segment.style.opacity = '1';
            segment.style.transform = 'scale(1.05)';
        }
    });
}

function resetCategoryHighlight() {
    const allSegments = document.querySelectorAll('.chart-segment');
    allSegments.forEach(segment => {
        segment.style.opacity = '1';
        segment.style.transform = 'scale(1)';
    });
}

function showCategoryDetails(category) {
    // This could be expanded to show detailed information about each category
    const categoryNames = {
        'saude': 'Saúde (35%)',
        'educacao': 'Educação (25%)',
        'infraestrutura': 'Infraestrutura (20%)',
        'seguranca': 'Segurança (10%)',
        'outros': 'Outros (10%)'
    };
    
    const categoryName = categoryNames[category] || category;
    console.log(`Detalhes da categoria: ${categoryName}`);
    
    // Add visual feedback
    const segment = document.querySelector(`[data-category="${category}"]`);
    if (segment) {
        segment.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            segment.style.filter = 'brightness(1)';
        }, 300);
    }
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.budget-card, .distribution-section, .projects-section, .project-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS classes for animations
    addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .budget-card,
        .distribution-section,
        .projects-section,
        .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .budget-card.animate-in,
        .distribution-section.animate-in,
        .projects-section.animate-in,
        .project-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .budget-card:nth-child(1) { transition-delay: 0.1s; }
        .budget-card:nth-child(2) { transition-delay: 0.2s; }
        .budget-card:nth-child(3) { transition-delay: 0.3s; }
        
        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// ==========================================
// PROGRESS BAR ANIMATIONS
// ==========================================
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset width and animate
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 1.5s ease-out';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ==========================================
// NAVIGATION EFFECTS
// ==========================================
function initializeNavigationEffects() {
    // Smooth scroll to sections
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const navText = this.querySelector('.nav-text').textContent.toLowerCase();
            
            if (navText === 'transparência') {
                e.preventDefault();
                document.querySelector('.budget-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease';
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format currency values
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = startValue + (endValue - startValue) * easeOutCubic(progress);
        element.textContent = Math.floor(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// ==========================================
// RESPONSIVE MENU TOGGLE
// ==========================================
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
    }
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
function initializeAccessibility() {
    // Add keyboard navigation for chart segments
    const chartSegments = document.querySelectorAll('.chart-segment');
    
    chartSegments.forEach((segment, index) => {
        segment.setAttribute('tabindex', '0');
        segment.setAttribute('role', 'button');
        segment.setAttribute('aria-label', `Segmento do gráfico ${index + 1}`);
        
        segment.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                showCategoryDetails(category);
            }
        });
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .chart-segment:focus {
            outline: 3px solid var(--primary-dark);
            outline-offset: 2px;
        }
        
        .nav-item:focus-within {
            outline: 2px solid var(--primary-dark);
            outline-offset: 2px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    initializeMobileMenu();
});

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener('error', function(e) {
    console.error('Transparency page error:', e.error);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);