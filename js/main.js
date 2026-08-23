// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      body.classList.toggle('nav-open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        body.classList.remove('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // FAQ accordion
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true' || false;
      button.setAttribute('aria-expanded', !expanded);
      const answer = button.nextElementSibling;
      if (answer) {
        if (expanded) {
          answer.setAttribute('hidden', '');
        } else {
          answer.removeAttribute('hidden');
        }
      }
    });
  });

  // Contact form: prevent actual submission, show status message
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      if (status) {
        status.textContent = 'Thank you. Your message has been received. Kunal will reply within 24 hours.';
        status.className = 'form__status form__status--ok';
      }
      form.reset();
      setTimeout(() => {
        if (status) {
          status.className = 'form__status';
          status.textContent = '';
        }
      }, 7000);
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }
});
