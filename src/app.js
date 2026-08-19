import { POKEMON_DATA } from './data/pokemonData.js';
import { GAME_CONFIGS } from './data/gameConfigs.js';
import {
  loadSelectedGame, saveSelectedGame,
  loadDexMode, saveDexMode,
  loadCaughtSet, saveCaughtSet,
  generateExportJSON, downloadExportJSONFile,
  downloadDatabaseFile, loadLocalDatabase
} from './services/storageService.js';
import { initTheme, toggleTheme, toggleGlobalShiny, isGlobalShiny } from './ui/themeUI.js';
import { updateStats } from './ui/statsUI.js';
import { findGenEraForGame, populateGameSelectorForEra, showToast, initCollapsibleCategories } from './ui/filterUI.js';
import { renderGrid } from './ui/gridUI.js';
import { openModal, navigateModal, closeModal, toggleModalShiny } from './ui/modalUI.js';

// Application State
let currentGameKey = loadSelectedGame();
let currentDexMode = loadDexMode();
let caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);

// DOM Elements
const genEraSelector = document.getElementById('gen-era-selector');
const gameSelector = document.getElementById('game-selector');
const dexModeSelector = document.getElementById('dex-mode-selector');
const headerSubtitle = document.getElementById('header-subtitle');
const gridEl = document.getElementById('pokedex-grid');

const searchInput = document.getElementById('search-input');
const statusFilter = document.getElementById('status-filter');
const genFilter = document.getElementById('gen-filter');
const typeFilter = document.getElementById('type-filter');

const statsElements = {
  caughtCountEl: document.getElementById('caught-count'),
  completionPercentageEl: document.getElementById('completion-percentage'),
  progressFillEl: document.getElementById('progress-fill'),
  badgeItemEl: document.getElementById('badge-item'),
  milestoneBadgeEl: document.getElementById('milestone-badge'),
  badgeLabelEl: document.getElementById('badge-label')
};

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const globalShinyBtn = document.getElementById('global-shiny-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const saveDbBtn = document.getElementById('save-db-btn');
const importDbFile = document.getElementById('import-db-file');
const bulkToggleBtn = document.getElementById('bulk-toggle-btn');
const resetBtn = document.getElementById('reset-btn');

const toastEl = document.getElementById('toast-notification');
const toastMsg = document.getElementById('toast-message');

// Modal Elements
const modalElements = {
  modalOverlay: document.getElementById('modal-overlay'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalPrevBtn: document.getElementById('modal-prev-btn'),
  modalNextBtn: document.getElementById('modal-next-btn'),
  modalPrevLabel: document.getElementById('modal-prev-label'),
  modalNextLabel: document.getElementById('modal-next-label'),
  modalSprite: document.getElementById('modal-sprite'),
  modalId: document.getElementById('modal-id'),
  modalName: document.getElementById('modal-name'),
  modalTypes: document.getElementById('modal-types'),
  modalBodyContent: document.getElementById('modal-body-content'),
  shinyToggleBtn: document.getElementById('shiny-toggle-btn')
};

const exportModalOverlay = document.getElementById('export-modal-overlay');
const exportModalCloseBtn = document.getElementById('export-modal-close-btn');
const jsonExportCode = document.getElementById('json-export-code');
const downloadJsonBtn = document.getElementById('download-json-btn');
const copyAgainBtn = document.getElementById('copy-again-btn');

function padId(id) {
  return String(id).padStart(3, '0');
}

function updateHeaderTitle() {
  const gConfig = GAME_CONFIGS[currentGameKey];
  const modeText = currentDexMode === 'regional' ? `Pokédex Regional (${gConfig.regionName || gConfig.regionalDexName})` : `Pokédex Nacional (1-${gConfig.nationalMaxId})`;
  if (headerSubtitle) {
    headerSubtitle.textContent = `${gConfig.name} — ${modeText} — mypokelog.app`;
  }
}

function getActivePokedexList() {
  const gConfig = GAME_CONFIGS[currentGameKey];
  if (currentDexMode === 'regional') {
    return gConfig.regionalIds.map((natId, idx) => {
      const p = POKEMON_DATA.find(item => item.id === natId);
      return {
        displayId: padId(idx + 1),
        nationalNum: natId,
        name: p ? p.name : `Pokémon #${natId}`,
        type1: p ? p.type1 : 'Normal',
        type2: p ? p.type2 : null
      };
    });
  } else {
    const list = [];
    for (let i = 1; i <= gConfig.nationalMaxId; i++) {
      const p = POKEMON_DATA.find(item => item.id === i);
      list.push({
        displayId: padId(i),
        nationalNum: i,
        name: p ? p.name : `Pokémon #${i}`,
        type1: p ? p.type1 : 'Normal',
        type2: p ? p.type2 : null
      });
    }
    return list;
  }
}

function refreshUI() {
  updateHeaderTitle();
  const activeList = getActivePokedexList();
  updateStats(activeList, caughtSet, statsElements);
  
  renderGrid({
    gridEl,
    activeList,
    caughtSet,
    filters: {
      query: searchInput.value,
      status: statusFilter.value,
      genVal: genFilter ? genFilter.value : 'all',
      type: typeFilter.value
    },
    currentDexMode,
    onToggleCaught: handleToggleCaught,
    onOpenModal: handleOpenModal
  });
}

function handleToggleCaught(id, isChecked) {
  const p = POKEMON_DATA.find(item => item.id === id);
  if (isChecked) {
    caughtSet.add(id);
    showToast(toastEl, toastMsg, `✓ Capturado: ${p ? p.name : '#' + id}`);
  } else {
    caughtSet.delete(id);
    showToast(toastEl, toastMsg, `⏳ Registrado como pendiente: ${p ? p.name : '#' + id}`);
  }
  saveCaughtSet(GAME_CONFIGS[currentGameKey], caughtSet);
  refreshUI();
}

function handleOpenModal(id) {
  openModal(id, {
    activeList: getActivePokedexList(),
    caughtSet,
    gameConfig: GAME_CONFIGS[currentGameKey],
    modalElements,
    onToggleCaught: handleToggleCaught
  });
}

function switchGame(newGameKey) {
  currentGameKey = newGameKey;
  saveSelectedGame(currentGameKey);
  caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);

  const eraKey = findGenEraForGame(currentGameKey);
  populateGameSelectorForEra(eraKey, genEraSelector, gameSelector, currentGameKey);
  dexModeSelector.value = currentDexMode;

  showToast(toastEl, toastMsg, `🎮 Juego cambiado a: ${GAME_CONFIGS[currentGameKey].name}`);
  refreshUI();
}

function switchDexMode(newMode) {
  currentDexMode = newMode;
  saveDexMode(currentDexMode);
  showToast(toastEl, toastMsg, `📍 Modo cambiado a Pokédex ${currentDexMode === 'regional' ? 'Regional' : 'Nacional'}`);
  refreshUI();
}

// Event Listeners Registration
function setupEventListeners() {
  if (genEraSelector) {
    genEraSelector.addEventListener('change', (e) => {
      const eraKey = e.target.value;
      populateGameSelectorForEra(eraKey, genEraSelector, gameSelector);
      if (gameSelector.options.length > 0) {
        switchGame(gameSelector.options[0].value);
      }
    });
  }

  if (gameSelector) {
    gameSelector.addEventListener('change', (e) => {
      switchGame(e.target.value);
    });
  }

  if (dexModeSelector) {
    dexModeSelector.addEventListener('change', (e) => {
      switchDexMode(e.target.value);
    });
  }

  [searchInput, statusFilter, genFilter, typeFilter].forEach(el => {
    if (el) {
      el.addEventListener('input', refreshUI);
      el.addEventListener('change', refreshUI);
    }
  });

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      toggleTheme(themeToggleBtn);
    });
  }

  if (globalShinyBtn) {
    globalShinyBtn.addEventListener('click', () => {
      toggleGlobalShiny(globalShinyBtn, () => {
        const active = isGlobalShiny();
        showToast(toastEl, toastMsg, active ? '✨ Sprites Shiny Activados' : '🖼️ Sprites Normales Activados');
        refreshUI();
      });
    });
  }

  if (bulkToggleBtn) {
    bulkToggleBtn.addEventListener('click', () => {
      const activeList = getActivePokedexList();
      const query = searchInput.value.trim().toLowerCase();
      const status = statusFilter.value;
      const genVal = genFilter ? genFilter.value : 'all';
      const type = typeFilter.value;

      const visible = activeList.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query) || p.displayId.includes(query);
        const isCaught = caughtSet.has(p.nationalNum);
        const matchesStatus = (status === 'all') || (status === 'caught' && isCaught) || (status === 'missing' && !isCaught);
        const matchesGen = genVal === 'all' || (genVal && p.nationalNum);
        const matchesType = (type === 'all') || (p.type1 === type || p.type2 === type);
        return matchesQuery && matchesStatus && matchesGen && matchesType;
      });

      const allVisibleCaught = visible.every(p => caughtSet.has(p.nationalNum));

      visible.forEach(p => {
        if (allVisibleCaught) {
          caughtSet.delete(p.nationalNum);
        } else {
          caughtSet.add(p.nationalNum);
        }
      });

      saveCaughtSet(GAME_CONFIGS[currentGameKey], caughtSet);
      showToast(toastEl, toastMsg, allVisibleCaught ? '⏳ Pokémon visibles desmarcados' : '✓ Pokémon visibles marcados como capturados');
      refreshUI();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const gName = GAME_CONFIGS[currentGameKey].name;
      if (confirm(`¿Estás seguro de que deseas reiniciar todo el progreso registrado para "${gName}"? Esta acción no se puede deshacer.`)) {
        caughtSet.clear();
        saveCaughtSet(GAME_CONFIGS[currentGameKey], caughtSet);
        showToast(toastEl, toastMsg, `🔄 Progreso de ${gName} reiniciado.`);
        refreshUI();
      }
    });
  }

  // Export JSON Modal
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const jsonObj = generateExportJSON(GAME_CONFIGS[currentGameKey], getActivePokedexList(), caughtSet);
      if (jsonExportCode) jsonExportCode.textContent = JSON.stringify(jsonObj, null, 2);
      if (exportModalOverlay) exportModalOverlay.classList.add('active');
    });
  }

  if (exportModalCloseBtn) {
    exportModalCloseBtn.addEventListener('click', () => {
      if (exportModalOverlay) exportModalOverlay.classList.remove('active');
    });
  }

  if (downloadJsonBtn) {
    downloadJsonBtn.addEventListener('click', () => {
      const jsonObj = generateExportJSON(GAME_CONFIGS[currentGameKey], getActivePokedexList(), caughtSet);
      downloadExportJSONFile(jsonObj);
      showToast(toastEl, toastMsg, '💾 Archivo JSON exportado con éxito.');
    });
  }

  if (copyAgainBtn) {
    copyAgainBtn.addEventListener('click', () => {
      const jsonObj = generateExportJSON(GAME_CONFIGS[currentGameKey], getActivePokedexList(), caughtSet);
      navigator.clipboard.writeText(JSON.stringify(jsonObj, null, 2));
      showToast(toastEl, toastMsg, '📋 JSON copiado al portapapeles.');
    });
  }

  // Save / Import DB File
  if (saveDbBtn) {
    saveDbBtn.addEventListener('click', () => {
      downloadDatabaseFile(GAME_CONFIGS);
      showToast(toastEl, toastMsg, '💾 Archivo pokedex_db.json descargado.');
    });
  }

  if (importDbFile) {
    importDbFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data && data.games) {
            let count = 0;
            Object.keys(data.games).forEach(gKey => {
              if (GAME_CONFIGS[gKey]) {
                const sKey = GAME_CONFIGS[gKey].storageKey;
                const existing = new Set(JSON.parse(localStorage.getItem(sKey) || '[]'));
                const incoming = data.games[gKey] || [];
                incoming.forEach(id => {
                  if (!existing.has(id)) {
                    existing.add(id);
                    count++;
                  }
                });
                localStorage.setItem(sKey, JSON.stringify(Array.from(existing)));
              }
            });
            caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);
            showToast(toastEl, toastMsg, `📂 BBDD Importada: +${count} Pokémon nuevos integrados.`);
            refreshUI();
          } else {
            alert('El archivo JSON seleccionado no tiene un formato válido de base de datos MyPokeLog.');
          }
        } catch (err) {
          alert('Error al leer el archivo JSON de base de datos: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  // Modal event listeners
  if (modalElements.modalCloseBtn) {
    modalElements.modalCloseBtn.addEventListener('click', () => closeModal(modalElements));
  }
  if (modalElements.modalOverlay) {
    modalElements.modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalElements.modalOverlay) closeModal(modalElements);
    });
  }
  if (modalElements.modalPrevBtn) {
    modalElements.modalPrevBtn.addEventListener('click', () => navigateModal(-1, {
      activeList: getActivePokedexList(),
      caughtSet,
      gameConfig: GAME_CONFIGS[currentGameKey],
      modalElements,
      onToggleCaught: handleToggleCaught
    }));
  }
  if (modalElements.modalNextBtn) {
    modalElements.modalNextBtn.addEventListener('click', () => navigateModal(1, {
      activeList: getActivePokedexList(),
      caughtSet,
      gameConfig: GAME_CONFIGS[currentGameKey],
      modalElements,
      onToggleCaught: handleToggleCaught
    }));
  }
  if (modalElements.shinyToggleBtn) {
    modalElements.shinyToggleBtn.addEventListener('click', () => {
      const isShinyNow = toggleModalShiny(modalElements.modalSprite);
      modalElements.shinyToggleBtn.classList.toggle('active', isShinyNow);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (modalElements.modalOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        navigateModal(-1, {
          activeList: getActivePokedexList(),
          caughtSet,
          gameConfig: GAME_CONFIGS[currentGameKey],
          modalElements,
          onToggleCaught: handleToggleCaught
        });
      } else if (e.key === 'ArrowRight') {
        navigateModal(1, {
          activeList: getActivePokedexList(),
          caughtSet,
          gameConfig: GAME_CONFIGS[currentGameKey],
          modalElements,
          onToggleCaught: handleToggleCaught
        });
      } else if (e.key === 'Escape') {
        closeModal(modalElements);
      }
    }
  });
}

// App Initialization
function init() {
  initTheme(themeToggleBtn);
  initCollapsibleCategories();
  const eraKey = findGenEraForGame(currentGameKey);
  populateGameSelectorForEra(eraKey, genEraSelector, gameSelector, currentGameKey);
  dexModeSelector.value = currentDexMode;

  loadLocalDatabase(GAME_CONFIGS).then((importedCount) => {
    if (importedCount) {
      caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);
    }
    setupEventListeners();
    refreshUI();
  });
}

document.addEventListener('DOMContentLoaded', init);
