// Hamburger menu - Mobile navigation toggle
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Hamburger clicked'); // Debug
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  
  // Close menu when any link is clicked
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      console.log('Link clicked'); // Debug
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && hamburger.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}

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
