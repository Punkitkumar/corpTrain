(function () {
  const NAV_ITEMS = [
    { label: 'Generative AI training', href: 'generative-ai-trainer-expert.html' },
    { label: 'Service', href: 'service.html' },
    { label: 'Chat GPT Training', href: 'chat-gpt-trainer-coach.html' },
    { label: 'Claude AI training', href: 'claude-ai-training-course.html' },
    { label: 'AI program', href: 'ai-program.html' },
    { label: 'Contact', href: 'contact.html' },
    {
      label: 'Courses',
      href: '#',
      children: [
        { label: 'Corporate Training', href: 'corporate-training-for-digital-marketing.html' },
        { label: 'AI training', href: 'ai-training.html' },
        { label: 'Digital Marketing Course', href: 'digital-marketing-course.html' },
        { label: 'Social Media Marketing Course', href: 'social-media-marketing-course.html' },
        { label: 'Digital Marketing Consultant & Expert', href: 'digital-marketing-consultant.html' },
        { label: 'About', href: 'about.html' },
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
            ${item.children.map(c => `<li><a href="${c.href}" class="${isActive(c.href) ? 'active' : ''}">${c.label}</a></li>`).join('')}
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
          <a href="index.html" class="logo">Hitesh Motwani</a>
          <nav class="nav-desktop" aria-label="Main navigation">
            <ul>${navDesktop}</ul>
          </nav>
          <a href="https://calendly.com/hitesh-analyst/online-consulting" class="btn btn-sm btn-blue header-cta" target="_blank" rel="noopener">Book A Call</a>
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
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} Hitesh Motwani. All rights reserved.</p>
      </div>
    </footer>
    <div class="whatsapp-float">
      <a href="https://web.whatsapp.com/send?phone=919892414313&text=I%20want%20to%20get%20in%20touch%20with%20Hitesh" target="_blank" rel="noopener noreferrer">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="#25D366"><path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.488 2.025 7.788L0 32l8.45-2.012C10.675 31.262 13.275 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.25c-2.475 0-4.8-.675-6.788-1.838l-.488-.288-5.025 1.2 1.237-4.875-.313-.5A13.2 13.2 0 012.75 16C2.75 8.138 8.638 2.25 16 2.25S29.25 8.138 29.25 16 23.362 29.25 16 29.25zm7.313-9.862c-.375-.188-2.213-1.088-2.55-1.213-.338-.125-.587-.188-.838.188-.25.375-.963 1.213-1.175 1.463-.213.25-.425.275-.788.088-.363-.188-1.525-.562-2.9-1.788-1.075-.95-1.8-2.125-2.012-2.488-.213-.363-.025-.562.162-.738.163-.163.363-.425.538-.638.175-.213.238-.363.363-.6.125-.238.062-.45-.025-.638-.088-.188-.838-2.013-1.15-2.75-.3-.713-.613-.613-.838-.625-.213-.012-.463-.012-.713-.012s-.65.088-.988.45c-.338.363-1.288 1.263-1.288 3.075s1.313 3.563 1.5 3.813c.188.25 2.575 3.925 6.238 5.5.875.375 1.55.6 2.075.775.875.275 1.663.238 2.288.15.7-.1 2.213-.9 2.525-1.775.313-.875.313-1.625.213-1.775-.1-.15-.35-.238-.725-.425z"/></svg>
        WhatsApp me
      </a>
    </div>
    <button class="scroll-top" aria-label="Scroll to Top" type="button">↑</button>`;
  }

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();
})();
