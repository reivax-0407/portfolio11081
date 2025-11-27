// ========================================
// THEME TOGGLE
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.className = savedTheme;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
});

// ========================================
// MATRIX RAIN ANIMATION
// ========================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    const isDark = body.classList.contains('dark-mode');
    ctx.fillStyle = isDark ? 'rgba(10, 10, 12, 0.05)' : 'rgba(247, 249, 252, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = isDark ? '#4DA3FF' : '#1F73FF';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ========================================
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ABOUT SECTION SLIDESHOW
// ========================================
const slides = document.querySelectorAll('.slideshow-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slideshow every 4 seconds
setInterval(nextSlide, 4000);

// ========================================
// GALLERY SLIDER
// ========================================
const galleryTrack = document.querySelector('.gallery-slider-track');
const galleryItems = document.querySelectorAll('.gallery-slider-item');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');

let currentGalleryIndex = 0;

function updateGallery() {
    const offset = -currentGalleryIndex * 100;
    galleryTrack.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery();
});

nextBtn.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateGallery();
});

// ========================================
// INTEREST CARDS POPUP
// ========================================
const interestCards = document.querySelectorAll('.interest-card');
const popups = {
    motorcycles: document.getElementById('popup-motorcycles'),
    music: document.getElementById('popup-music'),
    gamedev: document.getElementById('popup-gamedev')
};

interestCards.forEach(card => {
    card.addEventListener('click', () => {
        const interest = card.getAttribute('data-interest');
        if (popups[interest]) {
            popups[interest].classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close popup functionality
document.querySelectorAll('.popup-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = btn.closest('.popup-overlay');
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close popup when clicking outside
document.querySelectorAll('.popup-overlay').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close popup with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup-overlay.active').forEach(popup => {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been received.\n\nWe'll get back to you at ${email} soon.`);
    
    // Reset form
    contactForm.reset();
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ========================================
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

// Observe sections for fade-in effect
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========================================
// SKILL TAGS HOVER EFFECT
// ========================================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))';
        tag.style.color = 'white';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.background = body.classList.contains('dark-mode') 
            ? 'rgba(19, 20, 26, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        tag.style.color = 'var(--text-primary)';
    });
});

// ========================================
// CERTIFICATE CARD ANIMATIONS
// ========================================
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// ========================================
// INITIALIZE ON LOAD
// ========================================
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelector('.hero-content').style.opacity = '1';
    
    // Log to console
    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #4DA3FF; font-size: 20px; font-weight: bold;');
    console.log('%cDeveloped by Xavier Fernandes', 'color: #5CFFCE; font-size: 14px;');
});
// =========================
// Formspree Contact Form
// =========================

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const formStatus = document.getElementById("formStatus");
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            formStatus.textContent = "✔ Message sent successfully!";
            formStatus.style.color = "var(--accent-secondary)";
            form.reset();
        } else {
            formStatus.textContent = "❌ Failed to send message. Try again.";
            formStatus.style.color = "red";
        }

    } catch (error) {
        formStatus.textContent = "⚠ Error. Check your connection.";
        formStatus.style.color = "red";
    }
});
