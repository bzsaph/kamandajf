// ================================================
// J&F Smart Logistics - Enhanced JavaScript
// ================================================

// === CONFIGURATION - UPDATE YOUR DETAILS HERE ===
const CONFIG = {
    whatsappNumber: '+250788351489',  // ← CHANGE THIS (include country code, no + or spaces)
    phone: '+ (250) 788-351489',    // Your display phone number
    email: 'jfsmart.logisticsltd@gmail.com/info@jfsmartlogistics.com',  // Your email
    address: 'Charity House, Ground Floor Opps Ste Famille Church'  // Your address
};

// === Initialize Everything ===
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: 'mobile'
    });
    
    // Initialize other features
    initNavbar();
    initSmoothScroll();
    updateContactInfo();
    initContactForm();
    handleLogoErrors();
    initScrollAnimations();
});

// === Navbar Functionality ===
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scrolled class on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNav();
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// === Update Active Navigation Link Based on Scroll ===
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// === Smooth Scrolling ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === Update Contact Information ===
function updateContactInfo() {
    // Update all phone numbers
    const phoneElements = document.querySelectorAll('#phoneNumber, #footerPhone');
    phoneElements.forEach(el => {
        if (el) el.textContent = CONFIG.phone;
    });
    
    // Update all emails
    const emailElements = document.querySelectorAll('#emailAddress, #footerEmail');
    emailElements.forEach(el => {
        if (el) el.textContent = CONFIG.email;
    });
    
    // Update address
    const addressElement = document.getElementById('companyAddress');
    if (addressElement) {
        addressElement.textContent = CONFIG.address;
    }
    
    // Update WhatsApp button
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        const message = encodeURIComponent('Hello! I would like to know more about your logistics services.');
        whatsappButton.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    }
}

// === Contact Form Handler ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Get service name instead of value
        const serviceSelect = document.getElementById('service');
        const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
        
        // Create WhatsApp message
        const whatsappMessage = `
*New Quote Request - J&F Smart Logistics*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Service Required:* ${serviceName}

*Message:*
${message}
        `.trim();
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showNotification('Success! Redirecting to WhatsApp...', 'success');
        
        // Reset form after a short delay
        setTimeout(() => {
            form.reset();
        }, 1000);
    });
}

// === Show Notification ===
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-5 shadow-lg`;
    notification.style.cssText = `
        z-index: 9999;
        min-width: 300px;
        animation: slideDown 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -100%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -100%);
        }
    }
`;
document.head.appendChild(style);

// === Handle Logo Errors ===
function handleLogoErrors() {
    const logos = document.querySelectorAll('#companyLogo, #footerLogo');
    
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            // Hide logo if it fails to load
            this.style.display = 'none';
        });
        
        // Check if logo src exists
        if (logo.src) {
            const img = new Image();
            img.src = logo.src;
            img.onerror = function() {
                logo.style.display = 'none';
            };
        }
    });
}

// === Scroll Animations for Elements ===
function initScrollAnimations() {
    // Add fade-in animation to elements as they come into view
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
    
    // Observe all animated elements that don't use AOS
    const animatedElements = document.querySelectorAll('.stat-box, .contact-item');
    animatedElements.forEach(el => observer.observe(el));
}

// === Parallax Effect for Hero Section ===
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroGradient && scrolled < window.innerHeight) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// === Number Counter Animation ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// === Lazy Load Images ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === Page Load Performance ===
window.addEventListener('load', () => {
    // Refresh AOS after all content is loaded
    AOS.refresh();
    
    // Log success message
    console.log('%c✓ J&F Smart Logistics Website Loaded Successfully', 
                'color: #0066FF; font-size: 14px; font-weight: bold;');
    console.log('%cTo customize: Edit CONFIG object in script.js', 
                'color: #666; font-size: 12px;');
});

// === Debounce Function for Performance ===
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

// === Optimize Scroll Performance ===
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

// === Form Validation Enhancement ===
const formInputs = document.querySelectorAll('.form-control, .form-select');
formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('is-invalid');
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
            input.classList.remove('is-invalid');
            if (input.checkValidity()) {
                input.classList.add('is-valid');
            }
        }
    });
});

// === Service Card Interactive Effects ===
const serviceCards = document.querySelectorAll('.service-card:not(.featured)');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        serviceCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        serviceCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// === Prevent Default on Empty Links ===
document.querySelectorAll('a[href="#"], a[href="#!"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// === Console Easter Egg ===
console.log(`
%c╔═══════════════════════════════════╗
║  J&F SMART LOGISTICS LTD         ║
║  Moving Your Business Forward    ║
╚═══════════════════════════════════╝

%cWebsite powered by Bootstrap 5.3
Developed with ❤️ for logistics excellence

%cCustomization Guide:
1. Update CONFIG object in script.js
2. Replace logo.png with your logo
3. Edit content in index.html

%cNeed help? Check README.md for details.
`,
'color: #0066FF; font-weight: bold; font-size: 12px;',
'color: #666; font-size: 11px;',
'color: #FF6B35; font-size: 11px; font-weight: bold;',
'color: #999; font-size: 10px;'
);
