import en from './locales/en.js';
import es from './locales/es.js';
import fr from './locales/fr.js';
import de from './locales/de.js';
import it from './locales/it.js';

export const AVAILABLE_LOCALES = { en, es, fr, de, it };

let currentLang = 'en';

function isStorageAvailable() {
  return typeof localStorage !== 'undefined';
}

function detectBrowserLanguage() {
  if (typeof navigator === 'undefined' || !navigator.language) return 'en';
  const code = navigator.language.split('-')[0].toLowerCase();
  return AVAILABLE_LOCALES[code] ? code : 'en';
}

export function getLanguage() {
  return currentLang;
}

export function setLanguage(langCode) {
  if (!AVAILABLE_LOCALES[langCode]) {
    langCode = 'en';
  }
  currentLang = langCode;
  if (isStorageAvailable()) {
    localStorage.setItem('pokedex_lang', currentLang);
  }
  translateDOM();
}

/**
 * Resolves a nested key path in a locale object.
 * e.g., getNestedProperty(en, 'modals.detail.baseStats')
 */
function getNestedProperty(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
}

/**
 * Translates a key with optional string interpolation params.
 * @param {string} key - e.g. 'stats.caught' or 'toasts.caught'
 * @param {object} [params] - e.g. { name: 'Pikachu', count: 5 }
 * @returns {string}
 */
export function t(key, params = {}) {
  const currentDict = AVAILABLE_LOCALES[currentLang] || en;
  let text = getNestedProperty(currentDict, key);

  // Fallback to English if key not found in current language
  if (text === undefined && currentLang !== 'en') {
    text = getNestedProperty(en, key);
  }

  // Fallback to key itself
  if (text === undefined) {
    return key;
  }

  if (typeof text !== 'string') {
    return text;
  }

  // Replace {paramName} placeholders
  return text.replace(/\{(\w+)\}/g, (_, pName) => {
    return params[pName] !== undefined ? params[pName] : `{${pName}}`;
  });
}

/**
 * Automatically translates all elements in the DOM with data-i18n attributes.
 */
export function translateDOM() {
  if (typeof document === 'undefined') return;

  // 1. Text Content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // 2. Titles / Tooltips
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = t(key);
    }
  });

  // 3. Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = t(key);
    }
  });
}

/**
 * Initializes the i18n engine on app startup.
 */
export function initI18n() {
  const savedLang = isStorageAvailable() ? localStorage.getItem('pokedex_lang') : null;
  currentLang = savedLang && AVAILABLE_LOCALES[savedLang] ? savedLang : detectBrowserLanguage();
  translateDOM();
}
