// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission handling
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simulate form submission (replace with actual backend logic)
  console.log('Form Submitted!');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Show a success message
  alert('Thank you for reaching out! I will get back to you soon.');

  // Reset the form
  form.reset();
});

// Add animations on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fadeIn');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  observer.observe(section);
});
