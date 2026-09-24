document.documentElement.classList.add('js');

const isEnglish = document.documentElement.lang === 'en';
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const menu = header?.querySelector('.menu');
if (header && menu) {
  const setMenuOpen = (open) => {
    header.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
  };
  menu.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
  header.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menu.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenuOpen(false);
  });
  window.matchMedia('(max-width: 800px)').addEventListener('change', () => setMenuOpen(false));
}

const status = document.getElementById('site-status');
let statusTimer;
function announce(message) {
  if (!status) return;
  window.clearTimeout(statusTimer);
  status.textContent = message;
  status.hidden = false;
  statusTimer = window.setTimeout(() => { status.hidden = true; }, 6000);
}

async function copyText(text) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
  } catch {
    const previousFocus = document.activeElement;
    const field = document.createElement('textarea');
    field.value = text;
    field.className = 'clipboard-helper';
    field.setAttribute('readonly', '');
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } finally {
      field.remove();
      previousFocus?.focus({ preventScroll: true });
    }
    if (!copied) throw new Error('Copy denied');
  }
}

document.querySelectorAll('.copy-email').forEach((button) => {
  button.addEventListener('click', async () => {
    const address = button.dataset.email;
    if (!address) return;
    try {
      await copyText(address);
      announce(isEnglish ? 'Email address copied.' : 'E-posta adresi kopyalandı.');
    } catch {
      announce(isEnglish ? `Please select and copy: ${address}` : `Adresi seçip kopyalayabilirsiniz: ${address}`);
    }
  });
});

document.querySelectorAll('.copy-enquiry').forEach((button) => {
  button.addEventListener('click', async () => {
    const form = button.closest('form');
    if (!form || !form.reportValidity()) return;
    const data = new FormData(form);
    const labels = isEnglish
      ? ['Name / Company', 'Email', 'Project type', 'Timing', 'Project summary']
      : ['Ad / Şirket', 'E-posta', 'Proje tipi', 'Zamanlama', 'Kısaca proje'];
    const names = ['name', 'email', 'project_type', 'timing', 'message'];
    const summary = names.map((name, index) => `${labels[index]}: ${data.get(name) || ''}`).join('\n\n');
    try {
      await copyText(summary);
      announce(isEnglish
        ? 'Project summary copied. You can paste it into an email to info@actevra.com.tr.'
        : 'Proje özeti kopyalandı. info@actevra.com.tr adresine yazacağınız e-postaya yapıştırabilirsiniz.');
    } catch {
      announce(isEnglish ? 'Copy is unavailable. Please select your text and copy it manually.' : 'Kopyalama kullanılamıyor. Metninizi seçerek elle kopyalayabilirsiniz.');
    }
  });
});

// Google Analytics 4 — keep the existing property.
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-83KBKDRFKV');
const ga = document.createElement('script');
ga.async = true;
ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-83KBKDRFKV';
document.head.appendChild(ga);
