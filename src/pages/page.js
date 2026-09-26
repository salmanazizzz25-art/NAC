// Shared entry for the static About / Privacy / Terms pages.
import '../index.css';
import './page.css';

function applyTheme() {
  let theme = null;
  try {
    theme = localStorage.getItem('nac-theme');
  } catch {
    // storage unavailable; fall back to system preference
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
}

applyTheme();
