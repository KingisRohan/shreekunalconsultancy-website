// Script for Kunal Dhurve Vastu Consultant site
// - Mobile navigation toggle
// - FAQ accordion
// - Smooth scroll for anchor links (already handled by CSS scroll-behavior, but we add for older browsers)
// - Contact form handling (placeholder, then mailto fallback)
// - Reveal on scroll (simple intersection observer)

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      body.classList.toggle('nav-open');
      // Toggle aria-expanded
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Close mobile nav when clicking a link (optional)
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
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
        answer.toggleAttribute('hidden');
      }
    });
  });

  // Reveal on scroll (for .reveal elements)
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          // Unobserve if we only want to animate once
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    revealElements.forEach(el => observer.observe(el));
  }

  // Form handling (placeholder)
  const contactForm = document.querySelector('.form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // In a real scenario, you'd send to an endpoint.
      // For now, we show a success status and reset.
      const statusEl = contactForm.querySelector('.form__status');
      if (statusEl) {
        statusEl.textContent = 'Thank you! Your message has been sent.';
        statusEl.classList.add('form__status--ok');
        statusEl.style.display = 'block';
      }
      // Optionally reset form
      contactForm.reset();
      // After a delay, hide the status (optional)
      setTimeout(() => {
        if (statusEl) {
          statusEl.style.display = 'none';
          statusEl.classList.remove('form__status--ok');
        }
      }, 5000);
    });
  }

  // Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});