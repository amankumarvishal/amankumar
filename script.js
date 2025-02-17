// Navigation Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Scroll Animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

darkModeToggle.addEventListener('click', () => {
    htmlElement.setAttribute('data-theme', 
        htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    // Save preference
    localStorage.setItem('theme', htmlElement.getAttribute('data-theme'));
    
    // Update icon
    darkModeToggle.innerHTML = htmlElement.getAttribute('data-theme') === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    darkModeToggle.innerHTML = savedTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Enhanced Form Validation
const contactFormEnhanced = document.getElementById('contact-form');
const submitBtn = contactFormEnhanced.querySelector('.submit-btn');

contactFormEnhanced.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
    
    // Validate fields
    let isValid = true;
    const fields = {
        name: { value: document.getElementById('name').value, pattern: /^[a-zA-Z\s]{2,30}$/ },
        email: { value: document.getElementById('email').value, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        subject: { value: document.getElementById('subject').value, minLength: 5 },
        message: { value: document.getElementById('message').value, minLength: 10 }
    };
    
    for (const [field, data] of Object.entries(fields)) {
        const element = document.getElementById(field);
        const errorElement = element.nextElementSibling.nextElementSibling;
        
        if (data.pattern && !data.pattern.test(data.value)) {
            errorElement.textContent = `Please enter a valid ${field}`;
            isValid = false;
        } else if (data.minLength && data.value.length < data.minLength) {
            errorElement.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${data.minLength} characters`;
            isValid = false;
        }
    }
    
    if (isValid) {
        // Show loading state
        submitBtn.classList.add('loading');
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success message
            alert('Thank you for your message! I will get back to you soon.');
            contactFormEnhanced.reset();
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});
