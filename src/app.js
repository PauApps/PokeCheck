import { POKEMON_DATA } from './data/pokemonData.js';
import { GAME_CONFIGS } from './data/gameConfigs.js';
import {
  loadSelectedGame, saveSelectedGame,
  loadDexMode, saveDexMode,
  loadCaughtSet, saveCaughtSet,
  generateExportJSON, downloadExportJSONFile,
  generateGlobalJSON, downloadDatabaseFile, importJSONData, loadLocalDatabase
} from './services/storageService.js';
import { initTheme, toggleTheme, toggleGlobalShiny, isGlobalShiny } from './ui/themeUI.js';
import { updateStats } from './ui/statsUI.js';
import { findGenEraForGame, renderGenEraSelector, populateGameSelectorForEra, showToast, initCollapsibleCategories } from './ui/filterUI.js';
import { renderGrid } from './ui/gridUI.js';
import { openModal, navigateModal, closeModal, toggleModalShiny } from './ui/modalUI.js';
import { generateShareUrl, shareProgress, decodeShareState } from './services/shareService.js';

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
const sharedBanner = document.getElementById('shared-banner');

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
const exportGameBtn = document.getElementById('export-game-btn');
const exportGlobalBtn = document.getElementById('export-global-btn');
const importDataBtn = document.getElementById('import-data-btn');
const shareProgressBtn = document.getElementById('share-progress-btn');
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

// Modal 1: Export Game
const exportGameModalOverlay = document.getElementById('export-game-modal-overlay');
const exportGameModalCloseBtn = document.getElementById('export-game-modal-close-btn');
const exportGameModalTitle = document.getElementById('export-game-modal-title');
const jsonGameExportCode = document.getElementById('json-game-export-code');
const copyGameJsonBtn = document.getElementById('copy-game-json-btn');
const downloadGameJsonBtn = document.getElementById('download-game-json-btn');

// Modal 2: Export Global
const exportGlobalModalOverlay = document.getElementById('export-global-modal-overlay');
const exportGlobalModalCloseBtn = document.getElementById('export-global-modal-close-btn');
const jsonGlobalExportCode = document.getElementById('json-global-export-code');
const copyGlobalJsonBtn = document.getElementById('copy-global-json-btn');
const downloadGlobalJsonBtn = document.getElementById('download-global-json-btn');

// Modal 3: Universal Import
const importModalOverlay = document.getElementById('import-modal-overlay');
const importModalCloseBtn = document.getElementById('import-modal-close-btn');
const importFileInput = document.getElementById('import-file-input');
const importJsonTextarea = document.getElementById('import-json-textarea');
const applyImportJsonBtn = document.getElementById('apply-import-json-btn');

// Modal 4: Share URL Modal
const shareModalOverlay = document.getElementById('share-modal-overlay');
const shareModalCloseBtn = document.getElementById('share-modal-close-btn');
const shareUrlInput = document.getElementById('share-url-input');
const copyShareUrlBtn = document.getElementById('copy-share-url-btn');
const shareModalSubtitle = document.getElementById('share-modal-subtitle');

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

  function copyTextHelper(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(toastEl, toastMsg, successMsg);
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
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        showToast(toastEl, toastMsg, successMsg);
      } else {
        showToast(toastEl, toastMsg, '❌ No se pudo copiar automáticamente.');
      }
    } catch (e) {
      console.error('Fallback copy failed:', e);
      showToast(toastEl, toastMsg, '❌ Error al copiar texto.');
    }
  }

  // 1. Exportar Juego Activo Modal Logic
  if (exportGameBtn) {
    exportGameBtn.addEventListener('click', () => {
      try {
        const gConfig = GAME_CONFIGS[currentGameKey];
        const jsonObj = generateExportJSON(gConfig, getActivePokedexList(), caughtSet);
        if (exportGameModalTitle) exportGameModalTitle.textContent = `📄 Exportar JSON — ${gConfig.name}`;
        if (jsonGameExportCode) jsonGameExportCode.textContent = JSON.stringify(jsonObj, null, 2);
        if (exportGameModalOverlay) exportGameModalOverlay.classList.add('active');
      } catch (err) {
        console.error('Error generating game JSON:', err);
        showToast(toastEl, toastMsg, '❌ Error al generar el JSON del juego.');
      }
    });
  }

  if (exportGameModalCloseBtn) {
    exportGameModalCloseBtn.addEventListener('click', () => {
      if (exportGameModalOverlay) exportGameModalOverlay.classList.remove('active');
    });
  }

  if (copyGameJsonBtn) {
    copyGameJsonBtn.addEventListener('click', () => {
      try {
        const gConfig = GAME_CONFIGS[currentGameKey];
        const jsonObj = generateExportJSON(gConfig, getActivePokedexList(), caughtSet);
        copyTextHelper(JSON.stringify(jsonObj, null, 2), '📋 JSON del juego activo copiado al portapapeles.');
      } catch (err) {
        console.error('Error copying game JSON:', err);
        showToast(toastEl, toastMsg, '❌ Error al copiar el JSON.');
      }
    });
  }

  if (downloadGameJsonBtn) {
    downloadGameJsonBtn.addEventListener('click', () => {
      try {
        const gConfig = GAME_CONFIGS[currentGameKey];
        const jsonObj = generateExportJSON(gConfig, getActivePokedexList(), caughtSet);
        downloadExportJSONFile(jsonObj);
        showToast(toastEl, toastMsg, '💾 Archivo JSON del juego descargado.');
      } catch (err) {
        console.error('Error downloading game JSON:', err);
        showToast(toastEl, toastMsg, '❌ Error al descargar el JSON.');
      }
    });
  }

  // 2. Exportar Backup Global Modal Logic
  if (exportGlobalBtn) {
    exportGlobalBtn.addEventListener('click', () => {
      try {
        const jsonObj = generateGlobalJSON(GAME_CONFIGS);
        if (jsonGlobalExportCode) jsonGlobalExportCode.textContent = JSON.stringify(jsonObj, null, 2);
        if (exportGlobalModalOverlay) exportGlobalModalOverlay.classList.add('active');
      } catch (err) {
        console.error('Error generating global JSON:', err);
        showToast(toastEl, toastMsg, '❌ Error al generar el backup global.');
      }
    });
  }

  if (exportGlobalModalCloseBtn) {
    exportGlobalModalCloseBtn.addEventListener('click', () => {
      if (exportGlobalModalOverlay) exportGlobalModalOverlay.classList.remove('active');
    });
  }

  if (copyGlobalJsonBtn) {
    copyGlobalJsonBtn.addEventListener('click', () => {
      try {
        const jsonObj = generateGlobalJSON(GAME_CONFIGS);
        copyTextHelper(JSON.stringify(jsonObj, null, 2), '📋 Backup Global JSON copiado al portapapeles.');
      } catch (err) {
        console.error('Error copying global JSON:', err);
        showToast(toastEl, toastMsg, '❌ Error al copiar el backup global.');
      }
    });
  }

  if (downloadGlobalJsonBtn) {
    downloadGlobalJsonBtn.addEventListener('click', () => {
      try {
        downloadDatabaseFile(GAME_CONFIGS);
        showToast(toastEl, toastMsg, '💾 Archivo pokedex_db.json descargado.');
      } catch (err) {
        console.error('Error downloading db:', err);
        showToast(toastEl, toastMsg, '❌ Error al descargar pokedex_db.json.');
      }
    });
  }

  // 3. Importar Datos Universal Modal Logic (Archivo o Texto JSON)
  if (importDataBtn) {
    importDataBtn.addEventListener('click', () => {
      if (importJsonTextarea) importJsonTextarea.value = '';
      if (importModalOverlay) importModalOverlay.classList.add('active');
    });
  }

  if (importModalCloseBtn) {
    importModalCloseBtn.addEventListener('click', () => {
      if (importModalOverlay) importModalOverlay.classList.remove('active');
    });
  }

  function processJSONImport(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      const res = importJSONData(parsed, GAME_CONFIGS, currentGameKey);
      if (res.success) {
        caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);
        if (importModalOverlay) importModalOverlay.classList.remove('active');
        const modeText = res.mode === 'global' ? 'Backup Global' : `Edición (${res.gameName || 'Activa'})`;
        showToast(toastEl, toastMsg, `📥 ${modeText} importado: +${res.count} Pokémon integrados.`);
        refreshUI();
      } else {
        alert(res.message || 'El JSON proporcionado no contiene un formato de datos reconocido.');
      }
    } catch (err) {
      alert('Error al procesar el código JSON. Verifica que sea un JSON válido: ' + err.message);
    }
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
        alert('Por favor, pega un código JSON válido en el campo de texto antes de aplicar.');
        return;
      }
      processJSONImport(text);
    });
  }

  // Share Progress URL Logic (Displays clean link modal on desktop and mobile)
  const handleShareAction = (e) => {
    if (e && e.target && e.target.blur) e.target.blur();
    try {
      const activeList = getActivePokedexList();
      const shareUrl = generateShareUrl(currentGameKey, currentDexMode, activeList, caughtSet);
      const gConfig = GAME_CONFIGS[currentGameKey];
      const count = activeList.filter(p => caughtSet.has(p.nationalNum)).length;
      const pct = activeList.length > 0 ? ((count / activeList.length) * 100).toFixed(1) : '0';

      if (shareUrlInput) shareUrlInput.value = shareUrl;
      if (shareModalSubtitle) {
        shareModalSubtitle.textContent = `Progreso actual: ${count} / ${activeList.length} capturados (${pct}%) en ${gConfig ? gConfig.name : 'tu Pokédex'}.`;
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
      showToast(toastEl, toastMsg, '❌ Error al generar el enlace de compartir.');
    }
  };

  if (shareProgressBtn) shareProgressBtn.addEventListener('click', handleShareAction);

  if (copyShareUrlBtn) {
    copyShareUrlBtn.addEventListener('click', async () => {
      try {
        if (shareUrlInput) {
          await navigator.clipboard.writeText(shareUrlInput.value);
          shareUrlInput.select();
        }
        showToast(toastEl, toastMsg, '📋 Enlace de progreso copiado al portapapeles.');
      } catch (err) {
        console.error('Error copying share URL:', err);
        showToast(toastEl, toastMsg, '❌ Error al copiar el enlace.');
      }
    });
  }

  if (shareModalCloseBtn) {
    shareModalCloseBtn.addEventListener('click', () => {
      if (shareModalOverlay) shareModalOverlay.classList.remove('active');
    });
  }

  // Cerrar modales al hacer clic fuera del contenedor
  [exportGameModalOverlay, exportGlobalModalOverlay, importModalOverlay, shareModalOverlay].forEach(overlay => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    }
  });

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
        if (shareModalOverlay && shareModalOverlay.classList.contains('active')) {
          shareModalOverlay.classList.remove('active');
        }
        if (exportGameModalOverlay && exportGameModalOverlay.classList.contains('active')) {
          exportGameModalOverlay.classList.remove('active');
        }
        if (exportGlobalModalOverlay && exportGlobalModalOverlay.classList.contains('active')) {
          exportGlobalModalOverlay.classList.remove('active');
        }
        if (importModalOverlay && importModalOverlay.classList.contains('active')) {
          importModalOverlay.classList.remove('active');
        }
        if (modalElements.modalOverlay && modalElements.modalOverlay.classList.contains('active')) {
          closeModal(modalElements);
        }
      }
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
    if (!gConfig) return [];
    if (mode === 'regional') {
      return gConfig.regionalIds.map((natId, idx) => ({
        displayId: String(idx + 1).padStart(3, '0'),
        nationalNum: natId
      }));
    } else {
      const list = [];
      for (let i = 1; i <= gConfig.nationalMaxId; i++) {
        list.push({ displayId: String(i).padStart(3, '0'), nationalNum: i });
      }
      return list;
    }
  });

  if (decoded && sharedBanner) {
    const gConfig = GAME_CONFIGS[decoded.gameKey];
    const pct = decoded.total > 0 ? ((decoded.count / decoded.total) * 100).toFixed(1) : '0';

    // Switch game, dexMode, and caughtSet to match the shared link
    currentGameKey = decoded.gameKey;
    currentDexMode = decoded.dexMode;
    caughtSet = decoded.caughtSet;

    // Sync dropdown selectors
    const eraKey = findGenEraForGame(currentGameKey);
    populateGameSelectorForEra(eraKey, genEraSelector, gameSelector, currentGameKey);
    if (dexModeSelector) dexModeSelector.value = currentDexMode;

    // Render shared banner
    sharedBanner.innerHTML = `
      <div class="shared-banner-info">
        <span class="shared-banner-icon">👀</span>
        <div>
          <strong>Viendo progreso compartido:</strong> ${decoded.count} / ${decoded.total} (${pct}%) en <em>${gConfig ? gConfig.name : decoded.gameKey}</em>.
        </div>
      </div>
      <div class="shared-banner-actions">
        <button class="btn btn-accent" id="import-shared-btn">📥 Guardar en mi Pokédex</button>
        <button class="btn" id="close-shared-banner-btn">&times; Cerrar vista previa</button>
      </div>
    `;
    sharedBanner.style.display = 'flex';

    // Immediately refresh UI to display the 22 shared Pokémon as CAPTURADOS on grid & header stats!
    refreshUI();

    const importSharedBtn = sharedBanner.querySelector('#import-shared-btn');
    const closeSharedBannerBtn = sharedBanner.querySelector('#close-shared-banner-btn');

    if (importSharedBtn) {
      importSharedBtn.addEventListener('click', () => {
        saveSelectedGame(currentGameKey);
        saveDexMode(currentDexMode);
        saveCaughtSet(GAME_CONFIGS[currentGameKey], caughtSet);

        window.location.hash = '';
        sharedBanner.style.display = 'none';
        showToast(toastEl, toastMsg, `✓ Progreso de ${gConfig ? gConfig.name : 'este juego'} guardado en tu Pokédex.`);
        refreshUI();
      });
    }

    if (closeSharedBannerBtn) {
      closeSharedBannerBtn.addEventListener('click', () => {
        // Restore user's own saved game & caughtSet
        currentGameKey = loadSelectedGame();
        currentDexMode = loadDexMode();
        caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);

        const restoredEraKey = findGenEraForGame(currentGameKey);
        populateGameSelectorForEra(restoredEraKey, genEraSelector, gameSelector, currentGameKey);
        if (dexModeSelector) dexModeSelector.value = currentDexMode;

        window.location.hash = '';
        sharedBanner.style.display = 'none';
        refreshUI();
      });
    }
  }
}

// App Initialization
function init() {
  initTheme(themeToggleBtn);
  initCollapsibleCategories();
  renderGenEraSelector(genEraSelector);
  const eraKey = findGenEraForGame(currentGameKey);
  populateGameSelectorForEra(eraKey, genEraSelector, gameSelector, currentGameKey);
  dexModeSelector.value = currentDexMode;

  loadLocalDatabase(GAME_CONFIGS).then((importedCount) => {
    if (importedCount) {
      caughtSet = loadCaughtSet(GAME_CONFIGS[currentGameKey]);
    }
    setupEventListeners();
    refreshUI();
    checkSharedUrl();
  });

  window.addEventListener('hashchange', checkSharedUrl);
}

// Register PWA Service Worker for offline support and installability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('[ServiceWorker] Registrado con éxito en scope:', reg.scope);
    }).catch((err) => {
      console.warn('[ServiceWorker] Error en el registro:', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);

