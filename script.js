// Simple JS for navigation and interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Example: Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Example: Show alert on contact button click
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Thank you for reaching out!');
        });
    }
});
