/**
 * Storage & Database Persistence Service for MyPokeLog
 * Updated for multi-dex architecture (v3.0)
 */

import { DEX_REGISTRY } from '../data/dexRegistry.js';

function isStorageAvailable() {
  return typeof localStorage !== 'undefined';
}


// ============================================================
// Legacy game key migration (old gameKey → new gameKey)
// ============================================================
const LEGACY_GAME_KEY_MAP = {
  'gen3_leafgreen':      'gen1_leafgreen',
  'gen7_letsgo':         'gen1_letsgo',
  'gen4_johto_updated':  'gen2_hgss',
  'gen6_hoenn_updated':  'gen3_roza',
  'gen8_hisui':          'special_hisui',
  'gen_legends_za':      'special_legends_za',
  'gen_pokopia':         'special_pokopia'
};

// ============================================================
// Legacy storage key migration (old storageKey → new dex storageKey)
// Maps old pokedex_caught_* keys to the equivalent new dex_* key.
// Only the regional/main dex is migrated (not national, which was fake).
// ============================================================
const LEGACY_DEX_STORAGE_MAP = {
  'pokedex_caught_gen1_kanto':      'dex_gen1_rby_kanto',
  'pokedex_caught_gen1_leafgreen':  'dex_gen1_frlg_kanto',
  'pokedex_caught_gen1_letsgo':     'dex_gen1_letsgo_kanto',
  'pokedex_caught_gen2_johto':      'dex_gen2_gsc_johto',
  'pokedex_caught_gen2_hgss':       'dex_gen2_hgss_johto',
  'pokedex_caught_gen3_hoenn':      'dex_gen3_rse_hoenn',
  'pokedex_caught_gen3_roza':       'dex_gen3_oras_hoenn',
  'pokedex_caught_gen4_sinnoh':     'dex_gen4_dp_sinnoh',
  'pokedex_caught_gen4_platinum':   'dex_gen4_platinum_sinnoh',
  'pokedex_caught_gen5_unova':      'dex_gen5_bw_unova',
  'pokedex_caught_gen5_b2w2':       'dex_gen5_b2w2_unova',
  'pokedex_caught_gen6_kalos':      'dex_gen6_xy_central',
  'pokedex_caught_gen7_alola':      'dex_gen7_sm_alola',
  'pokedex_caught_gen7_ultra':      'dex_gen7_usum_alola',
  'pokedex_caught_gen8_galar':      'dex_gen8_swsh_galar',
  'pokedex_caught_gen8_armor':      'dex_gen8_armor_isle',
  'pokedex_caught_gen8_tundra':     'dex_gen8_tundra_crown',
  'pokedex_caught_gen9_paldea':     'dex_gen9_sv_paldea',
  'pokedex_caught_gen9_kitakami':   'dex_gen9_dlc1_kitakami',
  'pokedex_caught_gen9_blueberry':  'dex_gen9_dlc2_blueberry',
  'pokedex_caught_special_hisui':   'dex_special_hisui_main',
  'pokedex_caught_special_legends_za': 'dex_special_za_lumiose',
  'pokedex_caught_special_pokopia': 'dex_special_pokopia_main',
  // Also handle old variants from earlier refactors
  'pokedex_caught_gen3_kanto':      'dex_gen1_frlg_kanto',
  'pokedex_caught_gen7_letsgo':     'dex_gen1_letsgo_kanto',
  'pokedex_caught_gen4_hgss':       'dex_gen2_hgss_johto',
  'pokedex_caught_gen6_roza':       'dex_gen3_oras_hoenn',
  'pokedex_caught_gen8_hisui':      'dex_special_hisui_main',
  'pokedex_caught_legends_za':      'dex_special_za_lumiose',
  'pokedex_caught_pokopia':         'dex_special_pokopia_main',
};

/**
 * Run legacy migrations on first load.
 * Copies data from old keys to new keys without deleting old data.
 */
function runLegacyMigrations() {
  if (!isStorageAvailable()) return;
  Object.entries(LEGACY_DEX_STORAGE_MAP).forEach(([oldKey, newKey]) => {
    const oldData = localStorage.getItem(oldKey);
    const newData = localStorage.getItem(newKey);
    if (oldData && !newData) {
      localStorage.setItem(newKey, oldData);
    }
  });
}

// ============================================================
// Game selection persistence
// ============================================================

export function loadSelectedGame() {
  if (!isStorageAvailable()) return 'gen9_paldea';
  const saved = localStorage.getItem('pokedex_selected_game') || 'gen9_paldea';
  const updated = LEGACY_GAME_KEY_MAP[saved] || saved;
  if (updated !== saved) saveSelectedGame(updated);
  return updated;
}

export function saveSelectedGame(gameKey) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_selected_game', gameKey);
}

// ============================================================
// Dex selection persistence (per game)
// ============================================================

export function loadSelectedDex(gameKey) {
  if (!isStorageAvailable()) return null;
  return localStorage.getItem(`selected_dex_${gameKey}`) || null;
}

export function saveSelectedDex(gameKey, dexId) {
  if (isStorageAvailable()) localStorage.setItem(`selected_dex_${gameKey}`, dexId);
}

// ============================================================
// Theme
// ============================================================

export function loadTheme() {
  if (!isStorageAvailable()) return 'dark';
  return localStorage.getItem('pokedex_theme') || 'dark';
}

export function saveTheme(theme) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_theme', theme);
}

// ============================================================
// Caught Set — per dex (dexConfig = one entry from game.dexes[])
// ============================================================

export function loadCaughtSet(dexConfig) {
  if (!dexConfig || !dexConfig.storageKey || !isStorageAvailable()) return new Set();
  const raw = localStorage.getItem(dexConfig.storageKey);
  try {
    return new Set(JSON.parse(raw || '[]'));
  } catch (e) {
    console.error('Error parsing caught set:', e);
    return new Set();
  }
}

export function saveCaughtSet(dexConfig, caughtSet) {
  if (!dexConfig || !dexConfig.storageKey || !isStorageAvailable()) return;
  localStorage.setItem(dexConfig.storageKey, JSON.stringify(Array.from(caughtSet)));
}

/**
 * Synchronizes caught Pokémon across all Pokédexes belonging to the same game.
 * If a Pokémon is caught in one dex, it is also caught in all other dexes of that game that include it.
 */
export function syncGameDexes(gameConfig) {
  if (!gameConfig || !gameConfig.dexes || gameConfig.dexes.length <= 1 || !isStorageAvailable()) return;

  const allCaught = new Set();
  gameConfig.dexes.forEach(dex => {
    const set = loadCaughtSet(dex);
    set.forEach(id => allCaught.add(id));
  });

  gameConfig.dexes.forEach(dex => {
    const validIdsArr = DEX_REGISTRY[dex.dexKey] || [];
    const validIdsSet = new Set(validIdsArr);
    const currentSet = loadCaughtSet(dex);
    let changed = false;

    allCaught.forEach(id => {
      if (validIdsSet.has(id) && !currentSet.has(id)) {
        currentSet.add(id);
        changed = true;
      }
    });

    if (changed) {
      saveCaughtSet(dex, currentSet);
    }
  });
}

/**
 * Toggles a Pokémon's caught state across ALL Pokédexes of a game that include that Pokémon.
 */
export function togglePokemonInGame(gameConfig, nationalId, shouldBeCaught) {
  if (!gameConfig || !gameConfig.dexes || !isStorageAvailable()) return;

  gameConfig.dexes.forEach(dex => {
    const validIdsArr = DEX_REGISTRY[dex.dexKey] || [];
    if (validIdsArr.includes(nationalId)) {
      const set = loadCaughtSet(dex);
      if (shouldBeCaught) {
        set.add(nationalId);
      } else {
        set.delete(nationalId);
      }
      saveCaughtSet(dex, set);
    }
  });
}


// ============================================================
// Game completion check
// ============================================================

export function isGameComplete(gameConfig, allDexIds) {
  if (!gameConfig || !gameConfig.dexes || !isStorageAvailable()) return false;
  // A game is "complete" if every Pokémon in the first (regional) dex is caught
  const firstDex = gameConfig.dexes[0];
  if (!firstDex) return false;
  const dexIds = allDexIds || DEX_REGISTRY[firstDex.dexKey] || [];
  if (dexIds.length === 0) return false;
  const raw = localStorage.getItem(firstDex.storageKey) || '[]';
  try {
    const caughtSet = new Set(JSON.parse(raw));
    return dexIds.every(id => caughtSet.has(id));
  } catch (e) {
    return false;
  }
}

/**
 * Calculates global stats across all games & dexes in MyPokeLog.
 */
export function calculateGlobalProgress(GAME_CONFIGS) {
  if (!isStorageAvailable() || !GAME_CONFIGS) {
    return {
      uniqueCaughtCount: 0,
      totalSpeciesCount: 1025,
      uniquePercentage: '0.0',
      totalGamesCount: 0,
      completedGamesCount: 0,
      totalCatchesAllDexes: 0,
      gamesProgress: []
    };
  }

  const uniqueCaughtSet = new Set();
  let totalCatchesAllDexes = 0;
  let completedGamesCount = 0;
  const gameKeys = Object.keys(GAME_CONFIGS);
  const gamesProgress = [];

  gameKeys.forEach(gKey => {
    const game = GAME_CONFIGS[gKey];
    if (!game || !game.dexes || game.dexes.length === 0) return;

    // First dex (regional) for main progress
    const mainDex = game.dexes[0];
    const mainDexIds = DEX_REGISTRY[mainDex.dexKey] || [];
    const mainDexSet = loadCaughtSet(mainDex);
    const mainCaughtCount = mainDexSet.size;
    const mainTotalCount = mainDexIds.length;
    const mainPct = mainTotalCount > 0 ? Math.round((mainCaughtCount / mainTotalCount) * 100) : 0;
    const isFinished = mainTotalCount > 0 && mainDexIds.every(id => mainDexSet.has(id));

    if (isFinished) {
      completedGamesCount++;
    }

    // Accumulate unique species & total catches across ALL dexes of this game
    game.dexes.forEach(dex => {
      const set = loadCaughtSet(dex);
      totalCatchesAllDexes += set.size;
      set.forEach(id => uniqueCaughtSet.add(id));
    });

    gamesProgress.push({
      gameKey: gKey,
      gameName: game.name,
      mainDexName: mainDex.name,
      caughtCount: mainCaughtCount,
      totalCount: mainTotalCount,
      percentage: mainPct,
      isCompleted: isFinished
    });
  });

  const uniqueCount = uniqueCaughtSet.size;
  const totalSpecies = 1025;
  const uniquePct = ((uniqueCount / totalSpecies) * 100).toFixed(1);

  return {
    uniqueCaughtCount: uniqueCount,
    totalSpeciesCount: totalSpecies,
    uniquePercentage: uniquePct,
    totalGamesCount: gamesProgress.length,
    completedGamesCount,
    totalCatchesAllDexes,
    gamesProgress
  };
}



// ============================================================
// JSON Export / Import
// ============================================================

export function generateExportJSON(gameConfig, dexConfig, dexIds, caughtSet, POKEMON_DATA) {
  const activeList = dexIds.map((natId, idx) => {
    const p = POKEMON_DATA ? POKEMON_DATA.find(item => item.id === natId) : null;
    return {
      displayId: String(idx + 1).padStart(3, '0'),
      nationalNum: natId,
      name: p ? p.name : `Pokémon #${natId}`,
      type1: p ? p.type1 : 'Normal',
      type2: p ? p.type2 : null
    };
  });

  const total = activeList.length;
  let count = 0;
  activeList.forEach(p => { if (caughtSet.has(p.nationalNum)) count++; });
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
    if (caughtSet.has(p.nationalNum)) capturedList.push(itemData);
    else missingList.push(itemData);
  });

  return {
    meta: {
      app: "MyPokeLog",
      url: "https://mypokelog.app",
      game_key: gameConfig ? gameConfig.name : 'unknown',
      dex_id: dexConfig ? dexConfig.id : 'unknown',
      dex_name: dexConfig ? dexConfig.name : 'unknown',
      timestamp: new Date().toISOString(),
      summary: {
        total_pokedex: total,
        captured_count: count,
        missing_count: total - count,
        completion_percentage: `${pct}%`
      }
    },
    captured_pokemon: capturedList,
    missing_pokemon: missingList
  };
}

export function downloadExportJSONFile(jsonObj, dexId) {
  if (typeof document === 'undefined') return;
  const jsonStr = JSON.stringify(jsonObj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mypokelog_${dexId || 'export'}_export.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateGlobalJSON(GAME_CONFIGS) {
  if (!isStorageAvailable()) return { meta: {}, games: {} };
  const gamesData = {};
  let totalCapturedAll = 0;
  Object.keys(GAME_CONFIGS).forEach(gKey => {
    const game = GAME_CONFIGS[gKey];
    if (!game || !game.dexes) return;
    gamesData[gKey] = {};
    game.dexes.forEach(dex => {
      const cList = JSON.parse(localStorage.getItem(dex.storageKey) || '[]');
      gamesData[gKey][dex.id] = cList;
      totalCapturedAll += cList.length;
    });
  });
  return {
    meta: {
      app: "MyPokeLog Global Database Backup",
      version: "3.0",
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

export function importJSONData(data, GAME_CONFIGS, currentGameKey) {
  if (!isStorageAvailable() || !data) return { success: false, message: 'Datos JSON no válidos' };

  let totalImported = 0;

  // Case 1: Global backup (v3.0 format: data.games[gameKey][dexId])
  if (data.games && typeof data.games === 'object') {
    Object.keys(data.games).forEach(gKey => {
      const game = GAME_CONFIGS[gKey];
      if (!game || !game.dexes) return;
      const gData = data.games[gKey];

      if (Array.isArray(gData)) {
        // Old v2.x format: array of IDs → assign to first dex
        const firstDex = game.dexes[0];
        const existing = new Set(JSON.parse(localStorage.getItem(firstDex.storageKey) || '[]'));
        gData.forEach(id => {
          const numId = Number(id);
          if (numId && !existing.has(numId)) { existing.add(numId); totalImported++; }
        });
        localStorage.setItem(firstDex.storageKey, JSON.stringify(Array.from(existing)));
      } else if (typeof gData === 'object') {
        // New v3.0 format: { dexId: [ids] }
        Object.keys(gData).forEach(dexId => {
          const dex = game.dexes.find(d => d.id === dexId);
          if (!dex) return;
          const existing = new Set(JSON.parse(localStorage.getItem(dex.storageKey) || '[]'));
          const incoming = Array.isArray(gData[dexId]) ? gData[dexId] : [];
          incoming.forEach(id => {
            const numId = Number(id);
            if (numId && !existing.has(numId)) { existing.add(numId); totalImported++; }
          });
          localStorage.setItem(dex.storageKey, JSON.stringify(Array.from(existing)));
        });
      }
    });
    return { success: true, count: totalImported, mode: 'global' };
  }

  // Case 2: Single dex export (data.meta.dex_id or data.captured_pokemon)
  let targetGame = GAME_CONFIGS[currentGameKey];
  let targetDex = targetGame ? targetGame.dexes[0] : null;

  if (data.meta && data.meta.dex_id) {
    for (const [gKey, game] of Object.entries(GAME_CONFIGS)) {
      if (!game.dexes) continue;
      const found = game.dexes.find(d => d.id === data.meta.dex_id);
      if (found) { targetDex = found; break; }
    }
  }

  if (targetDex) {
    const existing = new Set(JSON.parse(localStorage.getItem(targetDex.storageKey) || '[]'));
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
      if (numId && !existing.has(numId)) { existing.add(numId); totalImported++; }
    });
    localStorage.setItem(targetDex.storageKey, JSON.stringify(Array.from(existing)));
    return { success: true, count: totalImported, mode: 'single', gameName: targetDex.name };
  }

  return { success: false, message: 'No se pudo identificar la edición ni las capturas en el archivo JSON.' };
}

export async function loadLocalDatabase(GAME_CONFIGS) {
  if (typeof fetch === 'undefined' || !isStorageAvailable()) return false;
  // Run legacy migrations first
  runLegacyMigrations();
  try {
    const res = await fetch('./pokedex_db.json');
    if (!res.ok) return false;
    const data = await res.json();
    if (data && data.games) {
      let importedCount = 0;
      Object.keys(data.games).forEach(gKey => {
        const game = GAME_CONFIGS[gKey];
        if (!game || !game.dexes) return;
        const gData = data.games[gKey];
        const firstDex = game.dexes[0];
        const incoming = Array.isArray(gData) ? gData : [];
        const existing = new Set(JSON.parse(localStorage.getItem(firstDex.storageKey) || '[]'));
        let added = false;
        incoming.forEach(id => {
          if (!existing.has(id)) { existing.add(id); added = true; importedCount++; }
        });
        if (added) localStorage.setItem(firstDex.storageKey, JSON.stringify(Array.from(existing)));
      });
      return importedCount;
    }
  } catch (err) {
    console.warn('pokedex_db.json pre-load not available or failed:', err);
  }
  return false;
}

// Kept for backward compatibility with share service
export function loadDexMode() { return 'regional'; }
export function saveDexMode() {}
