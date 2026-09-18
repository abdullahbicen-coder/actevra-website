const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const helper = document.createElement('textarea');
  helper.value = text;
  helper.setAttribute('readonly', '');
  helper.style.position = 'absolute';
  helper.style.left = '-9999px';
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(helper);
  return copied;
}

function showCopiedState(button, copiedText) {
  const labelEl = button.querySelector('.header-email-label');
  const addressEl = button.querySelector('.header-email-address');
  const originalText = button.dataset.originalText || button.textContent;
  const originalLabel = labelEl ? labelEl.textContent : '';
  const originalAddress = addressEl ? addressEl.textContent : '';

  if (!button.dataset.originalText) {
    button.dataset.originalText = originalText;
    if (labelEl) button.dataset.originalLabel = originalLabel;
    if (addressEl) button.dataset.originalAddress = originalAddress;
  }

  button.classList.add('copied');

  if (labelEl && addressEl) {
    labelEl.textContent = 'Kopyalandı';
    addressEl.textContent = copiedText;
  } else {
    button.textContent = 'Kopyalandı';
  }

  window.setTimeout(() => {
    button.classList.remove('copied');
    if (labelEl && addressEl) {
      labelEl.textContent = button.dataset.originalLabel || 'E-posta';
      addressEl.textContent = button.dataset.originalAddress || copiedText;
    } else {
      button.textContent = originalText;
    }
  }, 1800);
}

document.querySelectorAll('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    const email = button.dataset.email || 'info@actevra.com.tr';
    try {
      await copyToClipboard(email);
      showCopiedState(button, email);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  });
});

document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
