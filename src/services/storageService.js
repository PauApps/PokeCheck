/**
 * Storage & Database Persistence Service for MyPokeLog
 */

function isStorageAvailable() {
  return typeof localStorage !== 'undefined';
}

const LEGACY_GAME_KEY_MAP = {
  'gen3_leafgreen': 'gen1_leafgreen',
  'gen7_letsgo': 'gen1_letsgo',
  'gen4_johto_updated': 'gen2_hgss',
  'gen6_hoenn_updated': 'gen3_roza',
  'gen8_hisui': 'special_hisui',
  'gen_legends_za': 'special_legends_za',
  'gen_pokopia': 'special_pokopia'
};

const LEGACY_STORAGE_MAP = {
  'pokedex_caught_gen1_leafgreen': 'pokedex_caught_gen3_kanto',
  'pokedex_caught_gen1_letsgo': 'pokedex_caught_gen7_letsgo',
  'pokedex_caught_gen2_hgss': 'pokedex_caught_gen4_hgss',
  'pokedex_caught_gen3_roza': 'pokedex_caught_gen6_roza',
  'pokedex_caught_special_hisui': 'pokedex_caught_gen8_hisui',
  'pokedex_caught_special_legends_za': 'pokedex_caught_legends_za',
  'pokedex_caught_special_pokopia': 'pokedex_caught_pokopia'
};

export function loadSelectedGame() {
  if (!isStorageAvailable()) return 'gen9_paldea';
  const saved = localStorage.getItem('pokedex_selected_game') || 'gen9_paldea';
  const updated = LEGACY_GAME_KEY_MAP[saved] || saved;
  if (updated !== saved) {
    saveSelectedGame(updated);
  }
  return updated;
}

export function saveSelectedGame(gameKey) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_selected_game', gameKey);
}

export function loadDexMode() {
  if (!isStorageAvailable()) return 'regional';
  return localStorage.getItem('pokedex_dex_mode') || 'regional';
}

export function saveDexMode(mode) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_dex_mode', mode);
}

export function loadTheme() {
  if (!isStorageAvailable()) return 'dark';
  return localStorage.getItem('pokedex_theme') || 'dark';
}

export function saveTheme(theme) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_theme', theme);
}

export function isGameComplete(gameConfig) {
  if (!gameConfig || !gameConfig.storageKey || !isStorageAvailable()) return false;
  const raw = localStorage.getItem(gameConfig.storageKey) || '[]';
  try {
    const caughtSet = new Set(JSON.parse(raw));
    if (!gameConfig.regionalIds || gameConfig.regionalIds.length === 0) return false;
    return gameConfig.regionalIds.every(id => caughtSet.has(id));
  } catch (e) {
    return false;
  }
}

export function loadCaughtSet(gameConfig) {
  if (!gameConfig || !gameConfig.storageKey || !isStorageAvailable()) return new Set();
  let raw = localStorage.getItem(gameConfig.storageKey);

  // Auto-migrate legacy key if exists
  if (!raw && LEGACY_STORAGE_MAP[gameConfig.storageKey]) {
    const legacyKey = LEGACY_STORAGE_MAP[gameConfig.storageKey];
    raw = localStorage.getItem(legacyKey);
    if (raw) {
      localStorage.setItem(gameConfig.storageKey, raw);
    }
  }

  try {
    return new Set(JSON.parse(raw || '[]'));
  } catch (e) {
    console.error('Error parsing caught set from LocalStorage:', e);
    return new Set();
  }
}

export function saveCaughtSet(gameConfig, caughtSet) {
  if (!gameConfig || !gameConfig.storageKey || !isStorageAvailable()) return;
  localStorage.setItem(gameConfig.storageKey, JSON.stringify(Array.from(caughtSet)));
}

export function generateExportJSON(gameConfig, activeList, caughtSet) {
  const total = activeList.length;
  let count = 0;
  activeList.forEach(p => {
    if (caughtSet.has(p.nationalNum)) count++;
  });
  const missingCount = total - count;
  const pct = total > 0 ? ((count / total) * 100).toFixed(2) : '0';

  const capturedList = [];
  const missingList = [];

  activeList.forEach(p => {
    const itemData = {
      regional_num: p.displayId,
      national_num: p.nationalNum,
      name: p.name,
      types: [p.type1, p.type2].filter(Boolean)
    };
    if (caughtSet.has(p.nationalNum)) {
      capturedList.push(itemData);
    } else {
      missingList.push(itemData);
    }
  });

  return {
    meta: {
      app: "MyPokeLog",
      url: "https://mypokelog.app",
      game_key: gameConfig.storageKey ? gameConfig.storageKey.replace('pokedex_caught_', '') : 'unknown',
      game_name: gameConfig.name,
      regional_dex_name: gameConfig.regionalDexName,
      timestamp: new Date().toISOString(),
      summary: {
        total_pokedex: total,
        captured_count: count,
        missing_count: missingCount,
        completion_percentage: `${pct}%`
      }
    },
    captured_pokemon: capturedList,
    missing_pokemon: missingList
  };
}

export function downloadExportJSONFile(jsonObj) {
  if (typeof document === 'undefined') return;
  const jsonStr = JSON.stringify(jsonObj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = `mypokelog_${jsonObj.meta ? jsonObj.meta.game_key : 'export'}_export.json`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}

export function generateGlobalJSON(GAME_CONFIGS) {
  if (!isStorageAvailable()) return { meta: {}, games: {} };
  const gamesData = {};
  let totalCapturedAll = 0;
  Object.keys(GAME_CONFIGS).forEach(gKey => {
    const sKey = GAME_CONFIGS[gKey].storageKey;
    const cList = JSON.parse(localStorage.getItem(sKey) || '[]');
    gamesData[gKey] = cList;
    totalCapturedAll += cList.length;
  });

  return {
    meta: {
      app: "MyPokeLog Global Database Backup",
      version: "2.0",
      timestamp: new Date().toISOString(),
      url: "https://mypokelog.app",
      total_games_tracked: Object.keys(GAME_CONFIGS).length,
      total_captured_across_all_games: totalCapturedAll
    },
    games: gamesData
  };
}

export function downloadDatabaseFile(GAME_CONFIGS) {
  if (typeof document === 'undefined' || !isStorageAvailable()) return;
  const dbData = generateGlobalJSON(GAME_CONFIGS);

  const blob = new Blob([JSON.stringify(dbData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pokedex_db.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importJSONData(data, GAME_CONFIGS, activeGameKey) {
  if (!isStorageAvailable() || !data) return { success: false, message: 'Datos JSON no válidos' };
  
  let totalImported = 0;

  // Case 1: Backup Global (contiene data.games o data.games_data)
  const gamesMap = data.games || data.games_data;
  if (gamesMap && typeof gamesMap === 'object') {
    Object.keys(gamesMap).forEach(gKey => {
      if (GAME_CONFIGS[gKey]) {
        const sKey = GAME_CONFIGS[gKey].storageKey;
        const existing = new Set(JSON.parse(localStorage.getItem(sKey) || '[]'));
        
        let incomingIds = [];
        if (Array.isArray(gamesMap[gKey])) {
          incomingIds = gamesMap[gKey];
        } else if (gamesMap[gKey] && Array.isArray(gamesMap[gKey].captured_ids)) {
          incomingIds = gamesMap[gKey].captured_ids;
        }

        incomingIds.forEach(id => {
          const numId = Number(id);
          if (numId && !existing.has(numId)) {
            existing.add(numId);
            totalImported++;
          }
        });

        localStorage.setItem(sKey, JSON.stringify(Array.from(existing)));
      }
    });
    return { success: true, count: totalImported, mode: 'global' };
  }

  // Case 2: Exportación de un solo juego/generación (contiene captured_pokemon, captured_ids o captured)
  let targetGameKey = activeGameKey;
  if (data.meta && data.meta.game_key) {
    const matchedKey = Object.keys(GAME_CONFIGS).find(k => GAME_CONFIGS[k].storageKey.includes(data.meta.game_key));
    if (matchedKey) targetGameKey = matchedKey;
  }

  const sKey = GAME_CONFIGS[targetGameKey] ? GAME_CONFIGS[targetGameKey].storageKey : null;
  if (sKey) {
    const existing = new Set(JSON.parse(localStorage.getItem(sKey) || '[]'));
    let incomingIds = [];

    if (Array.isArray(data.captured_pokemon)) {
      incomingIds = data.captured_pokemon.map(p => typeof p === 'object' ? (p.national_num || p.id) : p);
    } else if (Array.isArray(data.captured_ids)) {
      incomingIds = data.captured_ids;
    } else if (Array.isArray(data.captured)) {
      incomingIds = data.captured;
    } else if (Array.isArray(data)) {
      incomingIds = data;
    }

    incomingIds.forEach(id => {
      const numId = Number(id);
      if (numId && !existing.has(numId)) {
        existing.add(numId);
        totalImported++;
      }
    });

    localStorage.setItem(sKey, JSON.stringify(Array.from(existing)));
    return { success: true, count: totalImported, mode: 'single', gameName: GAME_CONFIGS[targetGameKey].name };
  }

  return { success: false, message: 'No se pudo identificar la edición ni las capturas en el archivo JSON.' };
}

export async function loadLocalDatabase(GAME_CONFIGS) {
  if (typeof fetch === 'undefined' || !isStorageAvailable()) return false;
  try {
    const res = await fetch('./pokedex_db.json');
    if (!res.ok) return false;
    const data = await res.json();
    if (data && data.games) {
      let importedCount = 0;
      Object.keys(data.games).forEach(gKey => {
        if (GAME_CONFIGS[gKey]) {
          const sKey = GAME_CONFIGS[gKey].storageKey;
          const existing = new Set(JSON.parse(localStorage.getItem(sKey) || '[]'));
          const incoming = data.games[gKey] || [];
          let added = false;
          incoming.forEach(id => {
            if (!existing.has(id)) {
              existing.add(id);
              added = true;
              importedCount++;
            }
          });
          if (added) {
            localStorage.setItem(sKey, JSON.stringify(Array.from(existing)));
          }
        }
      });
      return importedCount;
    }
  } catch (err) {
    console.warn('pokedex_db.json pre-load not available or failed:', err);
  }
  return false;
}
