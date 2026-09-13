// ==========================================
// COMMUNITY PAGE FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeFilterButtons();
    initializePostActions();
    initializeReadMoreButtons();
    initializeNavigation();
});

// ==========================================
// FILTER FUNCTIONALITY
// ==========================================
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.post-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter posts
            filterPosts(posts, filterValue);
        });
    });
}

function filterPosts(posts, filterValue) {
    posts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        
        if (filterValue === 'all') {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.3s ease-in-out';
        } else if (filterValue === 'volunteer' && postCategory === 'volunteer') {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.3s ease-in-out';
        } else if (filterValue === 'debates' && postCategory === 'debates') {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.3s ease-in-out';
        } else if (filterValue === 'neighborhood') {
            // For now, show all posts as "neighborhood" posts
            // This can be enhanced with actual neighborhood data
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            post.style.display = 'none';
        }
    });
}

// ==========================================
// POST ACTIONS (LIKE, DISLIKE, COMMENT)
// ==========================================
function initializePostActions() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const dislikeButtons = document.querySelectorAll('.dislike-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');

    // Like button functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleLikeAction(this);
        });
    });

    // Dislike button functionality
    dislikeButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleDislikeAction(this);
        });
    });

    // Comment button functionality
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleCommentAction(this);
        });
    });
}

function handleLikeAction(button) {
    const countElement = button.querySelector('.action-count');
    const currentCount = parseInt(countElement.textContent);
    const postCard = button.closest('.post-card');
    const dislikeButton = postCard.querySelector('.dislike-btn');
    const dislikeCount = dislikeButton.querySelector('.action-count');
    
    if (button.classList.contains('active')) {
        // Unlike
        button.classList.remove('active');
        countElement.textContent = Math.max(0, currentCount - 1);
        button.style.animation = 'pulse 0.3s ease-in-out';
    } else {
        // Like
        button.classList.add('active');
        countElement.textContent = currentCount + 1;
        button.style.animation = 'pulse 0.3s ease-in-out';
        
        // Remove dislike if active
        if (dislikeButton.classList.contains('active')) {
            dislikeButton.classList.remove('active');
            const dislikeCurrentCount = parseInt(dislikeCount.textContent);
            dislikeCount.textContent = Math.max(0, dislikeCurrentCount - 1);
        }
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

function handleDislikeAction(button) {
    const countElement = button.querySelector('.action-count');
    const currentCount = parseInt(countElement.textContent);
    const postCard = button.closest('.post-card');
    const likeButton = postCard.querySelector('.like-btn');
    const likeCount = likeButton.querySelector('.action-count');
    
    if (button.classList.contains('active')) {
        // Remove dislike
        button.classList.remove('active');
        countElement.textContent = Math.max(0, currentCount - 1);
        button.style.animation = 'pulse 0.3s ease-in-out';
    } else {
        // Dislike
        button.classList.add('active');
        countElement.textContent = currentCount + 1;
        button.style.animation = 'pulse 0.3s ease-in-out';
        
        // Remove like if active
        if (likeButton.classList.contains('active')) {
            likeButton.classList.remove('active');
            const likeCurrentCount = parseInt(likeCount.textContent);
            likeCount.textContent = Math.max(0, likeCurrentCount - 1);
        }
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

function handleCommentAction(button) {
    const countElement = button.querySelector('.action-count');
    const currentCount = parseInt(countElement.textContent);
    
    // For now, just increment comment count
    // In a real application, this would open a comment modal or section
    countElement.textContent = currentCount + 1;
    button.style.animation = 'pulse 0.3s ease-in-out';
    
    // Show a simple feedback
    showNotification('Comentário adicionado!');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

// ==========================================
// READ MORE/LESS FUNCTIONALITY
// ==========================================
function initializeReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postText = this.closest('.post-text');
            const paragraph = postText.querySelector('p');
            
            if (this.textContent === 'Ler menos') {
                // Collapse text
                paragraph.style.maxHeight = '200px';
                paragraph.style.overflow = 'hidden';
                this.textContent = 'Ler mais';
            } else {
                // Expand text
                paragraph.style.maxHeight = 'none';
                paragraph.style.overflow = 'visible';
                this.textContent = 'Ler menos';
            }
            
            // Add smooth transition
            paragraph.style.transition = 'max-height 0.3s ease-in-out';
        });
    });
}

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navText = this.querySelector('.nav-text').textContent;
            
            // Handle navigation based on the clicked item
            switch(navText) {
                case 'Comunidade':
                    // Already on community page
                    break;
                case 'Transparencia':
                    // Navigate to transparency page
                    window.location.href = '../Página de Transparência/index.html';
                    break;
                case 'Noticias':
                    // Navigate to news page (if exists)
                    showNotification('Página de Notícias em desenvolvimento');
                    break;
                default:
                    break;
            }
        });
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 140px;
        right: 20px;
        background-color: var(--primary-dark);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: var(--font-body);
        font-size: 16px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initializeScrollEffects() {
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
}

// Initialize scroll effects
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollEffects();
});

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================
document.addEventListener('keydown', function(e) {
    // Handle Enter key for buttons
    if (e.key === 'Enter' && e.target.classList.contains('filter-btn')) {
        e.target.click();
    }
    
    if (e.key === 'Enter' && e.target.classList.contains('action-btn')) {
        e.target.click();
    }
    
    // Handle Escape key to close any open modals or notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// ==========================================
// ANIMATIONS CSS (Added via JavaScript)
// ==========================================
const animationStyles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .post-card {
        animation: fadeIn 0.5s ease-in-out;
    }
`;

// Add animation styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);