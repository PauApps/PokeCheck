import { POKEMON_DATA } from './data/pokemonData.js';
import { GAME_CONFIGS, GEN_ERA_MAPPING, getFirstDex, getDexConfig, getLocalizedGameName, getLocalizedRegionName } from './data/gameConfigs.js';
import { DEX_REGISTRY } from './data/dexRegistry.js';
import {
  loadSelectedGame, saveSelectedGame,
  loadSelectedDex, saveSelectedDex,
  loadDexMode, saveDexMode,
  loadCaughtSet, saveCaughtSet,
  syncGameDexes, togglePokemonInGame,
  generateExportJSON, downloadExportJSONFile,
  generateGlobalJSON, downloadDatabaseFile, importJSONData, loadLocalDatabase
} from './services/storageService.js';
import { isGlobalShiny, setGlobalShiny } from './ui/themeUI.js';
import { updateStats } from './ui/statsUI.js';
import { renderGrid, belongsToGen } from './ui/gridUI.js';
import { openModal, navigateModal, closeModal, toggleModalShiny } from './ui/modalUI.js';
import { renderProgressScreen } from './ui/progressUI.js';
import { renderSettingsScreen } from './ui/settingsUI.js';
import { initFilterSheet } from './ui/filterSheetUI.js';
import { generateShareUrl, shareProgress, decodeShareState } from './services/shareService.js';
import { initI18n, getLanguage, setLanguage, t, translateDOM } from './i18n/i18nService.js';
import { findGenEraForGame } from './ui/filterUI.js';
import { getFlagSvg } from './ui/icons.js';

// ==========================================
// Application State
// ==========================================
let activeTab = 'pokedex'; // 'pokedex' | 'progress' | 'settings'
let currentGameKey = loadSelectedGame() || 'gen1_leafgreen';
let currentEraKey = findGenEraForGame(currentGameKey) || 'gen1';

if (!GAME_CONFIGS[currentGameKey]) {
  currentGameKey = 'gen1_leafgreen';
}

// Multi-dex state: active dex within the current game
let currentDexId = loadSelectedDex(currentGameKey) || null;
let currentDexConfig = null; // populated below after validation

function resolveDexConfig(gameKey, dexId) {
  const game = GAME_CONFIGS[gameKey];
  if (!game || !game.dexes || game.dexes.length === 0) return null;
  if (dexId) {
    const found = game.dexes.find(d => d.id === dexId);
    if (found) return found;
  }
  return game.dexes[0];
}
currentDexConfig = resolveDexConfig(currentGameKey, currentDexId);
if (currentDexConfig) currentDexId = currentDexConfig.id;

let caughtSet = loadCaughtSet(currentDexConfig);

// Legacy: kept for shareService compatibility (always 'regional')
let currentDexMode = 'regional';

let filters = {
  query: '',
  status: 'all', // 'all' | 'caught' | 'missing'
  types: [], // array of selected types e.g. ['Normal', 'Fire']
  genVal: 'all' // 'all' | '1' .. '9'
};


// ==========================================
// DOM Elements
// ==========================================
// Views
const viewPokedex = document.getElementById('view-pokedex');
const viewProgress = document.getElementById('view-progress');
const viewSettings = document.getElementById('view-settings');

// Bottom Navigation Items (Mobile)
const navBtnPokedex = document.getElementById('nav-btn-pokedex');
const navBtnProgress = document.getElementById('nav-btn-progress');
const navBtnSettings = document.getElementById('nav-btn-settings');
const allNavBtns = [navBtnPokedex, navBtnProgress, navBtnSettings].filter(Boolean);

// Top Navigation Items (Desktop)
const desktopNavBtnPokedex = document.getElementById('desktop-nav-btn-pokedex');
const desktopNavBtnProgress = document.getElementById('desktop-nav-btn-progress');
const desktopNavBtnSettings = document.getElementById('desktop-nav-btn-settings');
const allDesktopNavBtns = [desktopNavBtnPokedex, desktopNavBtnProgress, desktopNavBtnSettings].filter(Boolean);
const desktopBrandClick = document.getElementById('desktop-brand-click');
const desktopLangSelect = document.getElementById('desktop-lang-select');

// Pokedex View Header & Elements
const headerSubtitle = document.getElementById('header-subtitle');
const headerGenTag = document.getElementById('header-gen-tag');
const caughtCountNumEl = document.getElementById('caught-count-num');
const caughtCountTotalEl = document.getElementById('caught-count-total');
const completionPercentageEl = document.getElementById('completion-percentage');
const progressFillEl = document.getElementById('progress-fill');
const searchInput = document.getElementById('search-input');
const pokedexGrid = document.getElementById('pokedex-grid');
const sharedBanner = document.getElementById('shared-banner');

// Quick Filter Pills
const pillFilterAll = document.getElementById('pill-filter-all');
const pillFilterCaught = document.getElementById('pill-filter-caught');
const pillFilterMissing = document.getElementById('pill-filter-missing');
const pillFilterTypes = document.getElementById('pill-filter-types');
const pillFilterTypesLabel = document.getElementById('pill-filter-types-label');
const pillFilterGen = document.getElementById('pill-filter-gen');
const pillFilterGenLabel = document.getElementById('pill-filter-gen-label');

// Filter Bottom Sheet Elements
const typeFilterSheetOverlay = document.getElementById('type-filter-sheet-overlay');
const typeFilterSheetDialog = document.getElementById('type-filter-sheet-dialog');
const typeSheetSubtitle = document.getElementById('type-sheet-subtitle');
const typeFilterGrid = document.getElementById('type-filter-grid');
const typeSheetCloseBtn = document.getElementById('type-sheet-close-btn');
const typeSheetClearBtn = document.getElementById('type-sheet-clear-btn');
const typeSheetApplyBtn = document.getElementById('type-sheet-apply-btn');

let filterSheetController = null;

// Modal Elements
const modalOverlay = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');

// Generic Modals
const exportGameModalOverlay = document.getElementById('export-game-modal-overlay');
const exportGameModalCloseBtn = document.getElementById('export-game-modal-close-btn');
const exportGameModalTitle = document.getElementById('export-game-modal-title');
const jsonGameExportCode = document.getElementById('json-game-export-code');
const copyGameJsonBtn = document.getElementById('copy-game-json-btn');
const downloadGameJsonBtn = document.getElementById('download-game-json-btn');

const exportGlobalModalOverlay = document.getElementById('export-global-modal-overlay');
const exportGlobalModalCloseBtn = document.getElementById('export-global-modal-close-btn');
const jsonGlobalExportCode = document.getElementById('json-global-export-code');
const copyGlobalJsonBtn = document.getElementById('copy-global-json-btn');
const downloadGlobalJsonBtn = document.getElementById('download-global-json-btn');

const importModalOverlay = document.getElementById('import-modal-overlay');
const importModalCloseBtn = document.getElementById('import-modal-close-btn');
const importFileInput = document.getElementById('import-file-input');
const importJsonTextarea = document.getElementById('import-json-textarea');
const applyImportJsonBtn = document.getElementById('apply-import-json-btn');

const shareModalOverlay = document.getElementById('share-modal-overlay');
const shareModalCloseBtn = document.getElementById('share-modal-close-btn');
const shareUrlInput = document.getElementById('share-url-input');
const copyShareUrlBtn = document.getElementById('copy-share-url-btn');
const shareModalSubtitle = document.getElementById('share-modal-subtitle');

// Toast
const toastEl = document.getElementById('toast-notification');
const toastMsg = document.getElementById('toast-message');

function padId(id) {
  return String(id).padStart(3, '0');
}

let toastTimeout = null;
function showToast(message) {
  if (!toastEl || !toastMsg) return;
  toastMsg.textContent = message;
  toastEl.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2400);
}

// ==========================================
// Pokedex List Calculation
// ==========================================
function getActivePokedexList() {
  if (!currentDexConfig) return [];
  const ids = DEX_REGISTRY[currentDexConfig.dexKey];
  if (!ids || ids.length === 0) return [];

  return ids.map((natId, idx) => {
    const p = POKEMON_DATA.find(item => item.id === natId);
    return {
      displayId: padId(idx + 1),
      nationalNum: natId,
      regionalNum: idx + 1,
      name: p ? p.name : `Pokémon #${natId}`,
      type1: p ? p.type1 : 'Normal',
      type2: p ? p.type2 : null
    };
  });
}

// ==========================================
// UI Updates & Rendering
// ==========================================
function updateHeaderInfo() {
  if (!currentDexConfig) return;

  currentEraKey = findGenEraForGame(currentGameKey) || 'gen1';

  const desktopHeaderSubtitle = document.getElementById('desktop-header-subtitle');
  const desktopHeaderGenTag = document.getElementById('desktop-header-gen-tag');

  const isNational = currentDexConfig.type === 'national';
  const genNumberMatch = currentGameKey.match(/gen(\d+)/i);

  if (isNational) {
    const natPill = t('dexModes.national');
    [headerGenTag, desktopHeaderGenTag].forEach(el => {
      if (el) {
        el.textContent = natPill.toUpperCase();
        el.style.background = 'rgba(59, 130, 246, 0.15)';
        el.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        el.style.color = '#60a5fa';
      }
    });
    const natSub = t('brand.nationalSubtitle');
    [headerSubtitle, desktopHeaderSubtitle].forEach(el => {
      if (el) el.textContent = natSub;
    });
  } else {
    let genTagText = genNumberMatch ? `GEN ${genNumberMatch[1]}` : t('labels.specialTag');
    [headerGenTag, desktopHeaderGenTag].forEach(el => {
      if (el) {
        el.textContent = genTagText;
        el.style.background = 'rgba(16, 185, 129, 0.1)';
        el.style.borderColor = 'rgba(16, 185, 129, 0.35)';
        el.style.color = 'var(--accent)';
      }
    });
    const regionName = getLocalizedRegionName(currentGameKey);
    const eraLabel = genNumberMatch ? `Gen ${genNumberMatch[1]}` : t('labels.legendsTag');
    const subText = t('brand.subtitle', { region: regionName, gen: eraLabel });
    [headerSubtitle, desktopHeaderSubtitle].forEach(el => {
      if (el) el.textContent = subText;
    });
  }
}

function refreshUI() {
  updateHeaderInfo();
  const activeList = getActivePokedexList();

  // Update top progress stats
  updateStats(activeList, caughtSet, {
    caughtCountNumEl,
    caughtCountTotalEl,
    completionPercentageEl,
    progressFillEl
  });

  // Render active tab view
  if (activeTab === 'pokedex') {
    renderGrid({
      gridEl: pokedexGrid,
      activeList,
      caughtSet,
      filters,
      currentDexMode,
      onToggleCaught: handleToggleCaught,
      onOpenModal: handleOpenModal
    });
  } else if (activeTab === 'progress') {
    renderProgressScreen(viewProgress, activeList, caughtSet);
  } else if (activeTab === 'settings') {
    renderSettingsScreen({
      containerEl: viewSettings,
      currentEraKey,
      currentGameKey,
      currentDexId,
      onSelectEra: handleSelectEra,
      onSelectGame: handleSelectGame,
      onSelectDex: handleSelectDex,
      onToggleShiny: handleToggleShiny,
      onSelectLanguage: handleSelectLanguage,
      onExportGame: handleExportGame,
      onExportGlobal: handleExportGlobal,
      onImportData: handleImportData,
      onShare: handleShareAction,
      onResetProgress: handleResetProgress
    });
  }
}

const LANG_META = {
  es: { flag: '🇪🇸', code: 'ES', name: 'Español' },
  en: { flag: '🇬🇧', code: 'EN', name: 'English' },
  fr: { flag: '🇫🇷', code: 'FR', name: 'Français' },
  de: { flag: '🇩🇪', code: 'DE', name: 'Deutsch' },
  it: { flag: '🇮🇹', code: 'IT', name: 'Italiano' }
};

function updateLanguageUI(langCode) {
  const meta = LANG_META[langCode] || LANG_META.es;
  const flagSvg = getFlagSvg(langCode);

  const dFlag = document.getElementById('desktop-lang-cur-flag');
  const dCode = document.getElementById('desktop-lang-cur-code');
  const mFlag = document.getElementById('mobile-lang-cur-flag');

  if (dFlag) dFlag.innerHTML = flagSvg;
  if (dCode) dCode.textContent = meta.code;
  if (mFlag) mFlag.innerHTML = flagSvg;

  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-lang') === langCode);
  });

  document.querySelectorAll('.btn-footer-lang').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  document.querySelectorAll('.lang-flag-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });
}

function handleSelectLanguage(langCode) {
  setLanguage(langCode);
  updateLanguageUI(langCode);
  updateQuickFilterPillsUI();

  const genEraSelector = document.getElementById('gen-era-selector');
  const gameSelector = document.getElementById('game-selector');
  if (genEraSelector) renderGenEraSelector(genEraSelector);
  const eraKey = findGenEraForGame(currentGameKey);
  if (gameSelector) populateGameSelectorForEra(eraKey, genEraSelector, gameSelector, currentGameKey);

  if (viewSettings) {
    renderSettingsScreen({
      containerEl: viewSettings,
      currentEraKey,
      currentGameKey,
      currentDexId,
      onSelectEra: handleSelectEra,
      onSelectGame: handleSelectGame,
      onSelectDex: handleSelectDex,
      onToggleShiny: handleToggleShiny,
      onSelectLanguage: handleSelectLanguage,
      onExportGame: handleExportGame,
      onExportGlobal: handleExportGlobal,
      onImportData: handleImportData,
      onShare: handleShareAction,
      onResetProgress: handleResetProgress
    });
  }

  refreshUI();
}

// ==========================================
// User Interactions & Actions
// ==========================================
function handleToggleCaught(id, shouldBeCaught) {
  const p = POKEMON_DATA.find(item => item.id === id);
  const name = p ? p.name : `#${id}`;

  if (shouldBeCaught) {
    showToast(t('toasts.caught', { name }));
  } else {
    showToast(t('toasts.pending', { name }));
  }

  togglePokemonInGame(GAME_CONFIGS[currentGameKey], id, shouldBeCaught);
  caughtSet = loadCaughtSet(currentDexConfig);
  refreshUI();
}

function handleOpenModal(id) {
  openModal(id, {
    activeList: getActivePokedexList(),
    caughtSet,
    gameConfig: GAME_CONFIGS[currentGameKey],
    modalElements: {
      modalOverlay,
      modalContainer
    },
    onToggleCaught: handleToggleCaught
  });
}

function switchTab(tabName) {
  activeTab = tabName;

  // Toggle active view visibility
  [viewPokedex, viewProgress, viewSettings].forEach(v => {
    if (v) v.classList.remove('active');
  });

  if (tabName === 'pokedex' && viewPokedex) viewPokedex.classList.add('active');
  if (tabName === 'progress' && viewProgress) viewProgress.classList.add('active');
  if (tabName === 'settings' && viewSettings) viewSettings.classList.add('active');

  // Update mobile and desktop navigation items active state
  allNavBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === tabName);
  });

  allDesktopNavBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === tabName);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  refreshUI();
}

function handleSelectEra(eraKey) {
  currentEraKey = eraKey;
  const group = GEN_ERA_MAPPING[eraKey];
  if (group && group.games.length > 0) {
    const gameInEra = group.games.find(g => g.key === currentGameKey);
    if (!gameInEra) {
      handleSelectGame(group.games[0].key);
    } else {
      refreshUI();
    }
  }
}

function handleSelectGame(gameKey) {
  if (!GAME_CONFIGS[gameKey]) return;
  currentGameKey = gameKey;
  saveSelectedGame(currentGameKey);
  currentEraKey = findGenEraForGame(currentGameKey);

  // Sync dexes for this game so shared pokémon are caught across regional & national
  syncGameDexes(GAME_CONFIGS[currentGameKey]);

  // Load last selected dex for this game, or default to first
  const savedDexId = loadSelectedDex(currentGameKey);
  currentDexConfig = resolveDexConfig(currentGameKey, savedDexId);
  currentDexId = currentDexConfig ? currentDexConfig.id : null;

  caughtSet = loadCaughtSet(currentDexConfig);

  showToast(t('toasts.gameChanged', { game: GAME_CONFIGS[currentGameKey].name }));
  refreshUI();
}

function handleSelectDex(dexId) {
  const game = GAME_CONFIGS[currentGameKey];
  if (!game || !game.dexes) return;
  const newDexConfig = game.dexes.find(d => d.id === dexId);
  if (!newDexConfig) return;

  // Sync dexes before switching
  syncGameDexes(game);

  currentDexId = dexId;
  currentDexConfig = newDexConfig;
  saveSelectedDex(currentGameKey, currentDexId);

  // Load caught set for the new dex
  caughtSet = loadCaughtSet(currentDexConfig);

  const dexName = currentDexConfig.name;
  showToast(`📖 ${dexName}`);
  refreshUI();
}


function handleToggleShiny(isActive) {
  setGlobalShiny(isActive);
  showToast(isActive ? t('toasts.shinyOn') : t('toasts.shinyOff'));
  refreshUI();
}

// Kept for backward compat (header gen tag click) — now cycles through dexes
function handleToggleDexMode() {
  if (!currentDexConfig) return;
  const game = GAME_CONFIGS[currentGameKey];
  if (!game || !game.dexes || game.dexes.length <= 1) return;
  const currentIdx = game.dexes.findIndex(d => d.id === currentDexId);
  const nextIdx = (currentIdx + 1) % game.dexes.length;
  handleSelectDex(game.dexes[nextIdx].id);
}

function handleResetProgress() {
  const gName = GAME_CONFIGS[currentGameKey] ? GAME_CONFIGS[currentGameKey].name : currentGameKey;
  const dexName = currentDexConfig ? currentDexConfig.name : '';
  if (confirm(t('confirm.resetGame', { game: `${gName} (${dexName})` }))) {
    caughtSet.clear();
    saveCaughtSet(currentDexConfig, caughtSet);
    showToast(t('toasts.resetConfirmed', { game: gName }));
    refreshUI();
  }
}




function getVisiblePokemonList() {
  const activeList = getActivePokedexList();
  const query = (filters.query || '').trim().toLowerCase();
  const status = filters.status || 'all';
  const genVal = filters.genVal || 'all';
  const selectedTypes = Array.isArray(filters.types) ? filters.types : [];

  return activeList.filter(p => {
    const matchesQuery = !query || 
      p.name.toLowerCase().includes(query) || 
      p.displayId.includes(query) || 
      String(p.nationalNum).includes(query);

    const isCaught = caughtSet.has(p.nationalNum);
    const matchesStatus = (status === 'all') || 
                          (status === 'caught' && isCaught) || 
                          (status === 'missing' && !isCaught);

    const matchesGen = genVal === 'all' || belongsToGen(p.nationalNum, genVal);

    let matchesType = true;
    if (selectedTypes.length > 0) {
      matchesType = selectedTypes.includes(p.type1) || (p.type2 && selectedTypes.includes(p.type2));
    }

    return matchesQuery && matchesStatus && matchesGen && matchesType;
  });
}

function handleBulkToggle() {
  const visibleList = getVisiblePokemonList();
  if (visibleList.length === 0) {
    showToast('No hay Pokémon visibles.');
    return;
  }

  const allCaught = visibleList.every(p => caughtSet.has(p.nationalNum));
  const shouldBeCaught = !allCaught;

  visibleList.forEach(p => {
    togglePokemonInGame(GAME_CONFIGS[currentGameKey], p.nationalNum, shouldBeCaught);
  });

  if (allCaught) {
    showToast(`⌛ ${visibleList.length} Pokémon desmarcados.`);
  } else {
    showToast(`✓ ${visibleList.length} Pokémon marcados como capturados.`);
  }

  caughtSet = loadCaughtSet(currentDexConfig);
  refreshUI();
}



// Quick filter pills logic
function updateQuickFilterPillsUI() {
  [pillFilterAll, pillFilterCaught, pillFilterMissing].forEach(pill => {
    if (pill) {
      const status = pill.getAttribute('data-status');
      pill.classList.toggle('active', filters.status === status);
    }
  });

  if (pillFilterTypes && pillFilterTypesLabel) {
    if (filters.types.length === 0) {
      pillFilterTypesLabel.textContent = t('labels.allTypes');
      pillFilterTypes.classList.remove('active');
    } else {
      pillFilterTypesLabel.textContent = `${filters.types.length} ${filters.types.length === 1 ? 'Tipo' : 'Tipos'}`;
      pillFilterTypes.classList.add('active');
    }
  }

  if (pillFilterGen && pillFilterGenLabel) {
    if (currentDexMode === 'national') {
      pillFilterGen.style.display = 'inline-flex';
      pillFilterGenLabel.textContent = filters.genVal === 'all' ? 'Todas las Gen' : `Gen ${filters.genVal}`;
      pillFilterGen.classList.toggle('active', filters.genVal !== 'all');
    } else {
      pillFilterGen.style.display = 'none';
      filters.genVal = 'all';
    }
  }

  const pillBulkToggle = document.getElementById('pill-bulk-toggle');
  const pillBulkToggleLabel = document.getElementById('pill-bulk-toggle-label');
  if (pillBulkToggle && pillBulkToggleLabel) {
    const visibleList = getVisiblePokemonList();
    const allCaught = visibleList.length > 0 && visibleList.every(p => caughtSet.has(p.nationalNum));
    pillBulkToggle.classList.toggle('all-caught', allCaught);
    pillBulkToggleLabel.textContent = allCaught ? 'Desmarcar todos' : 'Marcar todos';
  }
}

// ==========================================
// Modals & Export / Import Logic
// ==========================================
function copyTextHelper(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(successMsg);
  } catch (e) {
    showToast('❌ Error al copiar.');
  }
}

function handleExportGame() {
  try {
    const gConfig = GAME_CONFIGS[currentGameKey];
    const dexIds = DEX_REGISTRY[currentDexConfig ? currentDexConfig.dexKey : ''] || [];
    const jsonObj = generateExportJSON(gConfig, currentDexConfig, dexIds, caughtSet, POKEMON_DATA);
    const titleName = gConfig ? `${gConfig.name} (${currentDexConfig ? currentDexConfig.name : ''})` : '';
    if (exportGameModalTitle) exportGameModalTitle.textContent = `${t('modals.exportGame.title')} — ${titleName}`;
    if (jsonGameExportCode) jsonGameExportCode.textContent = JSON.stringify(jsonObj, null, 2);
    if (exportGameModalOverlay) exportGameModalOverlay.classList.add('active');
  } catch (err) {
    console.error('Error generating game JSON:', err);
    showToast('❌ Error al exportar.');
  }
}

function handleExportGlobal() {
  try {
    const jsonObj = generateGlobalJSON(GAME_CONFIGS);
    if (jsonGlobalExportCode) jsonGlobalExportCode.textContent = JSON.stringify(jsonObj, null, 2);
    if (exportGlobalModalOverlay) exportGlobalModalOverlay.classList.add('active');
  } catch (err) {
    console.error('Error generating global JSON:', err);
    showToast('❌ Error al exportar backup global.');
  }
}

function handleImportData() {
  if (importJsonTextarea) importJsonTextarea.value = '';
  if (importModalOverlay) importModalOverlay.classList.add('active');
}

function processJSONImport(jsonStr) {
  try {
    const parsed = JSON.parse(jsonStr);
    const res = importJSONData(parsed, GAME_CONFIGS, currentGameKey);
    if (res.success) {
      caughtSet = loadCaughtSet(currentDexConfig);
      if (importModalOverlay) importModalOverlay.classList.remove('active');
      const modeText = res.mode === 'global' ? 'Backup Global' : `Edición (${res.gameName || 'Activa'})`;
      showToast(t('toasts.importSuccess', { mode: modeText, count: res.count }));
      refreshUI();
    } else {
      alert(res.message || 'El JSON no contiene un formato reconocido.');
    }
  } catch (err) {
    alert('Error al procesar el código JSON: ' + err.message);
  }
}

function handleShareAction() {
  try {
    const activeList = getActivePokedexList();
    const shareUrl = generateShareUrl(currentGameKey, currentDexMode, activeList, caughtSet);
    const gName = getLocalizedGameName(currentGameKey);
    const count = activeList.filter(p => caughtSet.has(p.nationalNum)).length;
    const pct = activeList.length > 0 ? ((count / activeList.length) * 100).toFixed(1) : '0';

    if (shareUrlInput) shareUrlInput.value = shareUrl;
    if (shareModalSubtitle) {
      shareModalSubtitle.textContent = `Progreso: ${count} / ${activeList.length} capturados (${pct}%) en ${gName}.`;
    }
    if (shareModalOverlay) {
      shareModalOverlay.classList.add('active');
      if (shareUrlInput) {
        setTimeout(() => {
          shareUrlInput.focus();
          shareUrlInput.select();
        }, 100);
      }
    }
  } catch (err) {
    console.error('Error generating share URL:', err);
    showToast('❌ Error al generar enlace.');
  }
}

function updateFooterLangButtons() {
  const curLang = getLanguage();
  document.querySelectorAll('.btn-footer-lang').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === curLang);
  });
}

// ==========================================
// Event Listeners Setup
// ==========================================
function setupEventListeners() {
  // Navigation Tabs (Mobile)
  if (navBtnPokedex) navBtnPokedex.addEventListener('click', () => switchTab('pokedex'));
  if (navBtnProgress) navBtnProgress.addEventListener('click', () => switchTab('progress'));
  if (navBtnSettings) navBtnSettings.addEventListener('click', () => switchTab('settings'));

  // Navigation Tabs (Desktop)
  if (desktopNavBtnPokedex) desktopNavBtnPokedex.addEventListener('click', () => switchTab('pokedex'));
  if (desktopNavBtnProgress) desktopNavBtnProgress.addEventListener('click', () => switchTab('progress'));
  if (desktopNavBtnSettings) desktopNavBtnSettings.addEventListener('click', () => switchTab('settings'));
  if (desktopBrandClick) desktopBrandClick.addEventListener('click', () => switchTab('pokedex'));

  // Desktop & Mobile Language Dropdowns
  const desktopLangDropdown = document.getElementById('desktop-lang-dropdown');
  const desktopLangTrigger = document.getElementById('desktop-lang-trigger');
  const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
  const mobileLangTrigger = document.getElementById('mobile-lang-trigger');

  if (desktopLangTrigger && desktopLangDropdown) {
    desktopLangTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      desktopLangDropdown.classList.toggle('open');
      if (mobileLangDropdown) mobileLangDropdown.classList.remove('open');
    });
  }

  if (mobileLangTrigger && mobileLangDropdown) {
    mobileLangTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileLangDropdown.classList.toggle('open');
      if (desktopLangDropdown) desktopLangDropdown.classList.remove('open');
    });
  }

  // Language Dropdown Items Click
  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = item.getAttribute('data-lang');
      if (lang) {
        handleSelectLanguage(lang);
      }
      if (desktopLangDropdown) desktopLangDropdown.classList.remove('open');
      if (mobileLangDropdown) mobileLangDropdown.classList.remove('open');
    });
  });

  // Close dropdowns on outside click
  window.addEventListener('click', (e) => {
    if (desktopLangDropdown && !desktopLangDropdown.contains(e.target)) {
      desktopLangDropdown.classList.remove('open');
    }
    if (mobileLangDropdown && !mobileLangDropdown.contains(e.target)) {
      mobileLangDropdown.classList.remove('open');
    }
  });

  // Footer Navigation Links
  document.querySelectorAll('.footer-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const view = link.getAttribute('data-view');
      if (view) switchTab(view);
    });
  });

  // Footer Language Buttons
  document.querySelectorAll('.btn-footer-lang').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) {
        handleSelectLanguage(lang);
      }
    });
  });
  updateLanguageUI(getLanguage());

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filters.query = e.target.value;
      refreshUI();
    });
  }

  // Quick filter status pills
  if (pillFilterAll) {
    pillFilterAll.addEventListener('click', () => {
      filters.status = 'all';
      updateQuickFilterPillsUI();
      refreshUI();
    });
  }

  if (pillFilterCaught) {
    pillFilterCaught.addEventListener('click', () => {
      filters.status = 'caught';
      updateQuickFilterPillsUI();
      refreshUI();
    });
  }

  if (pillFilterMissing) {
    pillFilterMissing.addEventListener('click', () => {
      filters.status = 'missing';
      updateQuickFilterPillsUI();
      refreshUI();
    });
  }

  // Type filter bottom sheet
  filterSheetController = initFilterSheet({
    sheetOverlay: typeFilterSheetOverlay,
    sheetContainer: typeFilterSheetDialog,
    closeBtn: typeSheetCloseBtn,
    clearBtn: typeSheetClearBtn,
    applyBtn: typeSheetApplyBtn,
    subtitleEl: typeSheetSubtitle,
    gridEl: typeFilterGrid
  });

  if (pillFilterTypes) {
    pillFilterTypes.addEventListener('click', () => {
      if (filterSheetController) {
        filterSheetController.open(filters.types, (selectedTypes) => {
          filters.types = selectedTypes;
          updateQuickFilterPillsUI();
          refreshUI();
        });
      }
    });
  }

  // Generation filter pill (National Dex mode)
  if (pillFilterGen) {
    pillFilterGen.addEventListener('click', () => {
      const genOrder = ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const currentIdx = genOrder.indexOf(filters.genVal);
      const nextIdx = (currentIdx + 1) % genOrder.length;
      filters.genVal = genOrder[nextIdx];
      updateQuickFilterPillsUI();
      refreshUI();
    });
  }

  // Bulk toggle button (Marcar / Desmarcar todos)
  const pillBulkToggle = document.getElementById('pill-bulk-toggle');
  if (pillBulkToggle) {
    pillBulkToggle.addEventListener('click', () => {
      handleBulkToggle();
    });
  }

  // Header Mode Tag Click (Mobile & Desktop)
  if (headerGenTag) {
    headerGenTag.addEventListener('click', () => {
      handleToggleDexMode(currentDexMode === 'national' ? 'regional' : 'national');
    });
  }
  const desktopHeaderGenTag = document.getElementById('desktop-header-gen-tag');
  if (desktopHeaderGenTag) {
    desktopHeaderGenTag.addEventListener('click', () => {
      handleToggleDexMode(currentDexMode === 'national' ? 'regional' : 'national');
    });
  }

  // Export game modal
  if (exportGameModalCloseBtn) {
    exportGameModalCloseBtn.addEventListener('click', () => {
      if (exportGameModalOverlay) exportGameModalOverlay.classList.remove('active');
    });
  }

  if (copyGameJsonBtn) {
    copyGameJsonBtn.addEventListener('click', () => {
      const gConfig = GAME_CONFIGS[currentGameKey];
      const dexIds = DEX_REGISTRY[currentDexConfig ? currentDexConfig.dexKey : ''] || [];
      const jsonObj = generateExportJSON(gConfig, currentDexConfig, dexIds, caughtSet, POKEMON_DATA);
      copyTextHelper(JSON.stringify(jsonObj, null, 2), '📋 JSON del juego copiado.');
    });
  }

  if (downloadGameJsonBtn) {
    downloadGameJsonBtn.addEventListener('click', () => {
      const gConfig = GAME_CONFIGS[currentGameKey];
      const dexIds = DEX_REGISTRY[currentDexConfig ? currentDexConfig.dexKey : ''] || [];
      const jsonObj = generateExportJSON(gConfig, currentDexConfig, dexIds, caughtSet, POKEMON_DATA);
      downloadExportJSONFile(jsonObj, currentDexConfig ? currentDexConfig.id : 'export');
      showToast('💾 Archivo JSON descargado.');
    });
  }


  // Export global modal
  if (exportGlobalModalCloseBtn) {
    exportGlobalModalCloseBtn.addEventListener('click', () => {
      if (exportGlobalModalOverlay) exportGlobalModalOverlay.classList.remove('active');
    });
  }

  if (copyGlobalJsonBtn) {
    copyGlobalJsonBtn.addEventListener('click', () => {
      const jsonObj = generateGlobalJSON(GAME_CONFIGS);
      copyTextHelper(JSON.stringify(jsonObj, null, 2), '📋 Backup global JSON copiado.');
    });
  }

  if (downloadGlobalJsonBtn) {
    downloadGlobalJsonBtn.addEventListener('click', () => {
      downloadDatabaseFile(GAME_CONFIGS);
      showToast('💾 Archivo pokedex_db.json descargado.');
    });
  }

  // Import modal
  if (importModalCloseBtn) {
    importModalCloseBtn.addEventListener('click', () => {
      if (importModalOverlay) importModalOverlay.classList.remove('active');
    });
  }

  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        processJSONImport(evt.target.result);
        importFileInput.value = '';
      };
      reader.readAsText(file);
    });
  }

  if (applyImportJsonBtn) {
    applyImportJsonBtn.addEventListener('click', () => {
      const text = importJsonTextarea.value.trim();
      if (!text) {
        alert('Por favor, pega un código JSON válido.');
        return;
      }
      processJSONImport(text);
    });
  }

  // Share modal
  if (shareModalCloseBtn) {
    shareModalCloseBtn.addEventListener('click', () => {
      if (shareModalOverlay) shareModalOverlay.classList.remove('active');
    });
  }

  if (copyShareUrlBtn) {
    copyShareUrlBtn.addEventListener('click', async () => {
      if (shareUrlInput) {
        await navigator.clipboard.writeText(shareUrlInput.value);
        shareUrlInput.select();
      }
      showToast(t('toasts.shareCopied'));
    });
  }

  // Click outside to close generic modals
  [exportGameModalOverlay, exportGlobalModalOverlay, importModalOverlay, shareModalOverlay, modalOverlay].forEach(overlay => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    }
  });

  // Keyboard navigation & escape key
  window.addEventListener('keydown', (e) => {
    if (modalOverlay && modalOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        navigateModal(-1, {
          activeList: getActivePokedexList(),
          caughtSet,
          gameConfig: GAME_CONFIGS[currentGameKey],
          modalElements: { modalOverlay, modalContainer },
          onToggleCaught: handleToggleCaught
        });
      } else if (e.key === 'ArrowRight') {
        navigateModal(1, {
          activeList: getActivePokedexList(),
          caughtSet,
          gameConfig: GAME_CONFIGS[currentGameKey],
          modalElements: { modalOverlay, modalContainer },
          onToggleCaught: handleToggleCaught
        });
      } else if (e.key === 'Escape') {
        closeModal({ modalOverlay });
      }
    } else if (e.key === 'Escape') {
      [exportGameModalOverlay, exportGlobalModalOverlay, importModalOverlay, shareModalOverlay, typeFilterSheetOverlay].forEach(overlay => {
        if (overlay && overlay.classList.contains('active')) overlay.classList.remove('active');
      });
    }
  });
}

function checkSharedUrl() {
  const hash = window.location.hash;
  if (!hash || !hash.includes('share=')) {
    if (sharedBanner) sharedBanner.style.display = 'none';
    return;
  }

  const shareCode = hash.split('share=')[1];
  const decoded = decodeShareState(shareCode, GAME_CONFIGS, (gKey, mode) => {
    const gConfig = GAME_CONFIGS[gKey];
    if (!gConfig || !gConfig.dexes || gConfig.dexes.length === 0) return [];
    const dex = gConfig.dexes.find(d => d.id === mode || d.type === mode) || gConfig.dexes[0];
    const ids = (dex && DEX_REGISTRY[dex.dexKey]) ? DEX_REGISTRY[dex.dexKey] : [];
    return ids.map((natId, idx) => ({
      displayId: String(idx + 1).padStart(3, '0'),
      nationalNum: natId
    }));
  });

  if (decoded && sharedBanner) {
    const gName = getLocalizedGameName(decoded.gameKey);
    const pct = decoded.total > 0 ? ((decoded.count / decoded.total) * 100).toFixed(1) : '0';

    currentGameKey = decoded.gameKey;
    currentDexConfig = resolveDexConfig(currentGameKey, decoded.dexMode);
    if (currentDexConfig) {
      currentDexId = currentDexConfig.id;
      currentDexMode = currentDexConfig.type || 'regional';
    }
    caughtSet = decoded.caughtSet;
    currentEraKey = findGenEraForGame(currentGameKey);

    sharedBanner.innerHTML = `
      <div class="shared-banner-info">
        <span class="shared-banner-icon">👀</span>
        <div>
          <strong>Viendo progreso compartido:</strong> ${decoded.count} / ${decoded.total} (${pct}%) en <em>${gName}</em>.
        </div>
      </div>
      <div class="shared-banner-actions">
        <button class="btn btn-accent" id="import-shared-btn">📥 Guardar en mi Pokédex</button>
        <button class="btn" id="close-shared-banner-btn">&times; Cerrar</button>
      </div>
    `;
    sharedBanner.style.display = 'flex';

    refreshUI();

    const importSharedBtn = sharedBanner.querySelector('#import-shared-btn');
    const closeSharedBannerBtn = sharedBanner.querySelector('#close-shared-banner-btn');

    if (importSharedBtn) {
      importSharedBtn.addEventListener('click', () => {
        saveSelectedGame(currentGameKey);
        if (currentDexConfig) {
          saveSelectedDex(currentGameKey, currentDexConfig.id);
          saveCaughtSet(currentDexConfig, caughtSet);
        }
        saveDexMode(currentDexMode);

        window.location.hash = '';
        sharedBanner.style.display = 'none';
        showToast(t('toasts.sharedSaved', { game: getLocalizedGameName(currentGameKey) }));
        refreshUI();
      });
    }

    if (closeSharedBannerBtn) {
      closeSharedBannerBtn.addEventListener('click', () => {
        currentGameKey = loadSelectedGame() || 'gen1_leafgreen';
        if (!GAME_CONFIGS[currentGameKey]) currentGameKey = 'gen1_leafgreen';
        currentDexId = loadSelectedDex(currentGameKey);
        currentDexConfig = resolveDexConfig(currentGameKey, currentDexId);
        if (currentDexConfig) currentDexId = currentDexConfig.id;
        currentDexMode = loadDexMode() || (currentDexConfig ? currentDexConfig.type : 'regional');
        caughtSet = loadCaughtSet(currentDexConfig);
        currentEraKey = findGenEraForGame(currentGameKey);

        window.location.hash = '';
        sharedBanner.style.display = 'none';
        refreshUI();
      });
    }
  }
}

// ==========================================
// Initialization
// ==========================================
function init() {
  initI18n();

  // Parse SEO landing URL params (?game=...&dex=...&mode=...&shiny=...)
  const urlParams = new URLSearchParams(window.location.search);
  const pGame = urlParams.get('game');
  const pDex = urlParams.get('dex');
  const pMode = urlParams.get('mode');
  const pShiny = urlParams.get('shiny');

  if (pGame && GAME_CONFIGS[pGame]) {
    currentGameKey = pGame;
    saveSelectedGame(currentGameKey);
    currentDexId = pDex || loadSelectedDex(currentGameKey) || null;
    currentDexConfig = resolveDexConfig(currentGameKey, currentDexId);
    if (currentDexConfig) currentDexId = currentDexConfig.id;
  }
  if (pMode === 'regional' || pMode === 'national') {
    currentDexMode = pMode;
    saveDexMode(currentDexMode);
  }
  if (pShiny === 'true') {
    setGlobalShiny(true);
  }

  currentEraKey = findGenEraForGame(currentGameKey);

  // Sync dexes for current game on startup (merges regional & national caught pokémon)
  syncGameDexes(GAME_CONFIGS[currentGameKey]);
  caughtSet = loadCaughtSet(currentDexConfig);

  loadLocalDatabase(GAME_CONFIGS).then((importedCount) => {
    if (importedCount) {
      syncGameDexes(GAME_CONFIGS[currentGameKey]);
      caughtSet = loadCaughtSet(currentDexConfig);
    }
    setupEventListeners();
    updateQuickFilterPillsUI();
    refreshUI();
    checkSharedUrl();
  });


  window.addEventListener('hashchange', checkSharedUrl);
}

// Service Worker Registration for PWA Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('[ServiceWorker] Registrado:', reg.scope);
    }).catch((err) => {
      console.warn('[ServiceWorker] Error:', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
