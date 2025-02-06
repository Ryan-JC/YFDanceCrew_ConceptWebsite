document.addEventListener('DOMContentLoaded', function () {
    console.log('School Dance Club website loaded successfully!');
  
    // Example: Scroll smoothly to sections when clicking nav links
    const navLinks = document.querySelectorAll('nav ul li a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      });
    });
});