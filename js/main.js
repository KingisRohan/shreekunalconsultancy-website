// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  let navScrollLockY = 0;

  // Mobile nav toggle -------------------------------------------------------
  try {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    const openNav = () => {
      navScrollLockY = window.scrollY || window.pageYOffset || 0;
      body.style.top = `-${navScrollLockY}px`;
      body.classList.add('nav-open');
    };
    const closeNav = () => {
      body.classList.remove('nav-open');
      body.style.top = '';
      // Scroll instantly (not smoothly) so the restore lands exactly on
      // target rather than animating from the top of the page.
      window.scrollTo({ top: navScrollLockY, left: 0, behavior: 'instant' });
    };

    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        if (isOpen) {
          openNav();
        } else {
          closeNav();
        }
      });
    }

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          closeNav();
        }
      });
    });
  } catch (err) {
    console.error('Mobile nav setup failed:', err);
  }

  // FAQ accordion -------------------------------------------------------------
  try {
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
  } catch (err) {
    console.error('FAQ accordion setup failed:', err);
  }

  // Contact form: send via email (no server backend on this site) -----------
  try {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const status = document.getElementById('formStatus');
        const name = (document.getElementById('name') || {}).value || '';
        const phone = (document.getElementById('phone') || {}).value || '';
        const message = (document.getElementById('message') || {}).value || '';

        const subject = `Vastu consultation enquiry from ${name || 'website visitor'}`;
        const body = `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`;
        const mailtoUrl = `mailto:hello@shreekunalconsultancy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;

        if (status) {
          status.textContent = 'Opening your email app to send this to Kunal. If nothing opens, please email hello@shreekunalconsultancy.com or WhatsApp directly.';
          status.className = 'form__status form__status--ok';
        }
        form.reset();
        setTimeout(() => {
          if (status) {
            status.className = 'form__status';
            status.textContent = '';
          }
        }, 9000);
      });
    }
  } catch (err) {
    console.error('Contact form setup failed:', err);
  }

  // Reveal on scroll ---------------------------------------------------------
  try {
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));
      } else {
        // No IntersectionObserver support: show content immediately instead
        // of leaving it permanently hidden.
        revealEls.forEach(el => el.classList.add('is-in'));
      }
    }
  } catch (err) {
    console.error('Reveal-on-scroll setup failed:', err);
  }
});
