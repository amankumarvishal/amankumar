// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Floating Navigation
const scrollTopButton = document.getElementById('scroll-top');
const aiAssistant = document.getElementById('ai-assistant');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Show/hide scroll to top button
    if (currentScroll > 500) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
    
    // Navbar animation
    const navbar = document.querySelector('.navbar');
    if (currentScroll > lastScroll && !navbar.classList.contains('nav-hidden')) {
        navbar.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('nav-hidden')) {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typewriter Effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 50;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.typewriter');
    const words = ['Full-Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Innovator'];
    new TypeWriter(txtElement, words);
});

// Skill Visualization
const skillGraph = document.getElementById('skill-visualization');
const skills = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 85 },
    { name: 'AI/ML', level: 75 },
    { name: 'DevOps', level: 70 },
    { name: 'Mobile', level: 65 }
];

skills.forEach(skill => {
    const skillBar = document.createElement('div');
    skillBar.className = 'skill-bar';
    skillBar.innerHTML = `
        <div class="skill-info">
            <span>${skill.name}</span>
            <span>${skill.level}%</span>
        </div>
        <div class="skill-progress">
            <div class="skill-fill" style="width: 0%"></div>
        </div>
    `;
    skillGraph.appendChild(skillBar);
});

// Animate skill bars when in view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach((fill, index) => {
                gsap.to(fill, {
                    width: `${skills[index].level}%`,
                    duration: 1.5,
                    ease: "power2.out"
                });
            });
            skillObserver.unobserve(entry.target);
        }
    });
});

skillObserver.observe(skillGraph);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        contactForm.reset();
    }, 2000);
});
