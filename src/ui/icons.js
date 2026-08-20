/**
 * SVG Vector Icon Helper for MyPokeLog
 * Provides lightweight, crisp, scalable SVG icons for dark UI without external libraries or emojis.
 */

export const ICONS = {
  // Navigation
  pokedex: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h6m6 0h6"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`,

  progress: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 20V10"/>
    <path d="M12 20V4"/>
    <path d="M6 20v-6"/>
  </svg>`,

  settings: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>`,

  // UI Icons
  search: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,

  pending: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 22h14"/>
    <path d="M5 2h14"/>
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
  </svg>`,

  info: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,

  sparkles: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </svg>`,

  compass: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>`,

  location: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>`,

  book: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>`,

  gamepad: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <line x1="15" y1="13" x2="15.01" y2="13"/>
    <line x1="18" y1="11" x2="18.01" y2="11"/>
    <rect x="2" y="6" width="20" height="12" rx="6"/>
  </svg>`,

  sliders: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>`,

  database: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>`,

  exportDoc: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>`,

  globe: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>`,

  upload: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>`,

  share: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>`,

  warning: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,

  reset: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>`,

  arrowDown: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>`,

  arrowLeft: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>`,

  arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>`
};

/**
 * 18 Semantic Pokémon Type SVGs (pixel/crisp geometric badges matching mock bottom sheet)
 */
export const TYPE_SVGS = {
  Normal: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <circle cx="12" cy="12" r="8" fill="#a8a878"/>
    <circle cx="12" cy="12" r="4" fill="#6d6d4e"/>
  </svg>`,

  Fire: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#f08030">
    <path d="M12 2C10 6 7 9 7 13a5 5 0 0 0 10 0c0-2-1-4-2-5 0 3-2 4-3 4s-1-2-1-3c0-3 1-5 1-7Z"/>
  </svg>`,

  Water: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#6890f0">
    <path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11Z"/>
  </svg>`,

  Electric: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#f8d030">
    <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2"/>
  </svg>`,

  Grass: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#78c850">
    <path d="M19 4c-6 0-11 4-11 10 0 3 2 5 4 6 5 2 10-2 10-8 0-4-1-8-3-8Z"/>
    <path d="M8 14c3-3 7-5 11-6" stroke="#2e541b" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  Ice: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#98d8d8">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" stroke="#98d8d8" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  Fighting: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#c03028">
    <circle cx="12" cy="12" r="8"/>
    <path d="M8 11h8M8 14h8" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  Poison: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#a040a0">
    <circle cx="12" cy="12" r="8"/>
    <circle cx="9" cy="10" r="1.5" fill="#ffffff"/>
    <circle cx="15" cy="10" r="1.5" fill="#ffffff"/>
    <path d="M9 15h6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  Ground: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#e0c068">
    <polygon points="12 4 4 19 20 19"/>
    <polygon points="12 9 8 16 16 16" fill="#8c6b2d"/>
  </svg>`,

  Flying: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#a890f0">
    <path d="M3 13c5-1 7-7 9-10 2 3 4 9 9 10-5 2-8 7-9 9-1-2-4-7-9-9Z"/>
  </svg>`,

  Psychic: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#f85888">
    <circle cx="12" cy="12" r="8"/>
    <circle cx="12" cy="12" r="4" fill="#ffffff"/>
  </svg>`,

  Bug: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#a8b820">
    <ellipse cx="12" cy="13" rx="6" ry="7"/>
    <circle cx="12" cy="6" r="3"/>
    <line x1="9" y1="4" x2="6" y2="2" stroke="#a8b820" stroke-width="2" stroke-linecap="round"/>
    <line x1="15" y1="4" x2="18" y2="2" stroke="#a8b820" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  Rock: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#b8a038">
    <polygon points="7 4 17 4 21 11 16 20 8 20 3 11"/>
  </svg>`,

  Ghost: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#705898">
    <path d="M12 3a7 7 0 0 0-7 7v10l3-2 4 2 4-2 3 2V10a7 7 0 0 0-7-7Z"/>
    <circle cx="9" cy="10" r="1.5" fill="#ffffff"/>
    <circle cx="15" cy="10" r="1.5" fill="#ffffff"/>
  </svg>`,

  Dragon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#7038f8">
    <path d="M4 18c3-4 5-11 8-15 3 4 5 11 8 15-4-1-6 2-8 3-2-1-4-4-8-3Z"/>
  </svg>`,

  Steel: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#b8b8d0">
    <polygon points="12 2 20 7 20 17 12 22 4 17 4 7"/>
    <circle cx="12" cy="12" r="3" fill="#6d6d8a"/>
  </svg>`,

  Fairy: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#ee99ac">
    <path d="m12 3 2.5 5.5L20 11l-4.5 4 1.5 6-5-3-5 3 1.5-6L4 11l5.5-2.5Z"/>
  </svg>`,

  Dark: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#705848">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a7 7 0 1 1-7.54-7.54c-.44-.06-.9-.1-1.36-.1Z"/>
  </svg>`
};

export const FLAGS_SVG = {
  es: `<svg viewBox="0 0 640 480" width="18" height="13" class="flag-svg" style="border-radius: 2px; flex-shrink: 0; display: inline-block; vertical-align: middle; box-shadow: 0 0 1px rgba(0,0,0,0.6);"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/><path fill="#c60b1e" d="M120 180h40v120h-40z"/></svg>`,
  en: `<svg viewBox="0 0 640 480" width="18" height="13" class="flag-svg" style="border-radius: 2px; flex-shrink: 0; display: inline-block; vertical-align: middle; box-shadow: 0 0 1px rgba(0,0,0,0.6);"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 245 180L565 0h75v60L435 240l205 180v60h-75L320 300 75 480H0v-60l205-180L0 60V0z"/><path fill="#C8102E" d="m0 0 260 195h-50L0 40zm640 0L380 195h50l210-155zM0 480l260-195h-50L0 440zm640 0L380 285h50l210 155z"/><path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/><path fill="#C8102E" d="M270 0h100v480H270zM0 190h640v100H0z"/></svg>`,
  fr: `<svg viewBox="0 0 640 480" width="18" height="13" class="flag-svg" style="border-radius: 2px; flex-shrink: 0; display: inline-block; vertical-align: middle; box-shadow: 0 0 1px rgba(0,0,0,0.6);"><path fill="#002654" d="M0 0h213.3v480H0z"/><path fill="#FFF" d="M213.3 0h213.4v480H213.3z"/><path fill="#ce1126" d="M426.7 0H640v480H426.7z"/></svg>`,
  de: `<svg viewBox="0 0 640 480" width="18" height="13" class="flag-svg" style="border-radius: 2px; flex-shrink: 0; display: inline-block; vertical-align: middle; box-shadow: 0 0 1px rgba(0,0,0,0.6);"><path fill="#000" d="M0 0h640v160H0z"/><path fill="#dd0000" d="M0 160h640v160H0z"/><path fill="#ffce00" d="M0 320h640v160H0z"/></svg>`,
  it: `<svg viewBox="0 0 640 480" width="18" height="13" class="flag-svg" style="border-radius: 2px; flex-shrink: 0; display: inline-block; vertical-align: middle; box-shadow: 0 0 1px rgba(0,0,0,0.6);"><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#FFF" d="M213.3 0h213.4v480H213.3z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></svg>`
};

/**
 * Returns an icon HTML string by key
 */
export function getIcon(key) {
  return ICONS[key] || '';
}

/**
 * Returns a type icon SVG
 */
export function getTypeSvg(type) {
  return TYPE_SVGS[type] || TYPE_SVGS.Normal;
}

/**
 * Returns a crisp vector SVG country flag
 */
export function getFlagSvg(lang) {
  return FLAGS_SVG[lang] || FLAGS_SVG.es;
}
