document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTabs();
  initCarousel();
  initScrollTop();
  initContactForm();
});

function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const header = document.querySelector('.header');
  if (!menuToggle || !navMobile) return;

  function closeMenu() {
    navMobile.classList.remove('open');
    header?.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navMobile.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function openMenu() {
    navMobile.classList.add('open');
    header?.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    navMobile.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMobile.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', (e) => {
    if (navMobile.classList.contains('open') && !navMobile.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  navMobile.querySelectorAll('a.nav-link, .sub-menu a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  navMobile.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const li = btn.closest('.has-submenu');
      const expanded = li?.classList.toggle('submenu-open');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });
}

function initTabs() {
  document.querySelectorAll('.tabs-wrapper').forEach(wrapper => {
    const tabBtns = wrapper.querySelectorAll('.tab-btn');
    const tabPanels = wrapper.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        wrapper.querySelector(`#tab-${tab}`)?.classList.add('active');
      });
    });
  });
}

function initCarousel() {
  document.querySelectorAll('.testimonials-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval;

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
    });

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    resetAutoplay();
  });
}

function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const purpose = form.querySelector('[name="purpose"]')?.value.trim();
    const msg = form.querySelector('.form-message');

    if (!name || !email || !purpose) {
      if (msg) { msg.textContent = 'Please fill in all required fields.'; msg.className = 'form-message error'; }
      return;
    }

    if (msg) { msg.textContent = 'Thank you! Redirecting to book a session on Topmate...'; msg.className = 'form-message success'; }
    setTimeout(() => {
      window.open('https://topmate.io/souvenger', '_blank');
    }, 1500);
    form.reset();
  });
}
