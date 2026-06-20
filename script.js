// Smooth scrolling for navigation links
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

// Contact form handling
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbzO4MZXuGThX3MptcaF3azSNZeS7aiymNbDKZsgRCTSN-2A_390vqRGPUCh16ihwrJ_/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            );

            const result = await response.text();

            console.log("Response:", result);

            submitBtn.textContent = "Message Sent! ✓";
            submitBtn.style.background = "#00e5ff";
            submitBtn.style.color = "#000";

            this.reset();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = "";
                submitBtn.style.color = "";
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {

            console.error(error);

            submitBtn.textContent = "Failed! Try Again";

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.exp-card, .edu-card, .blog-card, .skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(4, 11, 38, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(155, 92, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(4, 11, 38, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--color-cyan)';
        } else {
            link.style.color = 'var(--text-muted)';
        }
    });
});

// Add hover effect to code cards
document.querySelectorAll('.code-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxElement = hero.querySelector('.hero-right');
        if (parallaxElement) {
            parallaxElement.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Mobile menu toggle (if hamburger menu is added)
const setupMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    // Add mobile menu toggle if needed
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        navMenu.style.maxHeight = 'none';
    }
};

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();

// Add typing effect to hero text (optional enhancement)
const typewriterEffect = () => {
    const greeting = document.querySelector('.greeting');
    const title = document.querySelector('.hero-title');
    
    if (!greeting || !title) return;
    
    const greetingText = greeting.textContent;
    greeting.textContent = '';
    let greetingIndex = 0;
    
    const typeGreeting = () => {
        if (greetingIndex < greetingText.length) {
            greeting.textContent += greetingText.charAt(greetingIndex);
            greetingIndex++;
            setTimeout(typeGreeting, 50);
        }
    };
    
    // Trigger typewriter on page load (optional)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', typeGreeting);
    }
};

// Uncomment to enable typewriter effect
// typewriterEffect();

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', function() {
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = `© ${currentYear} Abu Said. All rights reserved.`;
    }
});

// Add scroll-to-top button functionality
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--color-pink);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s;
        font-family: var(--font-family);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.boxShadow = '0 0 30px rgba(255, 46, 136, 0.6)';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.boxShadow = 'none';
        button.style.transform = 'scale(1)';
    });
};

createScrollToTop();

// Prevent scrollbar jumpiness on page load
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});


