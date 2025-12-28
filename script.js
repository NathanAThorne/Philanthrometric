// Theme toggle
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

setTheme(savedTheme);

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Form handling
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Basic validation
    ['name', 'email', 'message'].forEach(field => {
        const input = document.getElementById(field);
        const errorEl = document.getElementById(`${field}-error`);
        if (!input.value.trim()) {
            errorEl.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            valid = false;
        } else {
            errorEl.textContent = '';
        }
    });

    // Simple email check
    const email = document.getElementById('email');
    if (email.value && !email.value.includes('@')) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        valid = false;
    }

    if (valid) {
        // Here you could send to backend (fetch, EmailJS, Formspree, etc.)
        console.log('Form data:', {
            name: document.getElementById('name').value,
            email: email.value,
            message: document.getElementById('message').value
        });

        successMsg.classList.remove('hidden');
        form.reset();
        setTimeout(() => successMsg.classList.add('hidden'), 5000);
    }
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});