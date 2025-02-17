// Function to add animations (if needed, you might already have this in your HTML)
function addAnimation(element, animationName) {
    element.style.animation = `${animationName} 1s ease-in-out`;
}


document.addEventListener('DOMContentLoaded', function() {
    // Header Animations (if not already handled by your HTML)
    const headerTitle = document.querySelector('header h1');
    const headerTagline = document.querySelector('header .tagline');

    if (headerTitle) {
        addAnimation(headerTitle, 'fadeInDown');
    }
    if (headerTagline) {
        addAnimation(headerTagline, 'fadeInUp');
    }

    // Project Card Hover Effect
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
             card.style.transform = 'translateY(-10px)'; // Apply transform on hover
            card.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';

        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)'; // Reset transform
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Reset box shadow
        });
    });

    // Skill Hover Effect
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-10px)';
        });

        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0)';
        });
    });



    // Contact Form Handling (Example - You'll need to adapt this)
    const contactForm = document.querySelector('#contact-form'); // Give your form an ID

    if (contactForm) { // Check if the form exists on the page
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values (you'll need to give your inputs IDs)
            const name = document.getElementById('name').value; // Example: <input type="text" id="name">
            const email = document.getElementById('email').value; // Example: <input type="email" id="email">
            const message = document.getElementById('message').value; // Example: <textarea id="message"></textarea>

            // Here you would typically send the form data to a server
            // using AJAX or fetch.  This is a simplified example:
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Message:", message);

            // You can add code here to display a success message or handle errors.
            alert("Message sent! (This is a demo)"); // Replace with a nicer message

            contactForm.reset(); // Clear the form
        });
    }

});
