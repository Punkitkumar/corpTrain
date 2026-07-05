(function () {
  const TOPMATE_URL = 'https://topmate.io/souvenger';
  const COGNITION_URL = 'https://www.cognitioncatalysts.com/';

  const NAV_ITEMS = [
    { label: 'About', href: 'about.html' },
    { label: 'Cognition Catalysts', href: 'cognition-catalysts.html' },
    { label: 'AI Consulting', href: 'ai-consulting.html' },
    { label: 'Corporate AI Training', href: 'corporate-ai-training.html' },
    { label: 'Services', href: 'service.html' },
    { label: 'Contact', href: 'contact.html' },
    {
      label: 'More',
      href: '#',
      children: [
        { label: 'Mentorship', href: 'mentorship.html' },
        { label: 'Interview Prep', href: 'interview-prep.html' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/souvenger/', external: true },
        { label: 'Cognition Catalysts Platform', href: COGNITION_URL, external: true },
      ],
    },
  ];

  function currentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path === '' ? 'index.html' : path;
  }

  function isActive(href) {
    const page = currentPage();
    if (href === 'index.html' && (page === 'index.html' || page === '')) return true;
    return page === href;
  }

  function renderNavItem(item, mobile) {
    const active = isActive(item.href) ? ' active' : '';
    if (item.children) {
      const childActive = item.children.some(c => isActive(c.href));
      return `
        <li class="has-submenu${childActive ? ' active-parent' : ''}">
          <button type="button" class="submenu-toggle${mobile ? '' : ' desktop-skip'}" aria-expanded="false">
            ${item.label}
            <span class="submenu-arrow" aria-hidden="true">▾</span>
          </button>
          <a href="#" class="nav-link desktop-only${childActive ? ' active' : ''}">${item.label} <span class="submenu-arrow">▾</span></a>
          <ul class="sub-menu">
            ${item.children.map(c => {
              const ext = c.external ? ' target="_blank" rel="noopener"' : '';
              return `<li><a href="${c.href}" class="${isActive(c.href) ? 'active' : ''}"${ext}>${c.label}</a></li>`;
            }).join('')}
          </ul>
        </li>`;
    }
    return `<li><a href="${item.href}" class="nav-link${active}">${item.label}</a></li>`;
  }

  function renderHeader() {
    const navDesktop = NAV_ITEMS.map(i => renderNavItem(i, false)).join('');
    const navMobile = NAV_ITEMS.map(i => renderNavItem(i, true)).join('');

    return `
    <header class="header">
      <div class="header-bar">
        <div class="container header-bar-inner">
          <a href="index.html" class="logo">
            <img src="assets/images/cognition-catalysts-logo.svg" alt="Cognition Catalysts" class="logo-img">
            <span class="logo-text">Cognition Catalysts</span>
          </a>
          <nav class="nav-desktop" aria-label="Main navigation">
            <ul>${navDesktop}</ul>
          </nav>
          <a href="${TOPMATE_URL}" class="btn btn-sm btn-primary header-cta" target="_blank" rel="noopener">Book a Session</a>
          <button class="menu-toggle" type="button" aria-label="Menu Toggle" aria-expanded="false" aria-controls="nav-mobile">
            <svg class="icon-open" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
            <svg class="icon-close" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
        <nav class="nav-mobile" id="nav-mobile" aria-hidden="true" aria-label="Mobile navigation">
          <ul>${navMobile}</ul>
        </nav>
      </div>
    </header>`;
  }

  function renderFooter() {
    return `
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <img src="assets/images/cognition-catalysts-logo.svg" alt="Cognition Catalysts" class="footer-logo">
          <p>AI engineering practice platform &amp; consulting by Sourav Dey</p>
        </div>
        <div class="footer-links">
          <a href="about.html">About Sourav</a>
          <a href="cognition-catalysts.html">Platform</a>
          <a href="${COGNITION_URL}" target="_blank" rel="noopener">cognitioncatalysts.com</a>
          <a href="https://www.linkedin.com/in/souvenger/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${TOPMATE_URL}" target="_blank" rel="noopener">Topmate</a>
        </div>
        <p class="footer-copy">&copy; ${new Date().getFullYear()} Cognition Catalysts · Sourav Dey. All rights reserved.</p>
      </div>
    </footer>
    <a href="${TOPMATE_URL}" class="topmate-float" target="_blank" rel="noopener noreferrer" aria-label="Book on Topmate">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      Book on Topmate
    </a>
    <button class="scroll-top" aria-label="Scroll to Top" type="button">↑</button>`;
  }

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();
})();
