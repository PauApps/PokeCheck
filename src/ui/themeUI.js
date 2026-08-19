import { loadTheme, saveTheme } from '../services/storageService.js';

let currentTheme = loadTheme();
let globalShinyMode = false;

export function isGlobalShiny() {
  return globalShinyMode;
}

export function setGlobalShiny(val) {
  globalShinyMode = val;
}

export function initTheme(themeToggleBtn) {
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Claro';
  } else {
    document.body.classList.remove('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Oscuro';
  }
}

export function toggleTheme(themeToggleBtn) {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  saveTheme(currentTheme);

  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Claro';
  } else {
    document.body.classList.remove('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Oscuro';
  }
}

export function toggleGlobalShiny(globalShinyBtn, onToggleCallback) {
  globalShinyMode = !globalShinyMode;
  if (globalShinyBtn) {
    globalShinyBtn.classList.toggle('active', globalShinyMode);
    globalShinyBtn.style.backgroundColor = globalShinyMode ? 'var(--accent-hover)' : '';
  }
  if (onToggleCallback) onToggleCallback();
}
