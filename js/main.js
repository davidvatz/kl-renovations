// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ─── FOOTER YEAR ───
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── LOAD SETTINGS ───
async function loadSettings() {
  try {
    const res = await fetch('data/settings.json');
    if (!res.ok) return;
    const data = await res.json();
    document.querySelectorAll('.js-phone').forEach(el => el.textContent = data.phone);
    document.querySelectorAll('.js-email').forEach(el => el.textContent = data.email);
    document.querySelectorAll('.js-years').forEach(el => el.textContent = data.years_experience);
  } catch (e) { /* use hardcoded fallback values */ }
}

// ─── SERVICE ICONS ───
const ICONS = {
  kitchen: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="1.5"/><path d="M8 21h8M12 17v4M7 8h2M7 11.5h2M13 8h4M13 11.5h4"/></svg>`,
  bathroom: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-4z"/><path d="M5 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1"/><circle cx="7" cy="6.5" r=".5" fill="currentColor"/></svg>`,
  addition: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V9l7-6 7 6v12"/><path d="M9 21v-6h6v6"/></svg>`,
  deck: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="13" width="20" height="2.5"/><path d="M4 13V7M8 13V7M12 13V7M16 13V7M20 13V7"/><rect x="2" y="17.5" width="20" height="2.5"/></svg>`,
  flooring: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16"/><path d="M2 12h20M12 4v16M2 8h10M12 8h10M2 16h10M12 16h10"/></svg>`,
  painting: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  default: `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-4h6v4"/></svg>`
};

// ─── HOMEPAGE: SERVICES PREVIEW ───
async function loadServicesPreview() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  try {
    const res = await fetch('data/services.json');
    const data = await res.json();
    const services = data.items || data;
    grid.innerHTML = services.map((s, i) => `
      <div class="service-card">
        ${ICONS[s.icon] || ICONS.default}
        <span class="service-number">0${i + 1}</span>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>
    `).join('');
  } catch (e) { console.warn('Services load failed', e); }
}

// ─── HOMEPAGE: PORTFOLIO PREVIEW ───
async function loadPortfolioPreview() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  try {
    const res = await fetch('data/gallery.json');
    const data = await res.json();
    const items = (data.items || data).slice(0, 5);
    if (!items.length) { renderPortfolioPlaceholders(grid); return; }
    grid.innerHTML = items.map(item => `
      <div class="portfolio-item">
        ${item.image
          ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
          : `<div class="portfolio-placeholder">${item.category || 'Project'}</div>`}
        <div class="portfolio-overlay">
          <div class="portfolio-overlay-content">
            <h3>${item.title}</h3>
            <span>${item.category}</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch (e) { renderPortfolioPlaceholders(grid); }
}

function renderPortfolioPlaceholders(grid) {
  const labels = ['Kitchen Remodel', 'Bathroom Renovation', 'Home Addition', 'Deck Build', 'Flooring'];
  grid.innerHTML = labels.map(label => `
    <div class="portfolio-item">
      <div class="portfolio-placeholder">${label}</div>
      <div class="portfolio-overlay">
        <div class="portfolio-overlay-content">
          <h3>${label}</h3>
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── SERVICES PAGE: FULL GRID ───
async function loadServicesPage() {
  const grid = document.getElementById('servicesFullGrid');
  if (!grid) return;
  try {
    const res = await fetch('data/services.json');
    const data = await res.json();
    const services = data.items || data;
    grid.innerHTML = services.map((s, i) => `
      <div class="service-card-large">
        ${ICONS[s.icon] || ICONS.default}
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        ${s.details && s.details.length ? `
          <ul class="service-list">
            ${s.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        ` : ''}
        <span class="service-bg-number">0${i + 1}</span>
      </div>
    `).join('');
  } catch (e) { console.warn('Services page load failed', e); }
}

// ─── GALLERY PAGE ───
let galleryItems = [];

async function loadGalleryPage() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  try {
    const res = await fetch('data/gallery.json');
    const data = await res.json();
    galleryItems = data.items || data;
  } catch (e) { galleryItems = []; }

  renderGallery('All');
  setupGalleryFilters();
  setupLightbox();
}

function renderGallery(filter) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const filtered = filter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="gallery-empty">
        <p>${galleryItems.length ? 'No projects in this category yet.' : 'Photos coming soon — check back after our next project!'}</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((item, i) => `
    <div class="gallery-item" data-index="${i}" data-category="${item.category}">
      ${item.image
        ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
        : `<div class="gallery-placeholder"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>${item.category}</div>`}
      <div class="gallery-overlay">
        <h3>${item.title}</h3>
        <span>${item.category}</span>
      </div>
    </div>
  `).join('');

  // Re-attach click handlers
  grid.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index)));
  });
}

function setupGalleryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });
}

// ─── LIGHTBOX ───
let currentLightboxIndex = 0;

function setupLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => shiftLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => shiftLightbox(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') shiftLightbox(-1);
    if (e.key === 'ArrowRight') shiftLightbox(1);
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function shiftLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

function updateLightbox() {
  const item = galleryItems[currentLightboxIndex];
  if (!item) return;
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCat');
  if (item.image) {
    img.src = item.image;
    img.alt = item.title;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
  if (title) title.textContent = item.title;
  if (cat) cat.textContent = item.category;
}

// ─── QUOTE FORM: FILE PREVIEW ───
function setupFileUpload() {
  const input = document.getElementById('photoUpload');
  const preview = document.getElementById('filePreview');
  if (!input || !preview) return;

  input.addEventListener('change', () => {
    preview.innerHTML = '';
    Array.from(input.files).forEach(file => {
      const tag = document.createElement('div');
      tag.className = 'file-preview-tag';
      tag.innerHTML = `${file.name} <span onclick="removeFile(this)" title="Remove">✕</span>`;
      preview.appendChild(tag);
    });
  });
}

// ─── INIT ───
loadSettings();
loadServicesPreview();
loadPortfolioPreview();
loadServicesPage();
loadGalleryPage();
setupFileUpload();
