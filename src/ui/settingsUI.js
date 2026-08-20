import { GEN_ERA_MAPPING, GAME_CONFIGS, getLocalizedGameLabel, getLocalizedEraLabel, getLocalizedDexName } from '../data/gameConfigs.js';

import { getPrimarySpriteUrl } from '../services/spriteService.js';
import { isGlobalShiny } from './themeUI.js';
import { getIcon, getFlagSvg } from './icons.js';
import { t, getLanguage } from '../i18n/i18nService.js';

// Starter / Mascot Pokémon IDs for Generations
const GEN_STARTER_MAP = {
  gen1: { id: 6, eraKey: "gen1" },
  gen2: { id: 157, eraKey: "gen2" },
  gen3: { id: 254, eraKey: "gen3" },
  gen4: { id: 389, eraKey: "gen4" },
  gen5: { id: 497, eraKey: "gen5" },
  gen6: { id: 658, eraKey: "gen6" },
  gen7: { id: 724, eraKey: "gen7" },
  gen8: { id: 815, eraKey: "gen8" },
  gen9: { id: 908, eraKey: "gen9" },
  legends_special: { id: 493, eraKey: "legends_special" }
};

// Mascot Pokémon IDs for Games
const GAME_MASCOT_MAP = {
  gen1_rby: 25,
  gen1_leafgreen: 3,
  gen1_letsgo: 133,
  gen2_gsc: 155,
  gen2_hgss: 250,
  gen3_emerald: 384,
  gen3_roza: 383,
  gen4_sinnoh_extended: 487,
  gen4_sinnoh_original: 483,
  gen4_bdsp: 484,
  gen5_unova_updated: 646,
  gen5_unova_original: 643,
  gen6_kalos: 716,
  gen7_alola_updated: 800,
  gen7_alola_original: 791,
  gen8_galar: 888,
  gen8_isle_of_armor: 892,
  gen8_crown_tundra: 898,
  gen9_paldea: 1007,
  gen9_kitakami: 1017,
  gen9_blueberry: 1024,
  special_hisui: 493,
  special_legends_za: 718,
  special_pokopia: 25
};

function getStarterRegion(eraKey) {
  const regionMap = {
    gen1: t('regions.kanto'),
    gen2: t('regions.johto'),
    gen3: t('regions.hoenn'),
    gen4: t('regions.sinnoh'),
    gen5: t('regions.unova'),
    gen6: t('regions.kalos'),
    gen7: t('regions.alola'),
    gen8: t('regions.galar'),
    gen9: t('regions.paldea'),
    legends_special: "Hisui / Z-A"
  };
  return regionMap[eraKey] || "";
}

export function renderSettingsScreen(options) {
  const {
    containerEl, currentEraKey, currentGameKey, currentDexId,
    onSelectEra, onSelectGame, onSelectDex, onToggleShiny,
    onSelectLanguage, onExportGame, onExportGlobal, onImportData,
    onShare, onResetProgress
  } = options;

  if (!containerEl) return;

  const shinyActive = isGlobalShiny();
  const currentGame = GAME_CONFIGS[currentGameKey];

  const genCardsHTML = Object.entries(GEN_ERA_MAPPING).map(([eraKey, eraData]) => {
    const isSelected = eraKey === currentEraKey;
    const starterInfo = GEN_STARTER_MAP[eraKey] || { id: 25 };
    const eraTitle = getLocalizedEraLabel(eraKey);
    const eraRegion = getStarterRegion(eraKey);
    const spriteUrl = getPrimarySpriteUrl(starterInfo.id, false);
    return `<div class="gen-card ${isSelected ? 'active' : ''}" data-era="${eraKey}">
        ${isSelected ? `<span class="gen-card-check">${getIcon('check')}</span>` : ''}
        <div class="gen-card-sprite-box"><img src="${spriteUrl}" alt="${eraTitle}" class="gen-card-sprite" loading="lazy"></div>
        <div class="gen-card-title">${eraTitle}</div>
        <div class="gen-card-subtitle">${eraRegion}</div>
      </div>`;
  }).join('');

  const group = GEN_ERA_MAPPING[currentEraKey] || GEN_ERA_MAPPING.gen9;


  const gamesListHTML = group.games.map(g => {
    const isSelected = g.key === currentGameKey;
    const gConfig = GAME_CONFIGS[g.key];
    const mascotId = GAME_MASCOT_MAP[g.key] || 25;
    const spriteUrl = getPrimarySpriteUrl(mascotId, false);
    
    // Always resolve game name dynamically in current language
    const rawName = gConfig ? gConfig.name : getLocalizedGameLabel(g.key);
    const cleanName = rawName.replace(/^Gen\s*\d+:\s*/i, '').replace(/\s*\([^)]*\)/g, '').trim();
    
    const dexesInfo = gConfig && gConfig.dexes
      ? gConfig.dexes.map(d => getLocalizedDexName(d)).join(' · ')
      : t('dexModes.regional');

    return `<div class="game-card ${isSelected ? 'active' : ''}" data-game="${g.key}">
        <div class="game-card-icon-box"><img src="${spriteUrl}" alt="" class="game-card-sprite" loading="lazy"></div>
        <div class="game-card-info">
          <div class="game-card-title">${cleanName}</div>
          <div class="game-card-subtitle">${dexesInfo}</div>
        </div>
        ${isSelected ? `<span class="game-card-check">${getIcon('check')}</span>` : ''}
      </div>`;
  }).join('');

  let dexSelectorHTML = '';
  if (currentGame && currentGame.dexes && currentGame.dexes.length > 1) {
    const dexBtns = currentGame.dexes.map(dex => {
      const isActiveDex = dex.id === currentDexId;
      const typeIcon = dex.type === 'national' ? getIcon('globe') : getIcon('location');
      const dexTitle = getLocalizedDexName(dex);
      return `<button type="button" class="dex-pill-btn ${isActiveDex ? 'active' : ''}" data-dex-id="${dex.id}">
        <span class="dex-pill-icon">${typeIcon}</span>
        <span>${dexTitle}</span>
      </button>`;
    }).join('');

    dexSelectorHTML = `<div class="settings-section">
      <div class="settings-section-title">
        <span class="settings-title-icon">${getIcon('pokedex')}</span>
        <span>${t('nav.pokedex')}</span>
      </div>
      <div class="settings-card">
        <div class="dex-pills-row">${dexBtns}</div>
      </div>
    </div>`;
  }

  containerEl.innerHTML = `
    <div class="screen-header">
      <h1 class="screen-title" data-i18n="settingsView.title">${t('settingsView.title')}</h1>
    </div>
    <div class="settings-section">
      <div class="settings-section-title"><span class="settings-title-icon">${getIcon('gamepad')}</span><span data-i18n="settingsView.genSaga">${t('settingsView.genSaga')}</span></div>
      <div class="gen-cards-scroll">${genCardsHTML}</div>
    </div>
    <div class="settings-desktop-split">
      <div class="settings-desktop-left-col">
        <div class="settings-section">
          <div class="settings-section-title"><span class="settings-title-icon">${getIcon('location')}</span><span data-i18n="settingsView.gameEdition">${t('settingsView.gameEdition')}</span></div>
          <div class="games-list-col">${gamesListHTML}</div>
        </div>
        ${dexSelectorHTML}
      </div>
      <div class="settings-desktop-right-col">
        <div class="settings-section">
          <div class="settings-section-title"><span class="settings-title-icon">${getIcon('sliders')}</span><span data-i18n="settingsView.preferences">${t('settingsView.preferences')}</span></div>
          <div class="settings-card" style="display: flex; flex-direction: column; gap: 14px;">
            <div class="settings-pref-row">
              <div class="settings-pref-label"><span class="sparkles-icon" style="color: #f59e0b;">${getIcon('sparkles')}</span><span data-i18n="settingsView.shinySprites">${t('settingsView.shinySprites')}</span></div>
              <label class="switch-ios"><input type="checkbox" id="settings-shiny-toggle" ${shinyActive ? 'checked' : ''}><span class="slider-ios"></span></label>
            </div>
            <div class="settings-pref-row" style="flex-direction: column; align-items: flex-start; gap: 8px; padding-top: 12px; border-top: 1px dashed rgba(255, 255, 255, 0.08);">
              <div class="settings-pref-label"><span class="globe-icon" style="color: #10b981;">${getIcon('globe')}</span><span>Language</span></div>
              <div class="settings-lang-flags-grid">
                <button type="button" class="lang-flag-btn ${getLanguage() === 'es' ? 'active' : ''}" data-lang="es"><span class="flag-icon-wrap">${getFlagSvg('es')}</span><span class="flag-name">Español</span></button>
                <button type="button" class="lang-flag-btn ${getLanguage() === 'en' ? 'active' : ''}" data-lang="en"><span class="flag-icon-wrap">${getFlagSvg('en')}</span><span class="flag-name">English</span></button>
                <button type="button" class="lang-flag-btn ${getLanguage() === 'fr' ? 'active' : ''}" data-lang="fr"><span class="flag-icon-wrap">${getFlagSvg('fr')}</span><span class="flag-name">Français</span></button>
                <button type="button" class="lang-flag-btn ${getLanguage() === 'de' ? 'active' : ''}" data-lang="de"><span class="flag-icon-wrap">${getFlagSvg('de')}</span><span class="flag-name">Deutsch</span></button>
                <button type="button" class="lang-flag-btn ${getLanguage() === 'it' ? 'active' : ''}" data-lang="it"><span class="flag-icon-wrap">${getFlagSvg('it')}</span><span class="flag-name">Italiano</span></button>
              </div>
            </div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title"><span class="settings-title-icon">${getIcon('database')}</span><span data-i18n="settingsView.data">${t('settingsView.data')}</span></div>
          <div class="settings-card">
            <div class="settings-data-grid">
              <button class="settings-action-btn" id="btn-settings-export-game"><span class="btn-icon">${getIcon('exportDoc')}</span><span data-i18n="buttons.exportGame">${t('buttons.exportGame')}</span></button>
              <button class="settings-action-btn" id="btn-settings-export-global"><span class="btn-icon">${getIcon('globe')}</span><span data-i18n="buttons.exportGlobal">${t('buttons.exportGlobal')}</span></button>
              <button class="settings-action-btn" id="btn-settings-import"><span class="btn-icon">${getIcon('upload')}</span><span data-i18n="buttons.importData">${t('buttons.importData')}</span></button>
              <button class="settings-action-btn" id="btn-settings-share"><span class="btn-icon">${getIcon('share')}</span><span data-i18n="buttons.share">${t('buttons.share')}</span></button>
            </div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-card danger-card">
            <div class="danger-header"><span class="danger-icon">${getIcon('warning')}</span><span class="danger-title" data-i18n="settingsView.dangerZone">${t('settingsView.dangerZone')}</span></div>
            <p class="danger-text" data-i18n="settingsView.dangerWarning">${t('settingsView.dangerWarning')}</p>
            <button class="btn-danger" id="btn-settings-reset"><span class="btn-icon">${getIcon('reset')}</span><span data-i18n="settingsView.resetBtn">${t('settingsView.resetBtn')}</span></button>
          </div>
        </div>
      </div>
    </div>
  `;

  containerEl.querySelectorAll('.gen-card').forEach(el => {
    el.addEventListener('click', () => { if (onSelectEra) onSelectEra(el.getAttribute('data-era')); });
  });
  containerEl.querySelectorAll('.game-card').forEach(el => {
    el.addEventListener('click', () => { if (onSelectGame) onSelectGame(el.getAttribute('data-game')); });
  });
  containerEl.querySelectorAll('.dex-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (onSelectDex) onSelectDex(btn.getAttribute('data-dex-id')); });
  });
  const shinyToggle = containerEl.querySelector('#settings-shiny-toggle');
  if (shinyToggle) shinyToggle.addEventListener('change', (e) => { if (onToggleShiny) onToggleShiny(e.target.checked); });
  containerEl.querySelectorAll('.lang-flag-btn').forEach(btn => {
    btn.addEventListener('click', () => { const lang = btn.getAttribute('data-lang'); if (onSelectLanguage && lang) onSelectLanguage(lang); });
  });
  const btnExportGame = containerEl.querySelector('#btn-settings-export-game');
  if (btnExportGame) btnExportGame.addEventListener('click', onExportGame);
  const btnExportGlobal = containerEl.querySelector('#btn-settings-export-global');
  if (btnExportGlobal) btnExportGlobal.addEventListener('click', onExportGlobal);
  const btnImport = containerEl.querySelector('#btn-settings-import');
  if (btnImport) btnImport.addEventListener('click', onImportData);
  const btnShare = containerEl.querySelector('#btn-settings-share');
  if (btnShare) btnShare.addEventListener('click', onShare);
  const btnReset = containerEl.querySelector('#btn-settings-reset');
  if (btnReset) btnReset.addEventListener('click', onResetProgress);
}
