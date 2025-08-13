// Main JavaScript for GitHub Profile

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initGoalTracking();
    initSmoothScrolling();
    initTypewriterEffect();
    initScrollAnimations();
    initProfileViews();
});

// Goal tracking functionality
function initGoalTracking() {
    const goalItems = document.querySelectorAll('.goal-item input[type="checkbox"]');
    
    goalItems.forEach(checkbox => {
        // Load saved state from localStorage
        const goalId = checkbox.closest('.goal-item').textContent.trim();
        const isCompleted = localStorage.getItem(`goal_${goalId}`);
        
        if (isCompleted === 'true') {
            checkbox.checked = true;
            checkbox.closest('.goal-item').classList.add('completed');
        }
        
        // Add event listener for changes
        checkbox.addEventListener('change', function() {
            const goalItem = this.closest('.goal-item');
            const goalId = goalItem.textContent.trim();
            
            if (this.checked) {
                goalItem.classList.add('completed');
                localStorage.setItem(`goal_${goalId}`, 'true');
                showNotification('Goal completed! 🎉');
            } else {
                goalItem.classList.remove('completed');
                localStorage.setItem(`goal_${goalId}`, 'false');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typewriter effect for the main heading
function initTypewriterEffect() {
    const heading = document.querySelector('.profile-header h1');
    if (!heading) return;
    
    const text = heading.textContent;
    heading.textContent = '';
    heading.style.borderRight = '2px solid white';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heading.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    typeWriter();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .stat-card, .experience-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Profile views counter animation
function initProfileViews() {
    const viewsElement = document.querySelector('.profile-views');
    if (!viewsElement) return;
    
    // Simulate profile views (you can replace this with actual analytics)
    let views = parseInt(localStorage.getItem('profile_views') || '0');
    views += Math.floor(Math.random() * 5) + 1; // Random increment
    localStorage.setItem('profile_views', views.toString());
    
    // Animate the number
    animateNumber(viewsElement, 0, views, 2000);
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #24292e;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 1000;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark);
    });
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
}

// Initialize dark mode if needed
// initDarkMode(); // Uncomment to enable dark mode

// Add some utility functions
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent elements
    console.log('Window resized');
}, 250)); 