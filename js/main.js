// Shree Kunal Acharya — Vāstu Śāstra
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  // Measure the header so the mobile overlay can never sit under it
  const setHeaderHeight = () => {
    if (!header) return;
    document.documentElement.style.setProperty(
      '--header-h', Math.round(header.getBoundingClientRect().height) + 'px'
    );
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  window.addEventListener('load', setHeaderHeight);

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      setHeaderHeight();
      const open = nav.classList.toggle('is-open');
      body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) navToggle.click();
    });
  }

  // Contact form — posts for real, and only reports success on a real response
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    const WA = 'https://wa.me/917777008369';
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const key = form.querySelector('[name="access_key"]');
      const btn = form.querySelector('button[type="submit"]');
      const fail = msg => {
        status.className = 'form__status form__status--err';
        status.innerHTML = msg + ' You can reach Guruji directly on <a href="' + WA +
          '" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">WhatsApp</a>.';
      };
      if (!key || !key.value || key.value.indexOf('REPLACE_WITH') === 0) {
        fail('This form is not connected yet.');
        return;
      }
      btn.disabled = true;
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          status.className = 'form__status form__status--ok';
          status.textContent = 'Received. Guruji will reply to you himself.';
          form.reset();
        } else {
          fail('The message could not be sent.');
        }
      } catch (err) {
        fail('The message could not be sent.');
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }
});
