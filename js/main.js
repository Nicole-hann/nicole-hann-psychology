// Mobile menu toggle
window.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  
  if (hamburger && mobileMenu) {
    // Toggle menu
    hamburger.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      return false;
    };
    
    // Close menu when link clicked
    var links = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].onclick = function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      };
    }
  }
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Form submit
const form = document.getElementById('booking-form');
const success = document.getElementById('form-success');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Form error:', error);
      alert('Error sending message. Please try again.');
    }
  });
}
